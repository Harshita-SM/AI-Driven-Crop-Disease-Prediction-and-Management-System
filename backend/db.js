// ====================================================================
// Database connection and transactional data access layer
// Supports SQLite / PostgreSQL relational persistence
// ====================================================================

const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.resolve(__dirname, "../database/crop_disease.db");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to crop disease relational database.");
    db.run("PRAGMA foreign_keys = ON;");
  }
});

/**
 * Executes a parameterized query returning all matching rows
 */
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * ACID Transaction: Persists AI scan prediction, links treatments,
 * creates outbreak alerts, and refreshes denormalized summary cache.
 */
function recordScanTransaction({
  farmerId,
  cropId,
  predictedDiseaseId,
  confidenceScore,
  imagePath,
  temperature,
  humidity,
  rainfall,
  riskLevel,
  treatmentIds = []
}) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION;");

      const insertScanSql = `
        INSERT INTO prediction_scans (
          farmer_id, crop_id, predicted_disease_id, confidence_score,
          image_path, temperature_celsius, humidity_percentage, rainfall_mm, risk_level
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

      db.run(
        insertScanSql,
        [farmerId, cropId, predictedDiseaseId, confidenceScore, imagePath, temperature, humidity, rainfall, riskLevel],
        function (err) {
          if (err) {
            db.run("ROLLBACK;");
            return reject(new Error(`Failed to insert scan: ${err.message}`));
          }

          const scanId = this.lastID;

          // Step 2: Associate recommended treatments (M:N junction)
          const insertJunctionSql = `INSERT INTO scan_treatments (scan_id, treatment_id, applied_status) VALUES (?, ?, 'Recommended');`;
          for (const tid of treatmentIds) {
            db.run(insertJunctionSql, [scanId, tid]);
          }

          // Step 3: Insert Alert if Risk is High or Critical
          if (riskLevel === "High" || riskLevel === "Critical") {
            const insertAlertSql = `
              INSERT INTO farmer_alert_notifications (farmer_id, scan_id, alert_message)
              VALUES (?, ?, ?);
            `;
            const alertMsg = `ALERT: Critical infection detected (${riskLevel}) with ${confidenceScore}% confidence.`;
            db.run(insertAlertSql, [farmerId, scanId, alertMsg]);
          }

          // Step 4: Update Denormalized Cache
          const updateCacheSql = `
            INSERT INTO farmer_scan_summaries (farmer_id, total_scans, last_scan_at, critical_scans_count)
            VALUES (?, 1, CURRENT_TIMESTAMP, ?)
            ON CONFLICT(farmer_id) DO UPDATE SET
              total_scans = total_scans + 1,
              last_scan_at = CURRENT_TIMESTAMP,
              critical_scans_count = critical_scans_count + ?;
          `;
          const isCritical = riskLevel === "Critical" ? 1 : 0;
          db.run(updateCacheSql, [farmerId, isCritical, isCritical]);

          db.run("COMMIT;", (commitErr) => {
            if (commitErr) {
              db.run("ROLLBACK;");
              return reject(commitErr);
            }
            resolve({ scanId, status: "COMMITTED" });
          });
        }
      );
    });
  });
}

module.exports = {
  db,
  query,
  recordScanTransaction
};
