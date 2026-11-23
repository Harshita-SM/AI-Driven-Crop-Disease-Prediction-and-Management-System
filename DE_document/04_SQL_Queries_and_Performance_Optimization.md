# 04. SQL Queries & Performance Optimization

This document catalogs the essential SQL queries powering the AI-Driven Crop Disease Prediction system, ranging from high-frequency transactional queries to complex analytical joins and B-Tree indexing strategies.

All queries are executable against [`database/crop_disease.db`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/crop_disease.db) and demonstrated in [`database/demo_queries.sql`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/demo_queries.sql).

---

## 1. High-Frequency Application Queries

### Query 1.1: Fetch Farmer Scan History with Diagnostics (Dashboard View)
*Invoked every time a farmer opens their mobile scan history page.*

```sql
SELECT 
    ps.scan_id,
    c.crop_name,
    d.common_name AS diagnosed_disease,
    ps.confidence_score,
    ps.risk_level,
    ps.temperature_celsius AS temp_c,
    ps.humidity_percentage AS humidity_pct,
    ps.created_at
FROM prediction_scans ps
JOIN crops c ON ps.crop_id = c.crop_id
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
WHERE ps.farmer_id = ?
ORDER BY ps.created_at DESC;
```

**Optimization:** Utilizes the composite index `idx_scans_farmer_date` (`farmer_id`, `created_at DESC`), avoiding an in-memory `B-TREE SORT`.

---

### Query 1.2: Retrieve Active Outbreak Alerts for a Farmer
*Powers the bell notification badge in the frontend navigation bar.*

```sql
SELECT 
    alert_id,
    alert_message,
    is_read,
    created_at
FROM farmer_alert_notifications
WHERE farmer_id = ? AND is_read = 0
ORDER BY created_at DESC;
```

---

## 2. Multi-Table Relational JOIN Queries

### Query 2.1: Comprehensive Diagnostic & Treatment Dossier (5-Table JOIN)
*Resolves 1:N and M:N relationships to reconstruct the full agricultural report for an individual scan.*

```sql
SELECT 
    f.full_name AS farmer_name,
    f.district,
    c.crop_name,
    d.common_name AS detected_disease,
    d.pathogen_type,
    ps.confidence_score,
    ps.risk_level,
    t.treatment_type,
    t.recommendation_text,
    t.dosage,
    t.safe_interval_days
FROM prediction_scans ps
JOIN farmers f ON ps.farmer_id = f.farmer_id
JOIN crops c ON ps.crop_id = c.crop_id
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
JOIN scan_treatments st ON ps.scan_id = st.scan_id
JOIN treatments t ON st.treatment_id = t.treatment_id
WHERE ps.scan_id = ?;
```

#### Relational Path:
$$\text{farmers} \xrightarrow{1:N} \text{prediction\_scans} \xleftarrow{1:N} \text{crops}$$
$$\text{prediction\_scans} \xrightarrow{1:N} \text{diseases}$$
$$\text{prediction\_scans} \xrightarrow{1:N} \text{scan\_treatments} \xleftarrow{N:1} \text{treatments}$$

---

## 3. Agricultural Epidemiology & Outbreak Surveillance Queries

### Query 3.1: Regional Outbreak Heatmap (District-Level Disease Clusters)
*Used by ICAR and government agricultural extension officers to monitor epidemic threats.*

```sql
SELECT 
    f.district,
    c.crop_name,
    d.common_name AS disease_name,
    d.pathogen_type,
    COUNT(ps.scan_id) AS outbreak_case_count,
    ROUND(AVG(ps.confidence_score), 2) AS avg_model_confidence,
    ROUND(AVG(ps.humidity_percentage), 1) AS avg_field_humidity
FROM prediction_scans ps
JOIN farmers f ON ps.farmer_id = f.farmer_id
JOIN crops c ON ps.crop_id = c.crop_id
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
WHERE ps.risk_level IN ('High', 'Critical')
GROUP BY f.district, c.crop_name, d.common_name, d.pathogen_type
HAVING COUNT(ps.scan_id) >= 1
ORDER BY outbreak_case_count DESC;
```

---

### Query 3.2: Weather-Disease Correlation Analysis
*Calculates how high humidity ($>75\%$) influences fungal vs. bacterial pathogen outbreaks.*

```sql
SELECT 
    d.pathogen_type,
    CASE 
        WHEN ps.humidity_percentage > 75.0 THEN 'High Humidity (>75%)'
        ELSE 'Normal Humidity (<=75%)'
    END AS humidity_condition,
    COUNT(ps.scan_id) AS diagnosis_count,
    ROUND(AVG(ps.temperature_celsius), 1) AS avg_temperature
FROM prediction_scans ps
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
WHERE d.pathogen_type != 'Healthy'
GROUP BY d.pathogen_type, humidity_condition
ORDER BY d.pathogen_type, diagnosis_count DESC;
```

---

## 4. B-Tree Indexing Strategy & Query Plan Analysis

To prevent sequential full-table scans ($O(N)$) as the transaction volume expands, four dedicated B-Tree indexes were designed:

### Defined Indexes:
```sql
-- 1. Accelerates farmer scan history queries with reverse chronological sorting
CREATE INDEX idx_scans_farmer_date ON prediction_scans(farmer_id, created_at DESC);

-- 2. Speeds up regional epidemic queries filtering by disease and severity
CREATE INDEX idx_scans_disease_risk ON prediction_scans(predicted_disease_id, risk_level);

-- 3. Optimizes foreign key lookups between crops and diseases
CREATE INDEX idx_diseases_crop ON diseases(crop_id);

-- 4. Optimizes treatment lookups for a detected disease
CREATE INDEX idx_treatments_disease ON treatments(disease_id);
```

### Verification with `EXPLAIN QUERY PLAN`:

#### Unindexed Farmer Query:
```sql
EXPLAIN QUERY PLAN
SELECT * FROM prediction_scans WHERE farmer_id = 101 ORDER BY created_at DESC;
```
*Without Index:*
`SCAN prediction_scans` followed by `USE TEMP B-TREE FOR ORDER BY` $\rightarrow$ Extremely expensive disk sort.

#### With Composite Index `idx_scans_farmer_date`:
*Execution Plan:*
`SEARCH prediction_scans USING INDEX idx_scans_farmer_date (farmer_id=?)`
- Direct B-Tree index seek ($O(\log N)$).
- Since `created_at DESC` is stored directly in the index leaf nodes, zero temporary sorting is required.
