# 📚 Project DBMS Documentation

Welcome to the **Database Management System (DBMS)** documentation suite for the **AI-Driven Crop Disease Prediction and Management System**.

This folder contains comprehensive architectural, design, relational schema, normalization, query optimization, and backend data access documents explaining how DBMS powers the agricultural decision-support and disease surveillance pipeline.

---

## 📑 Documentation Index

| File | Title | Description |
| :--- | :--- | :--- |
| **[01_DBMS_Overview_and_Architecture.md](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/DE_document/01_DBMS_Overview_and_Architecture.md)** | **DBMS Overview & Architecture** | High-level system architecture, role of DBMS in AI systems, ER diagram, entities & cardinalities. |
| **[02_Database_Schema_and_Data_Dictionary.md](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/DE_document/02_Database_Schema_and_Data_Dictionary.md)** | **Schema & Data Dictionary** | Exhaustive data dictionary for all 8 relational tables, column definitions, keys, and constraints. |
| **[03_Normalization_and_Design_Principles.md](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/DE_document/03_Normalization_and_Design_Principles.md)** | **Normalization & Design** | 1NF, 2NF, 3NF mathematical normalization walkthrough, deliberate denormalization, and ACID properties. |
| **[04_SQL_Queries_and_Performance_Optimization.md](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/DE_document/04_SQL_Queries_and_Performance_Optimization.md)** | **SQL Queries & Indexes** | Multi-table JOINs, aggregation analytics, outbreak surveillance queries, and B-Tree indexing strategy. |
| **[05_Backend_API_and_DBMS_Integration.md](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/DE_document/05_Backend_API_and_DBMS_Integration.md)** | **Backend & DBMS Integration** | Node.js/Express database layer (`db.js`), parameterized query execution, and atomic transactions. |

---

## 🗄️ Database Quick Reference

- **RDBMS Engine:** SQLite 3 (Production compatible with PostgreSQL / MySQL)
- **Database Location:** [`database/crop_disease.db`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/crop_disease.db)
- **DDL Schema Script:** [`database/schema.sql`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/schema.sql)
- **Seed Data Script:** [`database/seed.sql`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/seed.sql)
- **Demo Script:** [`database/run_demo.sh`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/database/run_demo.sh)
- **Backend Data Layer:** [`backend/db.js`](file:///Users/sk/ASD-PROJECT/AI-Driven-Crop-Disease-Prediction-and-Management-System/backend/db.js)
