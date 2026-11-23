# 05. Backend API & DBMS Integration Guide

This document describes how the Node.js/Express application server interacts with the relational database layer implemented in [`backend/db.js`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/backend/db.js).

---

## 1. Connection Lifecycle & Pragma Initialization

The database engine is initialized asynchronously when the Node.js process starts:

```javascript
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.resolve(__dirname, "../database/crop_disease.db");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to crop disease relational database.");
    // CRITICAL: SQLite disables foreign key enforcement by default for backward compatibility
    db.run("PRAGMA foreign_keys = ON;");
  }
});
```

> [!IMPORTANT]
> By default, SQLite does not enforce Foreign Key constraints unless `PRAGMA foreign_keys = ON;` is executed on every new connection. This command ensures referential integrity across all insert and delete operations.

---

## 2. Preventing SQL Injection via Parameterized Queries

The data access layer strictly enforces parameterized queries using placeholder tokens (`?`), completely mitigating SQL Injection attacks (CWE-89):

```javascript
/**
 * Executes a parameterized query returning all matching rows safely
 */
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}
```

### Contrast with Vulnerable Code:
```javascript
// ❌ VULNERABLE TO SQL INJECTION:
const badSql = "SELECT * FROM farmers WHERE phone = '" + req.body.phone + "';";

// ✅ SECURE PARAMETERIZED EXECUTION:
const safeSql = "SELECT * FROM farmers WHERE phone = ?;";
await query(safeSql, [req.body.phone]);
```

---

## 3. Atomic Multi-Statement Transaction Flow: `recordScanTransaction()`

When a farmer submits a crop leaf image, the backend runs image classification via TensorFlow.js and then records the entire diagnostic event atomically:

```
[ POST /api/predict ]
        |
        v
[ 1. Image Classification ] ----> Disease: 'Tomato___Early_blight', Confidence: 94.2%
        |
        v
[ 2. BEGIN TRANSACTION ]
        |
        +---> Step A: INSERT INTO prediction_scans
        |            (farmer_id, crop_id, predicted_disease_id, confidence, temp, humidity, risk)
        |            RETURNING scan_id
        |
        +---> Step B: INSERT INTO scan_treatments (scan_id, treatment_id)
        |            (Links recommended remedies for the detected disease)
        |
        +---> Step C: Evaluate Outbreak Risk
        |            IF (risk_level == 'High' OR 'Critical')
        |            INSERT INTO farmer_alert_notifications (farmer_id, scan_id, alert_msg)
        |
        +---> Step D: Atomic Upsert to Denormalized Cache
        |            INSERT INTO farmer_scan_summaries (farmer_id, total_scans, ...)
        |            ON CONFLICT(farmer_id) DO UPDATE SET total_scans = total_scans + 1
        |
[ 3. All Steps OK? ]
        |
        +--- YES ---> [ COMMIT ]   -----> Status 200 OK + Diagnostic Payload
        |
        +--- NO  ---> [ ROLLBACK ] -----> Status 500 Error + Zero Corrupt State
```

### Implementation in `backend/db.js`:
```javascript
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

      db.run(insertScanSql, [farmerId, cropId, predictedDiseaseId, confidenceScore, imagePath, temperature, humidity, rainfall, riskLevel], function (err) {
        if (err) {
          db.run("ROLLBACK;");
          return reject(err);
        }

        const scanId = this.lastID;

        // Associate treatments in M:N junction table
        const insertJunctionSql = `INSERT INTO scan_treatments (scan_id, treatment_id, applied_status) VALUES (?, ?, 'Recommended');`;
        for (const tid of treatmentIds) {
          db.run(insertJunctionSql, [scanId, tid]);
        }

        // Conditionally trigger emergency alert
        if (riskLevel === "High" || riskLevel === "Critical") {
          const insertAlertSql = `INSERT INTO farmer_alert_notifications (farmer_id, scan_id, alert_message) VALUES (?, ?, ?);`;
          const alertMsg = `ALERT: Critical infection detected (${riskLevel}) with ${confidenceScore}% confidence.`;
          db.run(insertAlertSql, [farmerId, scanId, alertMsg]);
        }

        // Increment summary cache
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
      });
    });
  });
}
```

---

## 4. Production Migration Path: SQLite to PostgreSQL

For local development and edge deployments, SQLite offers zero-configuration file storage. For large-scale cloud deployment, the schema is 100% ANSI-SQL compliant:

| Feature | SQLite (Current Local DB) | PostgreSQL (Enterprise Cloud) |
| :--- | :--- | :--- |
| **Storage Model** | Serverless single file (`crop_disease.db`) | Client-Server Architecture |
| **Concurrency** | Multiple readers, single writer lock | Multi-Version Concurrency Control (MVCC) |
| **Driver** | `sqlite3` | `pg` / `Prisma` / `TypeORM` |
| **DDL Syntax** | Compatible | Direct 1:1 migration using [`database/schema.sql`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/schema.sql) |
