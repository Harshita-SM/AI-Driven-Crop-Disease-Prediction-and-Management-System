# 03. Normalization & Relational Design Principles

Database normalization is the systematic technique of organizing data in a relational database to minimize data redundancy and avoid update, insertion, and deletion anomalies.

This document demonstrates how the **AI-Driven Crop Disease Prediction and Management System** schema satisfies **First (1NF)**, **Second (2NF)**, and **Third Normal Form (3NF)**, followed by a formal justification for **Deliberate Denormalization** and the implementation of **ACID Transaction Guarantees**.

---

## 1. Mathematical Normalization Walkthrough

### 1.1 Unnormalized Form (UNF) Example
If the project were designed naively in a flat, unnormalized spreadsheet or single table:

$$\text{Scan}(\underline{\text{ScanID}}, \text{FarmerName}, \text{FarmerPhone}, \text{Location}, \text{CropName}, \text{DiseaseName}, \text{Symptoms}, \text{Treatments}[\dots], \text{Temp}, \text{Humidity})$$

#### Anomalies Present in UNF:
- **Insertion Anomaly:** Cannot insert a newly discovered crop or treatment into the system until a farmer performs a scan.
- **Deletion Anomaly:** If a farmer deletes their only scan history record, the treatment recommendation and crop botanical data are permanently lost.
- **Update Anomaly:** If a fungicide dosage changes, millions of historical scan rows would require updating, risking data corruption.

---

### 1.2 First Normal Form (1NF)
> **Definition:** A relation is in 1NF if and only if all attribute values are atomic (indivisible) and there are no repeating groups or multi-valued attributes.

#### Compliance in our Schema:
- **Atomicity:** The `treatments` array from the unnormalized model is decoupled. Instead of storing a comma-separated string like `"Mancozeb 2g, Copper Oxychloride 3g"` in `prediction_scans`, individual treatments are stored in a dedicated `treatments` table with single atomic fields (`dosage`, `recommendation_text`).
- **Primary Keys:** Every table has a clearly defined unique Primary Key (`farmer_id`, `crop_id`, `disease_id`, etc.).

---

### 1.3 Second Normal Form (2NF)
> **Definition:** A relation is in 2NF if it is in 1NF and every non-prime attribute is **fully functionally dependent** on the primary key (no partial functional dependencies on composite keys).

#### Compliance in our Schema:
Consider the junction table [`scan_treatments`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/schema.sql#L64-L70):
- **Primary Key:** Composite $(\text{scan\_id}, \text{treatment\_id})$
- **Non-Prime Attributes:** `applied_status`, `applied_date`

$$\{ \text{scan\_id}, \text{treatment\_id} \} \longrightarrow \text{applied\_status}$$
$$\{ \text{scan\_id}, \text{treatment\_id} \} \longrightarrow \text{applied\_date}$$

Notice that `applied_status` cannot depend solely on `scan_id` (a scan has multiple treatments with different statuses), nor can it depend solely on `treatment_id` (a treatment is applied in some scans and skipped in others). It depends on the **entire composite key**. Hence, **no partial dependency exists**.

All other tables have single-attribute primary keys, trivially satisfying 2NF.

---

### 1.4 Third Normal Form (3NF)
> **Definition:** A relation is in 3NF if it is in 2NF and no non-prime attribute is **transitively dependent** on the primary key (i.e., for every functional dependency $X \rightarrow Y$, either $X$ is a superkey or $Y$ is a prime attribute).

#### Compliance in our Schema:
In `prediction_scans`, we record:
- $\text{scan\_id} \rightarrow \text{crop\_id}$
- $\text{scan\_id} \rightarrow \text{predicted\_disease\_id}$

Notice what is **omitted** from `prediction_scans`:
- We do **not** store `pathogen_type`, `symptoms_description`, or `severity_level` inside `prediction_scans`.
- If we stored `symptoms_description` in `prediction_scans`, we would have:
  $$\text{scan\_id} \longrightarrow \text{predicted\_disease\_id} \longrightarrow \text{symptoms\_description}$$
  This would be a **transitive dependency** ($X \rightarrow Y \rightarrow Z$).
- By delegating disease characteristics to the `diseases` master table and referencing only `predicted_disease_id` via a Foreign Key, the schema eliminates transitive dependencies and is in **pure 3NF**.

---

## 2. Controlled / Deliberate Denormalization: `farmer_scan_summaries`

While 3NF guarantees zero update anomalies, real-world high-concurrency applications face performance bottlenecks on aggregate dashboard queries.

### The Problem:
Every time a farmer launches the mobile app, the home screen displays:
- Total scans completed
- Date of last diagnosis
- Number of critical infections requiring attention

In pure 3NF, calculating this requires executing a full aggregate scan:
```sql
SELECT 
    COUNT(scan_id) AS total_scans,
    MAX(created_at) AS last_scan_at,
    SUM(CASE WHEN risk_level = 'Critical' THEN 1 ELSE 0 END) AS critical_scans_count
FROM prediction_scans
WHERE farmer_id = ?;
```
As `prediction_scans` grows to millions of rows across an entire state or country, this query causes extensive disk I/O and latency.

### The Solution:
We introduced the table **`farmer_scan_summaries`** as an intentional, controlled denormalization cache:
```sql
CREATE TABLE IF NOT EXISTS farmer_scan_summaries (
    farmer_id INTEGER PRIMARY KEY REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    total_scans INTEGER DEFAULT 0 CHECK (total_scans >= 0),
    last_scan_at TIMESTAMP,
    critical_scans_count INTEGER DEFAULT 0 CHECK (critical_scans_count >= 0)
);
```

### Consistency Guarantee:
To ensure this denormalized table never drifts out of sync with raw data, it is updated strictly inside the **ACID scan persistence transaction** (see below) using atomic upserts:
```sql
INSERT INTO farmer_scan_summaries (farmer_id, total_scans, last_scan_at, critical_scans_count)
VALUES (?, 1, CURRENT_TIMESTAMP, ?)
ON CONFLICT(farmer_id) DO UPDATE SET
    total_scans = total_scans + 1,
    last_scan_at = CURRENT_TIMESTAMP,
    critical_scans_count = critical_scans_count + ?;
```
Result: Dashboard lookups become $O(1)$ single-row index seeks!

---

## 3. ACID Properties in Action

In [`backend/db.js`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/backend/db.js#L36-L109), the function `recordScanTransaction()` demonstrates how relational database transactions maintain system integrity:

| ACID Property | Implementation in Project | Failure Scenario Prevented |
| :--- | :--- | :--- |
| **Atomicity** ("All or Nothing") | Wrapped in `BEGIN TRANSACTION;` and `COMMIT;`. If any step fails (e.g., alert insert failure or invalid foreign key), an explicit `ROLLBACK;` is invoked. | Prevents a scan from being saved while leaving prescribed treatments or critical outbreak alerts missing. |
| **Consistency** | Enforced by DDL constraints: `CHECK (confidence_score >= 0.00 AND confidence_score <= 100.00)`, `CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical'))`, and Foreign Keys (`PRAGMA foreign_keys = ON;`). | Prevents impossible AI probabilities (-5% or 150%) or orphaned scans assigned to non-existent farmers. |
| **Isolation** | SQLite enforces serialized transactions (`db.serialize()`). Intermediate states of scan creation and treatment linking are invisible to other concurrent queries until committed. | Prevents a dashboard query from reading a half-inserted scan without its associated treatments (Dirty Reads). |
| **Durability** | SQLite uses a Write-Ahead Log (WAL) and disk sync. Once `COMMIT;` completes, the scan and alert data survive unexpected server crashes or power outages. | Guarantees that diagnostic records logged in remote agricultural fields are never lost once confirmed. |
