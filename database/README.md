# 🗄️ Database Documentation: AI-Driven Crop Disease Prediction & Management System

## 1. Overview & Database Architecture
This project utilizes an **ACID-compliant Relational Database Management System (RDBMS)** (PostgreSQL / SQLite) designed to maintain strict referential integrity, strong consistency, and high-performance querying for crop disease diagnoses, farmer advisory, environmental telemetry, and epidemiology outbreak tracking.

### Key Entities
- **`farmers`**: Registered users and farm profile details.
- **`crops`**: Cultivated plant species supported by the classification model.
- **`diseases`**: Plant pathologies corresponding to deep learning model classification labels.
- **`treatments`**: Curated chemical, organic, and preventive agricultural treatment guidelines.
- **`prediction_scans`**: Central transactional table logging image inferences, model confidence scores, weather parameters, and risk evaluations.
- **`scan_treatments`**: Associative junction table resolving the **Many-to-Many (M:N)** relationship between scans and multiple recommended remedies.
- **`farmer_alert_notifications`**: High-priority disease warnings triggered for farmers and regional agricultural officers.
- **`farmer_scan_summaries`**: Deliberately denormalized cache table maintained transactionally for $O(1)$ farmer dashboard loads.

---

## 2. Quick Demonstration Command
To run the complete automated live DBMS viva demonstration (executing all queries, constraint tests, transactions, and index plans):

```bash
chmod +x database/run_demo.sh
./database/run_demo.sh
```

Or run interactively inside SQLite CLI:
```bash
sqlite3 database/crop_disease.db
```
