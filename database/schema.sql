-- ====================================================================
-- AI-Driven Crop Disease Prediction and Management System
-- Relational Database Schema (PostgreSQL / SQLite Compatible DDL)
-- ====================================================================

-- 1. Farmers / Users Table
CREATE TABLE IF NOT EXISTS farmers (
    farmer_id INTEGER PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    farm_location VARCHAR(150) NOT NULL,
    district VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crops Master Table
CREATE TABLE IF NOT EXISTS crops (
    crop_id INTEGER PRIMARY KEY,
    crop_name VARCHAR(50) UNIQUE NOT NULL,
    scientific_name VARCHAR(100) NOT NULL,
    optimal_temp_min NUMERIC(4,1) NOT NULL,
    optimal_temp_max NUMERIC(4,1) NOT NULL,
    optimal_humidity_max NUMERIC(4,1) NOT NULL
);

-- 3. Diseases Master Table (Matches trained model classes)
CREATE TABLE IF NOT EXISTS diseases (
    disease_id INTEGER PRIMARY KEY,
    crop_id INTEGER NOT NULL REFERENCES crops(crop_id) ON DELETE RESTRICT,
    label_code VARCHAR(50) UNIQUE NOT NULL,
    common_name VARCHAR(100) NOT NULL,
    pathogen_type VARCHAR(20) NOT NULL CHECK (pathogen_type IN ('Fungal', 'Bacterial', 'Viral', 'Healthy')),
    severity_level VARCHAR(20) NOT NULL CHECK (severity_level IN ('Low', 'Moderate', 'High', 'Critical')),
    symptoms_description TEXT NOT NULL
);

-- 4. Treatments / Recommendations Master Table
CREATE TABLE IF NOT EXISTS treatments (
    treatment_id INTEGER PRIMARY KEY,
    disease_id INTEGER NOT NULL REFERENCES diseases(disease_id) ON DELETE CASCADE,
    treatment_type VARCHAR(20) NOT NULL CHECK (treatment_type IN ('Chemical', 'Organic', 'Preventive', 'Cultural')),
    recommendation_text TEXT NOT NULL,
    dosage VARCHAR(100),
    safe_interval_days INTEGER NOT NULL CHECK (safe_interval_days >= 0)
);

-- 5. Prediction Scans (Core Transactional AI Inference Logs)
CREATE TABLE IF NOT EXISTS prediction_scans (
    scan_id INTEGER PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crops(crop_id) ON DELETE RESTRICT,
    predicted_disease_id INTEGER NOT NULL REFERENCES diseases(disease_id) ON DELETE RESTRICT,
    confidence_score NUMERIC(5,2) NOT NULL CHECK (confidence_score >= 0.00 AND confidence_score <= 100.00),
    image_path VARCHAR(255) NOT NULL,
    temperature_celsius NUMERIC(4,1) CHECK (temperature_celsius >= -10.0 AND temperature_celsius <= 60.0),
    humidity_percentage NUMERIC(4,1) CHECK (humidity_percentage >= 0.0 AND humidity_percentage <= 100.0),
    rainfall_mm NUMERIC(5,1) DEFAULT 0.0 CHECK (rainfall_mm >= 0.0),
    risk_level VARCHAR(20) NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Scan Treatments (Resolving M:N between Prediction Scans and Treatments)
CREATE TABLE IF NOT EXISTS scan_treatments (
    scan_id INTEGER NOT NULL REFERENCES prediction_scans(scan_id) ON DELETE CASCADE,
    treatment_id INTEGER NOT NULL REFERENCES treatments(treatment_id) ON DELETE RESTRICT,
    applied_status VARCHAR(20) DEFAULT 'Recommended' CHECK (applied_status IN ('Recommended', 'Applied', 'Skipped')),
    applied_date TIMESTAMP,
    PRIMARY KEY (scan_id, treatment_id)
);

-- 7. Outbreak Alerts Table (Real-time Notifications)
CREATE TABLE IF NOT EXISTS farmer_alert_notifications (
    alert_id INTEGER PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    scan_id INTEGER NOT NULL REFERENCES prediction_scans(scan_id) ON DELETE CASCADE,
    alert_message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Denormalized Aggregation Cache Table (Demonstrating Deliberate Denormalization for Q3)
CREATE TABLE IF NOT EXISTS farmer_scan_summaries (
    farmer_id INTEGER PRIMARY KEY REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    total_scans INTEGER DEFAULT 0 CHECK (total_scans >= 0),
    last_scan_at TIMESTAMP,
    critical_scans_count INTEGER DEFAULT 0 CHECK (critical_scans_count >= 0)
);

-- ====================================================================
-- Indexes for Performance & Query Efficiency (Q5)
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_scans_farmer_date ON prediction_scans(farmer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scans_disease_risk ON prediction_scans(predicted_disease_id, risk_level);
CREATE INDEX IF NOT EXISTS idx_diseases_crop ON diseases(crop_id);
CREATE INDEX IF NOT EXISTS idx_treatments_disease ON treatments(disease_id);
