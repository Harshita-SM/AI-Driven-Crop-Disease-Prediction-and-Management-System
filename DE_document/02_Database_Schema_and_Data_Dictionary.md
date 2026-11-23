# 02. Database Schema & Data Dictionary

This document provides the complete technical data dictionary for all eight relational tables implemented in [`database/schema.sql`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/schema.sql).

---

## Table 1: `farmers` (Registered Users & Farm Locations)

Stores identity, contact coordinates, and geographic jurisdiction of farmers using the system.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `farmer_id` | `INTEGER` | `PRIMARY KEY` | No | Auto-incrementing unique identifier for each farmer. |
| `full_name` | `VARCHAR(100)` | `NOT NULL` | No | Full legal name of the farmer. |
| `phone` | `VARCHAR(15)` | `UNIQUE`, `NOT NULL` | No | Primary mobile contact for SMS/WhatsApp disease alerts. |
| `email` | `VARCHAR(100)` | `UNIQUE` | Yes | Optional email address for diagnostic report delivery. |
| `farm_location` | `VARCHAR(150)` | `NOT NULL` | No | Village, Taluka, or street address of the farm plot. |
| `district` | `VARCHAR(50)` | `NOT NULL` | No | District name (e.g., 'Nashik', 'Pune') used for regional outbreak clustering. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | No | Registration timestamp. |

---

## Table 2: `crops` (Crop Master Catalog)

Reference table for agricultural crops supported by the AI prediction pipeline and their optimal physiological thresholds.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `crop_id` | `INTEGER` | `PRIMARY KEY` | No | Unique crop identifier. |
| `crop_name` | `VARCHAR(50)` | `UNIQUE`, `NOT NULL` | No | Common name of crop (e.g., 'Tomato', 'Potato', 'Corn', 'Grape'). |
| `scientific_name` | `VARCHAR(100)` | `NOT NULL` | No | Botanical taxonomy (e.g., 'Solanum lycopersicum'). |
| `optimal_temp_min` | `NUMERIC(4,1)` | `NOT NULL` | No | Minimum Celsius temperature for healthy vegetative growth. |
| `optimal_temp_max` | `NUMERIC(4,1)` | `NOT NULL` | No | Maximum Celsius temperature before heat stress occurs. |
| `optimal_humidity_max`| `NUMERIC(4,1)` | `NOT NULL` | No | Maximum humidity threshold (%) beyond which fungal sporulation risk rises. |

---

## Table 3: `diseases` (Disease Taxonomy & Model Label Mappings)

Catalog of plant diseases and healthy states recognizable by the deep learning classifier.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `disease_id` | `INTEGER` | `PRIMARY KEY` | No | Unique disease identifier. |
| `crop_id` | `INTEGER` | `FOREIGN KEY REFERENCES crops(crop_id)` | No | Parent host crop (`ON DELETE RESTRICT`). |
| `label_code` | `VARCHAR(50)` | `UNIQUE`, `NOT NULL` | No | Exact machine learning model output label (e.g., `Tomato___Early_blight`). |
| `common_name` | `VARCHAR(100)` | `NOT NULL` | No | Farmer-friendly diagnosis name (e.g., 'Early Blight'). |
| `pathogen_type` | `VARCHAR(20)` | `CHECK IN ('Fungal', 'Bacterial', 'Viral', 'Healthy')` | No | Biological classification of the infectious agent. |
| `severity_level` | `VARCHAR(20)` | `CHECK IN ('Low', 'Moderate', 'High', 'Critical')` | No | Baseline pathology virulence level. |
| `symptoms_description` | `TEXT` | `NOT NULL` | No | Botanical diagnostic symptoms observed on leaves/stems. |

---

## Table 4: `treatments` (Agronomic Recommendations & Interventions)

Prescribed remediation measures, fungicides, bio-agents, and cultural practices for each disease.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `treatment_id` | `INTEGER` | `PRIMARY KEY` | No | Unique treatment record identifier. |
| `disease_id` | `INTEGER` | `FOREIGN KEY REFERENCES diseases(disease_id)` | No | Target disease (`ON DELETE CASCADE`). |
| `treatment_type` | `VARCHAR(20)` | `CHECK IN ('Chemical', 'Organic', 'Preventive', 'Cultural')` | No | Category of treatment for integrated pest management (IPM). |
| `recommendation_text` | `TEXT` | `NOT NULL` | No | Detailed application steps, spray instructions, or soil management actions. |
| `dosage` | `VARCHAR(100)` | `NULL` | Yes | Prescribed concentration (e.g., '2.5g per litre of water'). |
| `safe_interval_days` | `INTEGER` | `CHECK (safe_interval_days >= 0)` | No | Minimum waiting period before harvest after chemical application. |

---

## Table 5: `prediction_scans` (Core AI Inference & Microclimate Transaction Log)

Transactional ledger capturing every diagnostic scan performed by farmers, combining AI outputs with local atmospheric parameters.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `scan_id` | `INTEGER` | `PRIMARY KEY` | No | Auto-generated transaction identification number. |
| `farmer_id` | `INTEGER` | `FOREIGN KEY REFERENCES farmers(farmer_id)` | No | The farmer who initiated the scan (`ON DELETE CASCADE`). |
| `crop_id` | `INTEGER` | `FOREIGN KEY REFERENCES crops(crop_id)` | No | Identified crop type (`ON DELETE RESTRICT`). |
| `predicted_disease_id`| `INTEGER` | `FOREIGN KEY REFERENCES diseases(disease_id)` | No | Disease identified by the neural network (`ON DELETE RESTRICT`). |
| `confidence_score` | `NUMERIC(5,2)` | `CHECK (confidence_score BETWEEN 0.00 AND 100.00)` | No | Softmax probability percentage generated by the model. |
| `image_path` | `VARCHAR(255)` | `NOT NULL` | No | File system URI or cloud storage path of the analyzed leaf photo. |
| `temperature_celsius`| `NUMERIC(4,1)` | `CHECK (temperature_celsius BETWEEN -10.0 AND 60.0)` | Yes | Ambient ambient temperature during scan capture. |
| `humidity_percentage`| `NUMERIC(4,1)` | `CHECK (humidity_percentage BETWEEN 0.0 AND 100.0)` | Yes | Relative humidity during scan capture. |
| `rainfall_mm` | `NUMERIC(5,1)` | `DEFAULT 0.0, CHECK (rainfall_mm >= 0.0)` | Yes | Precipitation logged in the last 24 hours. |
| `risk_level` | `VARCHAR(20)` | `CHECK IN ('Low', 'Medium', 'High', 'Critical')` | No | Computed compound risk evaluating confidence + weather risk. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | No | Immutable audit timestamp of the inference event. |

---

## Table 6: `scan_treatments` (Scan-to-Treatment Junction Table)

Resolves the $M:N$ (Many-to-Many) relationship between AI scan logs and prescribed agricultural treatments.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `scan_id` | `INTEGER` | `PRIMARY KEY (Composite)`, `FK REFERENCES prediction_scans(scan_id)` | No | Parent scan transaction (`ON DELETE CASCADE`). |
| `treatment_id` | `INTEGER` | `PRIMARY KEY (Composite)`, `FK REFERENCES treatments(treatment_id)` | No | Prescribed treatment (`ON DELETE RESTRICT`). |
| `applied_status` | `VARCHAR(20)` | `DEFAULT 'Recommended', CHECK IN ('Recommended', 'Applied', 'Skipped')` | No | Tracks whether farmer followed the advice. |
| `applied_date` | `TIMESTAMP` | `NULL` | Yes | Timestamp when the farmer confirmed spraying/application. |

---

## Table 7: `farmer_alert_notifications` (Real-Time Warning Queue)

Asynchronous alert queue generated when high-risk or critical fungal/bacterial spread conditions are detected.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `alert_id` | `INTEGER` | `PRIMARY KEY` | No | Unique alert identifier. |
| `farmer_id` | `INTEGER` | `FOREIGN KEY REFERENCES farmers(farmer_id)` | No | Recipient farmer (`ON DELETE CASCADE`). |
| `scan_id` | `INTEGER` | `FOREIGN KEY REFERENCES prediction_scans(scan_id)` | No | Triggering scan record (`ON DELETE CASCADE`). |
| `alert_message` | `VARCHAR(255)` | `NOT NULL` | No | Human-readable urgency message with disease & risk stats. |
| `is_read` | `BOOLEAN` | `DEFAULT 0` | No | Notification read flag for UI badges. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | No | Time alert was dispatched. |

---

## Table 8: `farmer_scan_summaries` (Materialized Aggregate Cache)

A high-performance $1:1$ denormalized summary table designed to eliminate full-table scans when populating mobile farmer dashboards.

| Column Name | Data Type | Key / Constraint | Nullable | Description / Business Logic |
| :--- | :--- | :--- | :---: | :--- |
| `farmer_id` | `INTEGER` | `PRIMARY KEY`, `FK REFERENCES farmers(farmer_id)` | No | Target farmer (`ON DELETE CASCADE`). |
| `total_scans` | `INTEGER` | `DEFAULT 0, CHECK (total_scans >= 0)` | No | Pre-computed lifetime scan count. |
| `last_scan_at` | `TIMESTAMP` | `NULL` | Yes | Timestamp of most recent diagnosis. |
| `critical_scans_count`| `INTEGER`| `DEFAULT 0, CHECK (critical_scans_count >= 0)` | No | Count of critical disease diagnoses needing urgent attention. |
