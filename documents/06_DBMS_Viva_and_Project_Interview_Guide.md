# 06. DBMS Viva Voce & Project Defense Guide

This guide compiles the top **25 technical viva voce and interview questions** regarding the database architecture, schema design, normalization, transactions, and indexing of the **AI-Driven Crop Disease Prediction and Management System**.

---

## Section A: Architectural & Foundational Concepts

### Q1: What is the primary role of a DBMS in an AI/ML project?
**Answer:**  
An AI model (e.g., a CNN) is a stateless function that performs inference: given a leaf image, it outputs a class label and a probability. An AI model cannot store historical user data, track infection progression over agricultural seasons, enforce referential integrity across stakeholders, or support complex analytical reporting. The RDBMS acts as the persistent, transactional state layer that stores farmer accounts, manages botanical disease catalogs, enforces treatment rules, logs scan history with weather context, and triggers emergency alerts.

---

### Q2: Why did you choose a Relational Database (RDBMS) over a NoSQL document store (like MongoDB)?
**Answer:**  
1. **Strict Referential Integrity:** Agricultural disease management requires strict relationships between crops, diseases, and legal chemical treatments. Orphaned recommendations or invalid pathogen IDs can ruin a crop.
2. **ACID Transactions:** Logging an AI scan, linking multiple treatments, updating alert queues, and refreshing cache must succeed or fail as a single atomic unit.
3. **Structured Joins & Analytics:** Agricultural extension officers need complex aggregate queries (e.g., district-level outbreak heatmaps joining farmers, scans, crops, and diseases), which relational engines optimize via B-Tree indexes and ANSI SQL joins far more efficiently than document stores.

---

### Q3: What is the purpose of the dual-engine architecture in this project?
**Answer:**  
The dual-engine architecture separates concerns:
- **Engine 1 (Inference Engine):** TensorFlow.js processes raw image pixels into statistical predictions.
- **Engine 2 (Data & Advisory Engine):** SQLite/PostgreSQL contextualizes the prediction by matching it against agronomic rules, environmental microclimates (temperature/humidity), and farmer history to output actionable advice.

---

## Section B: Schema Design, Relationships & Constraints

### Q4: Walk through the main entities in your database schema.
**Answer:**  
The schema consists of 8 tables categorized into three groups:
1. **Master / Reference Tables:** `farmers` (user profiles), `crops` (supported plants and climate limits), `diseases` (pathogen taxonomy and model labels), `treatments` (curative and preventive measures).
2. **Transactional Event Tables:** `prediction_scans` (immutable inference ledger with microclimate data), `scan_treatments` (junction table), `farmer_alert_notifications` (emergency warnings).
3. **Optimized Cache Table:** `farmer_scan_summaries` (pre-computed farmer stats for high-speed dashboard loading).

---

### Q5: How did you resolve Many-to-Many ($M:N$) relationships?
**Answer:**  
Between `prediction_scans` and `treatments`: One scan can warrant multiple treatments (e.g., both a chemical fungicide and organic soil remediation), and one treatment can be prescribed across thousands of scans. We resolved this using the associative junction table **`scan_treatments`**, which uses a composite primary key `(scan_id, treatment_id)`.

---

### Q6: What is the difference between `ON DELETE CASCADE` and `ON DELETE RESTRICT` in your schema?
**Answer:**  
- **`ON DELETE CASCADE`** is used on dependent transactional rows (e.g., in `prediction_scans` for `farmer_id`). If a test farmer account is deleted, their associated scans, alerts, and summaries are automatically deleted to prevent orphaned records.
- **`ON DELETE RESTRICT`** is used on catalog master tables (e.g., `crops` and `diseases`). If an administrator tries to delete 'Tomato' or 'Late Blight', the DBMS blocks the operation if historical scan records still reference that crop or disease, preserving audit history.

---

### Q7: What domain integrity constraints (CHECK constraints) did you implement?
**Answer:**  
- `confidence_score NUMERIC(5,2) CHECK (confidence_score >= 0.00 AND confidence_score <= 100.00)`
- `temperature_celsius NUMERIC(4,1) CHECK (temperature_celsius >= -10.0 AND temperature_celsius <= 60.0)`
- `humidity_percentage NUMERIC(4,1) CHECK (humidity_percentage >= 0.0 AND humidity_percentage <= 100.0)`
- `pathogen_type VARCHAR(20) CHECK (pathogen_type IN ('Fungal', 'Bacterial', 'Viral', 'Healthy'))`
- `risk_level VARCHAR(20) CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical'))`

These prevent invalid AI outputs or corrupt sensor data from entering the database.

---

### Q8: Why is `PRAGMA foreign_keys = ON;` executed on database startup?
**Answer:**  
For legacy backward compatibility with older SQLite versions, SQLite disables foreign key enforcement by default. Running `PRAGMA foreign_keys = ON;` on connection initialization ensures that SQLite strictly validates referential integrity for all `INSERT`, `UPDATE`, and `DELETE` queries.

---

## Section C: Normalization & Optimization

### Q9: What Normal Form is your database in? Prove it.
**Answer:**  
The core schema is in **Third Normal Form (3NF)**:
1. **1NF:** All attribute values are atomic (no arrays or comma-delimited treatment strings). Every table has a primary key.
2. **2NF:** In the composite key table `scan_treatments(scan_id, treatment_id)`, non-key attributes (`applied_status`, `applied_date`) depend on the full composite key, not a subset. All other tables have single-attribute primary keys, eliminating partial dependencies.
3. **3NF:** No non-prime attribute is transitively dependent on a primary key. For example, `symptoms_description` is stored in `diseases`, not duplicated in `prediction_scans`.

---

### Q10: Why did you create `farmer_scan_summaries` if it violates strict 3NF?
**Answer:**  
This is a **deliberate, controlled denormalization**. In high-concurrency production environments, computing `COUNT(*)`, `MAX(created_at)`, and `SUM(critical)` on millions of scan rows every time a farmer opens the mobile app creates severe disk I/O bottlenecks. By maintaining a 1:1 summary cache updated atomically inside the scan transaction via an upsert (`ON CONFLICT DO UPDATE`), dashboard reads become instantaneous $O(1)$ single-row lookups without sacrificing consistency.

---

### Q11: How do you guarantee that the denormalized summary table does not drift out of sync?
**Answer:**  
Both the insertion into `prediction_scans` and the upsert into `farmer_scan_summaries` occur inside the same **ACID transaction** (`BEGIN TRANSACTION` ... `COMMIT`). If either step fails, the entire transaction rolls back, preventing inconsistency.

---

### Q12: Explain your indexing strategy.
**Answer:**  
We established four targeted B-Tree indexes:
1. `idx_scans_farmer_date ON prediction_scans(farmer_id, created_at DESC)`: Speeds up farmer scan history queries and eliminates in-memory temporary sorting.
2. `idx_scans_disease_risk ON prediction_scans(predicted_disease_id, risk_level)`: Optimizes regional epidemic surveillance queries.
3. `idx_diseases_crop ON diseases(crop_id)`: Accelerates joins between crops and diseases.
4. `idx_treatments_disease ON treatments(disease_id)`: Speeds up recommendation retrieval.

---

### Q13: How do you prove that an index is actually being utilized?
**Answer:**  
By running `EXPLAIN QUERY PLAN` before the query in SQLite. For example:
```sql
EXPLAIN QUERY PLAN
SELECT * FROM prediction_scans WHERE farmer_id = 101 ORDER BY created_at DESC;
```
If indexed, the output shows:  
`SEARCH prediction_scans USING INDEX idx_scans_farmer_date (farmer_id=?)`  
If unindexed, it displays:  
`SCAN prediction_scans` followed by `USE TEMP B-TREE FOR ORDER BY`.

---

## Section D: Transactions & Concurrency

### Q14: Explain the ACID properties with respect to your project's `recordScanTransaction()`.
**Answer:**  
- **Atomicity:** Inserting scan records, mapping prescribed treatments, logging critical outbreak alerts, and updating cache are bundled. If any insert throws an error, `ROLLBACK;` executes and leaves zero partial data.
- **Consistency:** DDL check constraints and foreign keys guarantee that only valid probabilities ($0-100\%$) and existing farmer IDs can be written.
- **Isolation:** Managed via `db.serialize()` to prevent concurrent queries from reading intermediate states (Dirty Reads).
- **Durability:** Writes are flushed to disk using Write-Ahead Logging (WAL), surviving server crashes once `COMMIT;` completes.

---

### Q15: How does your backend prevent SQL Injection attacks?
**Answer:**  
The backend data layer in `backend/db.js` never concatenates raw user strings into SQL queries. Instead, it uses **parameterized prepared queries** with positional placeholders (`?`), ensuring that input values are treated strictly as literal data, not executable SQL syntax.

---

## Section E: Advanced & Analytical Inquiries

### Q16: How does the system compute compound disease risk using SQL and weather data?
**Answer:**  
In agriculture, fungal diseases (e.g., Early Blight, Late Blight) flourish in environments with high relative humidity ($>80\%$) and moderate temperatures ($18-28^\circ\text{C}$). The application takes ambient sensor/API readings and evaluates compound risk:
$$\text{Compound Risk} = f(\text{Model Confidence}, \text{Relative Humidity}, \text{Temperature Deviation})$$
This calculated value ('Low', 'Medium', 'High', 'Critical') is persisted directly in the relational ledger to trigger automated alert notifications.

---

### Q17: How would you scale this database from SQLite to an enterprise cloud environment?
**Answer:**  
Since all DDL scripts in `database/schema.sql` are ANSI SQL compliant:
1. Replace SQLite's local file connection in `backend/db.js` with a connection pool to **PostgreSQL**.
2. Leverage PostgreSQL's Multi-Version Concurrency Control (MVCC) for high-volume concurrent writes.
3. Implement table partitioning on `prediction_scans` by year/month or district for multi-terabyte scalability.
