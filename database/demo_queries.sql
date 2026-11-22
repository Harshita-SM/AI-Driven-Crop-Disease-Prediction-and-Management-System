-- ====================================================================
-- AI-Driven Crop Disease Prediction and Management System
-- DBMS Viva Demonstration Queries (Q1 to Q5)
-- ====================================================================

-- --------------------------------------------------------------------
-- [DEMO Q1]: Sample Data & Most Frequent Queries in the Application
-- --------------------------------------------------------------------

-- Frequent Query 1: Fetch recent scan history and diagnosis for Farmer Ramesh Kumar Patil (ID: 101)
-- (Used every time a farmer opens their mobile dashboard)
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
WHERE ps.farmer_id = 101
ORDER BY ps.created_at DESC;

-- Frequent Query 2: Outbreak Surveillance Query for ICAR / Agricultural Officers
-- (Used by district officers to track critical fungal outbreaks in Nashik)
SELECT 
    f.district,
    c.crop_name,
    d.common_name,
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
ORDER BY outbreak_case_count DESC;

-- --------------------------------------------------------------------
-- [DEMO Q2]: Multi-Table Relational JOIN Across Main Entities
-- Joining: Farmers -> Scans -> Crops -> Diseases -> Scan_Treatments -> Treatments
-- Resolving 1:N and M:N relationships
-- --------------------------------------------------------------------
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
    st.applied_status
FROM prediction_scans ps
JOIN farmers f ON ps.farmer_id = f.farmer_id
JOIN crops c ON ps.crop_id = c.crop_id
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
JOIN scan_treatments st ON ps.scan_id = st.scan_id
JOIN treatments t ON st.treatment_id = t.treatment_id
WHERE ps.scan_id = 1001;

-- --------------------------------------------------------------------
-- [DEMO Q3]: Denormalization & Cache Integrity Demonstration
-- Reading from the denormalized summary table, then refreshing it
-- --------------------------------------------------------------------
-- Fast O(1) primary key lookup for Farmer Ramesh Patil (ID 101) dashboard:
SELECT farmer_id, total_scans, last_scan_at, critical_scans_count
FROM farmer_scan_summaries
WHERE farmer_id = 101;

-- Verification query showing the underlying 3NF normalized aggregation:
SELECT 
    ps.farmer_id,
    COUNT(ps.scan_id) AS actual_scans,
    MAX(ps.created_at) AS actual_last_scan,
    SUM(CASE WHEN ps.risk_level = 'Critical' THEN 1 ELSE 0 END) AS actual_critical
FROM prediction_scans ps
WHERE ps.farmer_id = 101
GROUP BY ps.farmer_id;

-- --------------------------------------------------------------------
-- [DEMO Q4]: Data Correctness & Integrity Protection
-- (1) Constraint Enforcement: Attempting to insert invalid confidence score (105%)
-- Expected Result: Database Engine REJECTS with CHECK constraint violation!
-- --------------------------------------------------------------------
-- UNCOMMENT TO DEMONSTRATE REJECTION:
-- INSERT INTO prediction_scans 
-- (scan_id, farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature_celsius, humidity_percentage, risk_level)
-- VALUES (9999, 101, 1, 1, 105.00, '/invalid.jpg', 25.0, 70.0, 'Low');

-- (2) Atomicity Transaction: Recording a scan, linking treatments, generating alert, and updating cache
BEGIN TRANSACTION;

-- Step 1: Insert new prediction scan for Sita Devi (Farmer 102)
INSERT INTO prediction_scans (
    scan_id, farmer_id, crop_id, predicted_disease_id, 
    confidence_score, image_path, temperature_celsius, humidity_percentage, rainfall_mm, risk_level, created_at
) VALUES (
    1007, 102, 1, 1, 
    93.50, '/uploads/scans/2026/04/apple_scab_new.jpg', 17.0, 89.0, 12.0, 'Critical', CURRENT_TIMESTAMP
);

-- Step 2: Link recommended treatment in junction table (M:N)
INSERT INTO scan_treatments (scan_id, treatment_id, applied_status)
VALUES (1007, 1, 'Recommended');

-- Step 3: Trigger critical farmer alert notification
INSERT INTO farmer_alert_notifications (alert_id, farmer_id, scan_id, alert_message, is_read, created_at)
VALUES (504, 102, 1007, 'CRITICAL WARNING: Apple Scab identified (93.5%). 89% humidity requires immediate Mancozeb spray.', 0, CURRENT_TIMESTAMP);

-- Step 4: Increment denormalized dashboard cache
UPDATE farmer_scan_summaries
SET total_scans = total_scans + 1,
    last_scan_at = CURRENT_TIMESTAMP,
    critical_scans_count = critical_scans_count + 1
WHERE farmer_id = 102;

COMMIT;

-- --------------------------------------------------------------------
-- [DEMO Q5]: Query Efficiency & Index Utilization
-- Verifying that the B-Tree index (idx_scans_farmer_date) is utilized
-- --------------------------------------------------------------------
EXPLAIN QUERY PLAN
SELECT scan_id, crop_id, predicted_disease_id, confidence_score, created_at
FROM prediction_scans
WHERE farmer_id = 101
ORDER BY created_at DESC;
