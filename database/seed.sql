-- ====================================================================
-- AI-Driven Crop Disease Prediction and Management System
-- Seed Data
-- ====================================================================

-- 1. Insert Crops
INSERT INTO crops (crop_id, crop_name, scientific_name, optimal_temp_min, optimal_temp_max, optimal_humidity_max) VALUES
(1, 'Apple', 'Malus domestica', 15.0, 25.0, 75.0),
(2, 'Corn', 'Zea mays', 18.0, 32.0, 70.0),
(3, 'Grape', 'Vitis vinifera', 20.0, 30.0, 65.0),
(4, 'Peach', 'Prunus persica', 18.0, 28.0, 70.0),
(5, 'Potato', 'Solanum tuberosum', 15.0, 22.0, 80.0),
(6, 'Strawberry', 'Fragaria ananassa', 15.0, 26.0, 70.0),
(7, 'Tomato', 'Solanum lycopersicum', 20.0, 28.0, 75.0);

-- 2. Insert Diseases (Aligned directly with TensorFlow model labels)
INSERT INTO diseases (disease_id, crop_id, label_code, common_name, pathogen_type, severity_level, symptoms_description) VALUES
(1, 1, 'Apple_Scab', 'Apple Scab', 'Fungal', 'High', 'Olive-green to black velvety spots on leaves, premature defoliation.'),
(2, 1, 'apple_black_rot', 'Apple Black Rot', 'Fungal', 'High', 'Circular brown leaf spots with purple margins (frog-eye leaf spot) and rotting fruit.'),
(3, 2, 'Corn_sercospora', 'Corn Cercospora Leaf Spot', 'Fungal', 'Moderate', 'Narrow rectangular tan-to-gray lesions running parallel to leaf veins.'),
(4, 3, 'Grape_balck_rot', 'Grape Black Rot', 'Fungal', 'Critical', 'Reddish-brown necrotic leaf spots and shriveled black mummified berries.'),
(5, 4, 'Peach_bacterial_spot', 'Peach Bacterial Spot', 'Bacterial', 'High', 'Water-soaked angular spots on leaves turning purplish-brown and dropping out.'),
(6, 5, 'potato_early_blight', 'Potato Early Blight', 'Fungal', 'Moderate', 'Concentric target-board rings on mature foliage and dark sunken lesions.'),
(7, 5, 'potato_late_blight', 'Potato Late Blight', 'Fungal', 'Critical', 'Water-soaked pale pale lesions with white fungal growth on leaf undersides.'),
(8, 6, 'Strawberry_leaf_scorch', 'Strawberry Leaf Scorch', 'Fungal', 'Moderate', 'Dark purple irregular spots on upper leaf surfaces that merge and brown.'),
(9, 7, 'tomato_bacterial_spot', 'Tomato Bacterial Spot', 'Bacterial', 'High', 'Small dark circular water-soaked leaf spots with yellow halos.'),
(10, 7, 'Tomato_mosaic_virus', 'Tomato Mosaic Virus', 'Viral', 'Critical', 'Mottled dark and light green patterns, leaf curling, and severe stunting.');

-- 3. Insert Treatments
INSERT INTO treatments (treatment_id, disease_id, treatment_type, recommendation_text, dosage, safe_interval_days) VALUES
(1, 1, 'Chemical', 'Foliar spray of Mancozeb 75% WP or Captan 50% WP during early bud break.', '2.5 g/liter of water', 14),
(2, 1, 'Organic', 'Apply bio-fungicide Bacillus subtilis or neem oil extract weekly.', '5 ml/liter of water', 3),
(3, 4, 'Chemical', 'Systemic application of Myclobutanil or Difenoconazole at pre-bloom stage.', '1.0 ml/liter of water', 21),
(4, 4, 'Cultural', 'Prune infected vines, clear dropped mummies, and improve canopy air circulation.', 'N/A', 0),
(5, 7, 'Chemical', 'Protective spray of Metalaxyl-M + Mancozeb or Cymoxanil immediately after rain.', '2.0 g/liter of water', 10),
(6, 7, 'Preventive', 'Ensure high furrow drainage, avoid overhead sprinkler irrigation, and plant certified tubers.', 'N/A', 0),
(7, 9, 'Chemical', 'Copper hydroxide combined with Streptomycin sulphate spray at disease onset.', '1.5 g copper + 0.1 g antibiotic/liter', 7),
(8, 10, 'Cultural', 'Uproot and incinerate infected plants immediately; disinfect pruning tools with 10% trisodium phosphate.', 'N/A', 0);

-- 4. Insert Farmers
INSERT INTO farmers (farmer_id, full_name, phone, email, farm_location, district, created_at) VALUES
(101, 'Ramesh Kumar Patil', '+919876543210', 'ramesh.patil@agrimail.in', 'Plot 44, Nashik Agro Hub', 'Nashik', '2026-03-10 09:30:00'),
(102, 'Sita Devi Sharma', '+919812345678', 'sita.sharma@agrimail.in', 'Kisan Nagar, Shimla Hills', 'Shimla', '2026-03-15 10:45:00'),
(103, 'Gurpreet Singh', '+919823456789', 'gurpreet.s@agrimail.in', 'Village Dhalewan, Bathinda', 'Bathinda', '2026-03-20 11:15:00'),
(104, 'Ananya Deshmukh', '+919834567890', 'ananya.d@agrimail.in', 'Green Valley, Pune Rural', 'Pune', '2026-03-25 14:00:00');

-- 5. Insert Prediction Scans (Historical & Recent Scans)
INSERT INTO prediction_scans (scan_id, farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature_celsius, humidity_percentage, rainfall_mm, risk_level, created_at) VALUES
(1001, 101, 3, 4, 94.65, '/uploads/scans/2026/03/grape_leaf_01.jpg', 27.5, 82.0, 14.5, 'Critical', '2026-03-28 08:30:00'),
(1002, 101, 3, 4, 91.20, '/uploads/scans/2026/03/grape_leaf_02.jpg', 28.0, 85.0, 20.0, 'Critical', '2026-03-29 09:15:00'),
(1003, 102, 1, 1, 88.40, '/uploads/scans/2026/03/apple_scab_01.jpg', 16.5, 88.0, 8.2, 'High', '2026-03-29 11:00:00'),
(1004, 103, 5, 7, 96.80, '/uploads/scans/2026/03/potato_blight_01.jpg', 19.2, 92.5, 25.0, 'Critical', '2026-03-30 07:45:00'),
(1005, 104, 7, 9, 87.15, '/uploads/scans/2026/03/tomato_leaf_01.jpg', 26.0, 78.0, 5.0, 'Medium', '2026-03-30 14:20:00'),
(1006, 102, 1, 2, 79.50, '/uploads/scans/2026/03/apple_rot_01.jpg', 18.0, 72.0, 0.0, 'Medium', '2026-03-31 16:10:00');

-- 6. Insert Scan Treatments Junction Records (M:N linking)
INSERT INTO scan_treatments (scan_id, treatment_id, applied_status, applied_date) VALUES
(1001, 3, 'Applied', '2026-03-28 10:00:00'),
(1001, 4, 'Applied', '2026-03-28 11:30:00'),
(1002, 3, 'Recommended', NULL),
(1003, 1, 'Applied', '2026-03-29 15:00:00'),
(1003, 2, 'Recommended', NULL),
(1004, 5, 'Applied', '2026-03-30 09:00:00'),
(1004, 6, 'Applied', '2026-03-30 10:00:00'),
(1005, 7, 'Recommended', NULL);

-- 7. Insert Notifications / Alerts
INSERT INTO farmer_alert_notifications (alert_id, farmer_id, scan_id, alert_message, is_read, created_at) VALUES
(501, 101, 1001, 'CRITICAL ALERT: Grape Black Rot detected with 94.65% confidence. High humidity (82%) indicates immediate spread risk.', 1, '2026-03-28 08:30:05'),
(502, 102, 1003, 'HIGH RISK: Apple Scab identified. Weather conditions favorable for spore discharge. Review fungicide schedule.', 1, '2026-03-29 11:00:05'),
(503, 103, 1004, 'EMERGENCY: Potato Late Blight confirmed (96.80%). Immediate systemic fungicide treatment advised.', 0, '2026-03-30 07:45:05');

-- 8. Seed Denormalized Summary Table
INSERT INTO farmer_scan_summaries (farmer_id, total_scans, last_scan_at, critical_scans_count) VALUES
(101, 2, '2026-03-29 09:15:00', 2),
(102, 2, '2026-03-31 16:10:00', 0),
(103, 1, '2026-03-30 07:45:00', 1),
(104, 1, '2026-03-30 14:20:00', 0);
