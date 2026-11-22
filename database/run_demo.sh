#!/usr/bin/env bash
# ====================================================================
# AI-Driven Crop Disease Prediction and Management System
# Automated DBMS Viva Live Demonstration Script
# ====================================================================

DB_FILE="database/crop_disease.db"

echo "======================================================================="
echo "   AI-DRIVEN CROP DISEASE PREDICTION AND MANAGEMENT SYSTEM"
echo "                DBMS VIVA LIVE DEMONSTRATION"
echo "======================================================================="
echo ""

# 1. Reset & Seed DB
echo "[SETUP] Re-building database from schema.sql & seed.sql..."
rm -f "$DB_FILE"
sqlite3 "$DB_FILE" < database/schema.sql
sqlite3 "$DB_FILE" < database/seed.sql
echo "Database initialized successfully at $DB_FILE."
echo ""

# --------------------------------------------------------------------
# QUESTION 1 DEMO
# --------------------------------------------------------------------
echo "======================================================================="
echo ">> [DEMO Q1]: PROJECT DATA SAMPLE & FREQUENT APPLICATION QUERIES"
echo "======================================================================="
echo "1. Sample Data from 'diseases' table (Model Classes Integration):"
sqlite3 -header -column "$DB_FILE" "SELECT disease_id, crop_id, label_code, common_name, pathogen_type, severity_level FROM diseases LIMIT 4;"
echo ""

echo "2. Frequent Query #1: Farmer Dashboard - Recent Scans with Diagnostics for Farmer 101:"
sqlite3 -header -column "$DB_FILE" "
SELECT 
    ps.scan_id,
    c.crop_name,
    d.common_name AS diagnosis,
    ps.confidence_score AS conf_pct,
    ps.risk_level,
    ps.temperature_celsius AS temp,
    ps.humidity_percentage AS hum,
    ps.created_at
FROM prediction_scans ps
JOIN crops c ON ps.crop_id = c.crop_id
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
WHERE ps.farmer_id = 101
ORDER BY ps.created_at DESC;
"
echo ""

# --------------------------------------------------------------------
# QUESTION 2 DEMO
# --------------------------------------------------------------------
echo "======================================================================="
echo ">> [DEMO Q2]: SCHEMA RELATIONS & MULTI-TABLE JOIN (1:N, M:N RESOLVED)"
echo "======================================================================="
echo "Executing Multi-Table JOIN across Farmers -> Scans -> Crops -> Diseases -> Treatments:"
sqlite3 -header -column "$DB_FILE" "
SELECT 
    f.full_name AS farmer,
    c.crop_name AS crop,
    d.common_name AS disease,
    ps.confidence_score AS confidence,
    t.treatment_type AS type,
    t.recommendation_text AS recommendation,
    st.applied_status
FROM prediction_scans ps
JOIN farmers f ON ps.farmer_id = f.farmer_id
JOIN crops c ON ps.crop_id = c.crop_id
JOIN diseases d ON ps.predicted_disease_id = d.disease_id
JOIN scan_treatments st ON ps.scan_id = st.scan_id
JOIN treatments t ON st.treatment_id = t.treatment_id
WHERE ps.scan_id = 1001;
"
echo ""

# --------------------------------------------------------------------
# QUESTION 3 DEMO
# --------------------------------------------------------------------
echo "======================================================================="
echo ">> [DEMO Q3]: NORMALIZATION & DELIBERATE DENORMALIZATION (CACHE)"
echo "======================================================================="
echo "Reading from denormalized summary table 'farmer_scan_summaries' (O(1) dashboard load):"
sqlite3 -header -column "$DB_FILE" "
SELECT farmer_id, total_scans, last_scan_at, critical_scans_count 
FROM farmer_scan_summaries 
WHERE farmer_id = 101;
"
echo ""

# --------------------------------------------------------------------
# QUESTION 4 DEMO
# --------------------------------------------------------------------
echo "======================================================================="
echo ">> [DEMO Q4]: DATA INTEGRITY - CONSTRAINT VIOLATION & ATOMIC TRANSACTION"
echo "======================================================================="
echo "Test A: Demonstrating Database CHECK Constraint Rejection (Invalid Confidence: 105%):"
sqlite3 "$DB_FILE" "INSERT INTO prediction_scans (scan_id, farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature_celsius, humidity_percentage, risk_level) VALUES (9999, 101, 1, 1, 105.00, '/invalid.jpg', 25.0, 70.0, 'Low');" 2>&1
echo "--> Notice: The Database Engine strictly rejects out-of-range confidence values!"
echo ""

echo "Test B: Executing Multi-Table ACID Transaction (Scan + Treatment + Alert + Summary Update):"
sqlite3 "$DB_FILE" <<EOF
BEGIN TRANSACTION;
INSERT INTO prediction_scans (scan_id, farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature_celsius, humidity_percentage, rainfall_mm, risk_level, created_at)
VALUES (1007, 102, 1, 1, 93.50, '/uploads/scans/2026/04/apple_scab_new.jpg', 17.0, 89.0, 12.0, 'Critical', '2026-04-01 10:00:00');

INSERT INTO scan_treatments (scan_id, treatment_id, applied_status) VALUES (1007, 1, 'Recommended');

INSERT INTO farmer_alert_notifications (alert_id, farmer_id, scan_id, alert_message, is_read, created_at)
VALUES (504, 102, 1007, 'CRITICAL WARNING: Apple Scab identified (93.5%).', 0, '2026-04-01 10:00:05');

UPDATE farmer_scan_summaries
SET total_scans = total_scans + 1,
    last_scan_at = '2026-04-01 10:00:00',
    critical_scans_count = critical_scans_count + 1
WHERE farmer_id = 102;
COMMIT;
EOF
echo "--> Transaction Committed successfully! Verifying updated summary for Farmer 102:"
sqlite3 -header -column "$DB_FILE" "SELECT * FROM farmer_scan_summaries WHERE farmer_id = 102;"
echo ""

# --------------------------------------------------------------------
# QUESTION 5 DEMO
# --------------------------------------------------------------------
echo "======================================================================="
echo ">> [DEMO Q5]: QUERY EFFICIENCY & INDEX UTILIZATION (EXPLAIN QUERY PLAN)"
echo "======================================================================="
echo "1. Query on Non-Indexed column (image_path) -> Full Table Scan:"
sqlite3 "$DB_FILE" "EXPLAIN QUERY PLAN SELECT * FROM prediction_scans WHERE image_path = 'grape.jpg';"
echo ""
echo "2. Query on Indexed composite columns (farmer_id, created_at DESC) -> B-Tree Index Search:"
sqlite3 "$DB_FILE" "EXPLAIN QUERY PLAN SELECT scan_id, crop_id, predicted_disease_id, confidence_score FROM prediction_scans WHERE farmer_id = 101 ORDER BY created_at DESC;"
echo ""
echo "======================================================================="
echo "               DEMONSTRATION COMPLETE!"
echo "======================================================================="
