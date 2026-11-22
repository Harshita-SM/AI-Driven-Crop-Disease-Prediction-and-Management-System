#!/usr/bin/env python3
"""
Generate a professional, publication-quality PDF guide for the DBMS Viva Video Presentation.
AI-Driven Crop Disease Prediction and Management System.
"""

from fpdf import FPDF
from fpdf.enums import XPos, YPos
import os

class VivaGuidePDF(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.set_auto_page_break(auto=True, margin=15)
        # Primary colors
        self.c_primary = (16, 85, 45)      # Deep Forest Green (Agriculture)
        self.c_secondary = (30, 41, 59)    # Slate Navy
        self.c_accent = (194, 65, 12)      # Amber / Orange accent
        self.c_bg_light = (248, 250, 252)  # Light slate gray
        self.c_border = (226, 232, 240)    # Border gray
        self.c_code_bg = (241, 245, 249)   # Code block light gray

    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "B", 8)
            self.set_text_color(*self.c_primary)
            self.cell(110, 6, "AI-Driven Crop Disease Prediction & Management System", border=0)
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(100, 116, 139)
            self.cell(0, 6, f"DBMS Viva Guide | Page {self.page_no()}", border=0, align="R",
                      new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.set_draw_color(*self.c_border)
            self.set_line_width(0.3)
            self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
            self.ln(4)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(100, 116, 139)
        self.cell(0, 6, "Data Engineering Major Project - Video Viva Presentation Guide (Deadline: 22 Nov 2026)", align="C")

    # Helper components
    def section_title(self, title, subtitle=None):
        self.ln(3)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(*self.c_primary)
        self.cell(0, 7, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        if subtitle:
            self.set_font("Helvetica", "I", 9)
            self.set_text_color(100, 116, 139)
            self.cell(0, 5, subtitle, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_draw_color(*self.c_primary)
        self.set_line_width(0.6)
        self.line(self.l_margin, self.get_y(), self.l_margin + 50, self.get_y())
        self.ln(4)

    def subsection_title(self, title):
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*self.c_secondary)
        self.cell(0, 6, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(1)

    def clean_text(self, text):
        return (
            text.replace("—", "--")
            .replace("–", "-")
            .replace("“", '"')
            .replace("”", '"')
            .replace("‘", "'")
            .replace("’", "'")
            .replace("→", "->")
            .replace("≤", "<=")
            .replace("≥", ">=")
        )

    def paragraph(self, text):
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(30, 41, 59)
        self.multi_cell(0, 4.8, self.clean_text(text))
        self.ln(2)

    def bold_label(self, label, value):
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(*self.c_secondary)
        self.write(4.8, self.clean_text(label) + ": ")
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(51, 65, 85)
        self.write(4.8, self.clean_text(value) + "\n")
        self.ln(1)

    def callout_box(self, title, text, tag="TIP"):
        self.ln(2)
        box_width = self.w - self.l_margin - self.r_margin
        self.set_fill_color(240, 253, 244) if tag == "TIP" else self.set_fill_color(254, 242, 242)
        self.set_draw_color(34, 197, 94) if tag == "TIP" else self.set_draw_color(239, 68, 68)
        self.set_line_width(0.4)
        
        start_y = self.get_y()
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(22, 101, 52) if tag == "TIP" else self.set_text_color(153, 27, 27)
        self.cell(box_width, 6, f"[{tag}] {self.clean_text(title)}", fill=True, border="TLR", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        self.set_font("Helvetica", "", 9)
        self.set_text_color(30, 41, 59)
        self.multi_cell(box_width, 4.5, self.clean_text(text), fill=True, border="BLR")
        self.ln(3)

    def spoken_box(self, section_name, duration, files_to_show, script_text):
        self.ln(2)
        box_width = self.w - self.l_margin - self.r_margin
        
        # Header banner
        self.set_fill_color(241, 245, 249)
        self.set_draw_color(203, 213, 225)
        self.set_line_width(0.3)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.c_primary)
        self.cell(130, 6, f"  {self.clean_text(section_name)}", fill=True, border="TL")
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(*self.c_accent)
        self.cell(box_width - 130, 6, f"Timing: {duration}  ", fill=True, border="TR", align="R",
                  new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        # Files info line
        self.set_fill_color(248, 250, 252)
        self.set_font("Helvetica", "B", 8.5)
        self.set_text_color(71, 85, 105)
        self.multi_cell(box_width, 5, f" Screen / Files to Display: {self.clean_text(files_to_show)}", fill=True, border="LR")
        
        # Script box
        self.set_fill_color(255, 255, 255)
        self.set_font("Helvetica", "", 9.2)
        self.set_text_color(15, 23, 42)
        self.multi_cell(box_width, 4.8, f'Spoken Script:\n"{self.clean_text(script_text)}"', fill=True, border="BLR")
        self.ln(3)

    def code_box(self, code_str):
        self.ln(1)
        box_width = self.w - self.l_margin - self.r_margin
        self.set_fill_color(*self.c_code_bg)
        self.set_draw_color(*self.c_border)
        self.set_line_width(0.2)
        self.set_font("Courier", "", 8.2)
        self.set_text_color(15, 23, 42)
        self.multi_cell(box_width, 4.2, self.clean_text(code_str), fill=True, border=1)
        self.ln(2)


def generate_pdf(output_path):
    pdf = VivaGuidePDF()
    pdf.add_page()

    # Document Header Title
    pdf.set_fill_color(240, 253, 244)
    pdf.set_draw_color(34, 197, 94)
    pdf.rect(pdf.l_margin, pdf.get_y(), pdf.w - pdf.l_margin - pdf.r_margin, 28, style="FD")
    
    pdf.set_y(pdf.get_y() + 2)
    pdf.set_font("Helvetica", "B", 15)
    pdf.set_text_color(22, 101, 52)
    pdf.cell(0, 6, "DATA ENGINEERING MAJOR PROJECT: DBMS VIVA GUIDE", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 6, "AI-Driven Crop Disease Prediction and Management System", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "I", 8.5)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 5, "Official 10-Minute Video Teleprompter Script, Screen Plan & DBMS Defense", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(5)

    # Overview box
    pdf.bold_label("Project Domain", "Agriculture, FoodTech & Rural Development (ICAR / AgriTech)")
    pdf.bold_label("Submission Deadline", "22nd November 2026 | Max Video Duration: 10 Minutes")
    pdf.bold_label("Evaluation Mode", "Individual Recorded Video (Webcam + Screen visible throughout)")
    pdf.bold_label("Key Criterion", "Demonstrate actual implementation, database console, code & queries (No static slides)")

    pdf.callout_box("QUICK PREPARATION: RUN DEMO IN TERMINAL",
                    "Before recording, open terminal in the project directory and run:\n"
                    "$ chmod +x database/run_demo.sh && ./database/run_demo.sh\n"
                    "This initializes the database, seeds actual crop data, tests constraints, and runs query plans.",
                    tag="TIP")

    # Section 1: Setup & Checklist
    pdf.section_title("1. Video Recording Setup & Layout", "How to configure your screen for top marks")
    pdf.paragraph(
        "Split your screen horizontally or vertically so that both VS Code and your Terminal are simultaneously visible. "
        "Keep your camera active in the corner so your face remains in the frame throughout the 10-minute presentation."
    )
    
    pdf.bold_label("Left Half of Screen", "VS Code showing database/schema.sql, backend/db.js, and database/demo_queries.sql")
    pdf.bold_label("Right Half of Screen", "Terminal showing live sqlite3 / psql database console running actual queries")

    # Section 2: Minute-by-Minute Teleprompter
    pdf.section_title("2. Ten-Minute Spoken Script & Screen Navigation", "Follow this exact sequence minute-by-minute")

    # Intro
    pdf.spoken_box(
        "Introduction & System Overview",
        "0:00 - 1:00 (1 min)",
        "VS Code: Open README.md or backend/server.js. Terminal: Ready at project root.",
        "Hello everyone and respected evaluators. My name is [Your Name], and this is my individual video viva "
        "submission for the Data Engineering Major Project.\n\n"
        "My project is the AI-Driven Crop Disease Prediction and Management System. The goal of this platform is to "
        "assist farmers and agricultural departments like ICAR by classifying plant leaf diseases using deep learning, "
        "factoring in real-time environmental conditions like temperature and humidity, and delivering immediate disease "
        "management and treatment protocols.\n\n"
        "In this video, I will walk you through the database engineering behind this system, demonstrating our actual schema, "
        "transactional integrity, normalization decisions, constraint enforcement, and query optimization."
    )

    # Q1
    pdf.spoken_box(
        "Question 1: Database Selection & Workload Defense",
        "1:00 - 2:45 (1m 45s)",
        "VS Code: database/schema.sql (lines 1-45). Terminal: Run sample disease query and farmer history query.",
        "For Question 1: Why did we choose this database?\n\n"
        "We selected an ACID-compliant Relational Database Management System (RDBMS), implemented using PostgreSQL "
        "in production and SQLite for embedded local testing.\n\n"
        "First, what does our data look like? Our data is highly structured and relational. We have distinct entities: "
        "registered farmers, cultivated crops, disease pathologies matching our 10 deep learning model classes, curative "
        "treatments, and scan telemetry logging confidence scores and weather readings.\n\n"
        "Second, read/write patterns and volume: Every image upload triggers an atomic transactional write to record the "
        "scan, link treatments, and log alerts. On the read side, traffic is high-frequency: farmers checking diagnosis "
        "history and ICAR officers running district-wide outbreak surveillance queries. For 50,000 farmers conducting 3-4 scans "
        "a week, we anticipate 7 to 10 million scan records over a multi-year cycle (~3 GB structured data).\n\n"
        "Third, why strong consistency is required: If a crop is diagnosed with Potato Late Blight at 96% confidence under "
        "90% humidity, the scan, the urgent fungicide recommendation, and the alert must be committed together. An orphaned "
        "scan without a treatment would leave the farmer without advisory.\n\n"
        "Fourth, alternative database rejected: We evaluated MongoDB (Document Store) but rejected it. In MongoDB, disease "
        "treatments would either have to be duplicated inside scan documents—causing severe update anomalies whenever "
        "treatments change—or referenced without foreign key enforcement. A relational database gives us native referential "
        "integrity and SQL analytical grouping.\n\n"
        "As seen on my terminal, here is a sample of actual project data from the 'diseases' table, followed by our most frequent "
        "query: fetching a farmer's scan history with join data."
    )

    # Q2
    pdf.spoken_box(
        "Question 2: Schema Walkthrough & Resolving M:N",
        "2:45 - 4:30 (1m 45s)",
        "VS Code: database/schema.sql (highlight lines 45-66). Terminal: Run multi-table JOIN query.",
        "Moving to Question 2: Let me walk you through our database schema and data model.\n\n"
        "Looking at schema.sql on the left:\n"
        "- 'farmers' table stores profiles with primary key farmer_id.\n"
        "- 'crops' table holds crop taxonomy with primary key crop_id.\n"
        "- 'diseases' table has a 1-to-Many relationship with crops via crop_id foreign key.\n"
        "- 'treatments' table references disease_id.\n"
        "- Our core transactional table is 'prediction_scans' with primary key scan_id and foreign keys to farmers, crops, and diseases.\n\n"
        "How did we resolve Many-to-Many relationships? A diagnosed scan often requires multiple treatments—such as a chemical "
        "fungicide spray plus cultural canopy pruning. Simultaneously, a single treatment guideline applies to thousands of scans. "
        "This is an M:N relationship between prediction_scans and treatments.\n\n"
        "We resolved this using the associative junction table 'scan_treatments' (line 56). It features a composite primary key "
        "(scan_id, treatment_id) with foreign keys cascading from scans and restricting deletions on treatments, along with "
        "relationship attributes like applied_status.\n\n"
        "On the right in my terminal, I am executing our core multi-table query joining farmers to scans, crops, diseases, and "
        "through the junction table to display both recommended treatments for scan 1001."
    )

    # Q3
    pdf.spoken_box(
        "Question 3: Normal Forms & Deliberate Denormalization",
        "4:30 - 6:15 (1m 45s)",
        "VS Code: database/schema.sql (lines 70-76). Terminal: Query farmer_scan_summaries vs raw aggregation.",
        "Coming to Question 3: What normal form is our design in, and where did we deliberately break it?\n\n"
        "Our core schema reaches Third Normal Form (3NF) and BCNF.\n\n"
        "Let's look at the functional dependencies of prediction_scans: The candidate key is scan_id. scan_id uniquely "
        "determines farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature, humidity, and created_at.\n\n"
        "- Removal of Partial Dependencies: In scan_treatments, applied_status depends on the entire composite key (scan_id, treatment_id). "
        "There are no partial key dependencies, satisfying 2NF.\n"
        "- Removal of Transitive Dependencies: In prediction_scans, we only store predicted_disease_id. We do not store pathogen_type "
        "or symptoms, because scan_id determines predicted_disease_id, which determines pathogen_type. By keeping disease metadata in "
        "the 'diseases' table, every determinant is a superkey, fulfilling 3NF and BCNF.\n\n"
        "Where did we deliberately break normalization? We deliberately denormalized one table: 'farmer_scan_summaries' (line 70), "
        "caching total_scans, last_scan_at, and critical_scans_count.\n\n"
        "Why? On mobile dashboards, computing COUNT(*) and aggregations over millions of rows causes high CPU and I/O overhead. "
        "Reading from farmer_scan_summaries is an instant O(1) primary key lookup.\n\n"
        "How do we maintain correctness? Transactionally in application code: whenever a scan is inserted, the summary row is "
        "updated in the very same atomic database transaction. On terminal, you can see the cache perfectly matches the 3NF calculation."
    )

    # Q4
    pdf.spoken_box(
        "Question 4: Data Correctness, Constraints & Transactions",
        "6:15 - 8:00 (1m 45s)",
        "VS Code: backend/db.js (lines 34-88). Terminal: Run invalid CHECK insert (105%) then atomic transaction.",
        "For Question 4: How does our database protect data correctness?\n\n"
        "First, Constraints: We enforce PRIMARY KEY, FOREIGN KEY (ON DELETE RESTRICT on master data), NOT NULL on critical "
        "fields, and UNIQUE on farmer phone numbers and model classification labels. Crucially, we enforce domain CHECK constraints: "
        "confidence_score BETWEEN 0.00 AND 100.00, humidity BETWEEN 0 AND 100, and pathogen_type IN (Fungal, Bacterial, Viral, Healthy).\n\n"
        "Database vs Application Responsibilities: Our Node.js backend handles image file filtering and model tensor operations, "
        "but our database engine strictly guards data validity. Even if bad data reaches the database, the engine rejects it.\n\n"
        "Watch my terminal: I will attempt to insert a prediction scan with an invalid confidence score of 105%.\n"
        "As expected, the database engine immediately rejects it with: CHECK constraint failed: confidence_score >= 0.00 AND confidence_score <= 100.00.\n\n"
        "Second, Multi-Record Atomic Transactions: In backend/db.js, recordScanTransaction() modifies four records together:\n"
        "1. Inserts the prediction scan.\n"
        "2. Links treatments in scan_treatments.\n"
        "3. Inserts an outbreak notification into farmer_alert_notifications.\n"
        "4. Updates the cache in farmer_scan_summaries.\n\n"
        "Wrapped in BEGIN TRANSACTION and COMMIT, if any step fails, ROLLBACK is executed. Zero partial data is ever left behind.\n\n"
        "Third, Concurrency: We use Read Committed isolation with row-level locks on farmer_scan_summaries to prevent lost updates."
    )

    # Q5
    pdf.spoken_box(
        "Question 5: Query Efficiency, Indexes & 100x Scale",
        "8:00 - 9:30 (1m 30s)",
        "VS Code: database/schema.sql (lines 78-82). Terminal: EXPLAIN QUERY PLAN (non-indexed vs indexed).",
        "Finally, Question 5: How did we make our database usage efficient?\n\n"
        "First, Indexes Created: In schema.sql, we created B-Tree indexes:\n"
        "- Composite index idx_scans_farmer_date on prediction_scans(farmer_id, created_at DESC) supporting dashboard lookups.\n"
        "- idx_scans_disease_risk on (predicted_disease_id, risk_level) for ICAR regional disease surveillance.\n"
        "- Foreign key indexes on crop_id and disease_id.\n\n"
        "Second, Indexes Rejected: We considered indexing image_path and raw temperature. We rejected image_path because file "
        "paths have high cardinality and large byte sizes, which bloat memory pages while never being queried by range or filter. "
        "We rejected indexing continuous sensor readings to avoid write amplification overhead on high-frequency inserts.\n\n"
        "Notice on my terminal the EXPLAIN QUERY PLAN output:\n"
        "- Querying non-indexed image_path results in an O(N) full table SCAN.\n"
        "- Querying by farmer_id uses our B-Tree index: SEARCH USING INDEX idx_scans_farmer_date, achieving O(log N) efficiency and eliminating sorting.\n\n"
        "Third, What happens at 100x scale? (5 million farmers, 100+ million scans):\n"
        "1. What breaks first: Table and B-Tree indexes exceed available RAM (buffer pool), causing high disk paging and I/O bottlenecks.\n"
        "2. Architectural Solutions: We would introduce Horizontal Range Partitioning on prediction_scans by month or season, "
        "deploy Read Replicas with PgBouncer connection pooling for analytics, and offload scans older than two years to cold S3 Parquet storage."
    )

    # Wrap up
    pdf.spoken_box(
        "Conclusion & Wrap-Up",
        "9:30 - 10:00 (30 secs)",
        "VS Code: backend/server.js. Terminal: Summary of test completion.",
        "To conclude: our database design for the AI-Driven Crop Disease Prediction and Management System couples rigorous "
        "3NF normalization with deliberate caching, enforces domain integrity through SQL constraints and ACID multi-table "
        "transactions, and ensures fast query execution through strategic B-Tree indexing.\n\n"
        "All code, schema files, and demonstration scripts are available and running in our repository.\n\n"
        "Thank you very much for your time and evaluation."
    )

    # Section 3: Key Reference Commands
    pdf.section_title("3. Terminal Demonstration Cheat-Sheet", "Exact copy-paste commands to execute during the video")

    pdf.subsection_title("A. Full Automated Demonstration (Recommended)")
    pdf.code_box("./database/run_demo.sh")

    pdf.subsection_title("B. Individual Verification Queries")
    pdf.bold_label("1. Sample Diseases Query (Q1)", "")
    pdf.code_box('sqlite3 -header -column database/crop_disease.db "SELECT disease_id, crop_id, label_code, common_name, pathogen_type, severity_level FROM diseases LIMIT 4;"')

    pdf.bold_label("2. Multi-Table Join Across M:N Junction (Q2)", "")
    pdf.code_box(
        'sqlite3 -header -column database/crop_disease.db \\\n'
        '"SELECT f.full_name AS farmer, c.crop_name, d.common_name AS disease, ps.confidence_score, t.treatment_type, t.recommendation_text, st.applied_status \\\n'
        'FROM prediction_scans ps \\\n'
        'JOIN farmers f ON ps.farmer_id = f.farmer_id \\\n'
        'JOIN crops c ON ps.crop_id = c.crop_id \\\n'
        'JOIN diseases d ON ps.predicted_disease_id = d.disease_id \\\n'
        'JOIN scan_treatments st ON ps.scan_id = st.scan_id \\\n'
        'JOIN treatments t ON st.treatment_id = t.treatment_id \\\n'
        'WHERE ps.scan_id = 1001;"'
    )

    pdf.bold_label("3. Invalid Confidence Rejection Demo (Q4 - Extra Credit)", "")
    pdf.code_box(
        'sqlite3 database/crop_disease.db \\\n'
        '"INSERT INTO prediction_scans (scan_id, farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature_celsius, humidity_percentage, risk_level) \\\n'
        'VALUES (9999, 101, 1, 1, 105.00, \'/invalid.jpg\', 25.0, 70.0, \'Low\');"'
    )

    pdf.bold_label("4. Query Plan Comparison (Q5 - Index Search vs Scan)", "")
    pdf.code_box(
        '# 1. Non-indexed query -> Full Table SCAN\n'
        'sqlite3 database/crop_disease.db "EXPLAIN QUERY PLAN SELECT * FROM prediction_scans WHERE image_path = \'grape.jpg\';"\n\n'
        '# 2. Indexed query -> B-Tree Index SEARCH\n'
        'sqlite3 database/crop_disease.db "EXPLAIN QUERY PLAN SELECT scan_id, crop_id FROM prediction_scans WHERE farmer_id = 101 ORDER BY created_at DESC;"'
    )

    # Section 4: Detailed Technical Defense (Viva Answers Reference)
    pdf.section_title("4. Detailed Technical Answers (Rubric Reference)", "Exhaustive technical defense for all five questions")

    pdf.subsection_title("Q1: Database Choice & Workload Suitability")
    pdf.paragraph(
        "- Database & Type: Relational Database Management System (PostgreSQL in production, SQLite for edge/local deployment).\n"
        "- Nature of Data: Highly structured relational data (Farmers, Crops, Diseases, Treatments, Scans, Alerts) requiring rigid foreign keys and domain integrity.\n"
        "- Read/Write Patterns: Write-heavy on user scan submissions (atomic multi-table inserts). Read-heavy on farmer mobile dashboards and regional outbreak epidemiology queries by ICAR officers.\n"
        "- Expected Volume: 50,000 farmers x 3-4 scans/week = ~7.5-10 million records over 3 years (~3 GB tabular data), perfectly suited for single-node RDBMS with B-Tree indexes.\n"
        "- Strong Consistency: Critical requirement. Scan logs, disease severity ratings, chemical/organic treatments, and alert notifications must be committed simultaneously without risking partial writes.\n"
        "- Alternatives Rejected: MongoDB (Document NoSQL) was rejected because agricultural advisories require relational normalization (updating a fungicide protocol shouldn't require updating 50,000 embedded documents) and lack of native multi-table schema enforcement."
    )

    pdf.subsection_title("Q2: Relational Schema & Many-to-Many (M:N) Resolution")
    pdf.paragraph(
        "- Entities & Keys: 'farmers' (PK farmer_id), 'crops' (PK crop_id), 'diseases' (PK disease_id, FK crop_id), "
        "'treatments' (PK treatment_id, FK disease_id), 'prediction_scans' (PK scan_id, FKs to farmers, crops, diseases).\n"
        "- Relationships: Crops to Diseases (1:N), Farmers to Scans (1:N), Diseases to Treatments (1:N).\n"
        "- M:N Resolution: Prediction Scans to Treatments has an M:N cardinality (a single scan can receive multiple treatments, e.g. chemical fungicide + cultural pruning; one standard treatment applies to thousands of scans). "
        "Resolved via associative junction table 'scan_treatments' with composite primary key (scan_id, treatment_id) and attributes 'applied_status' and 'applied_date'."
    )

    pdf.subsection_title("Q3: Normal Forms & Deliberate Denormalization")
    pdf.paragraph(
        "- Highest Normal Form: Reaches 3NF and BCNF.\n"
        "- Functional Dependencies in 'prediction_scans': scan_id -> {farmer_id, crop_id, predicted_disease_id, confidence_score, image_path, temperature, humidity, risk_level, created_at}.\n"
        "- Removal of Partial Dependencies: In composite table scan_treatments, applied_status depends on the entire composite key (scan_id, treatment_id) (2NF satisfied).\n"
        "- Removal of Transitive Dependencies: prediction_scans references predicted_disease_id, but does NOT store pathogen_type or symptoms. Since scan_id -> predicted_disease_id -> pathogen_type, keeping disease attributes in 'diseases' ensures every determinant is a superkey (3NF & BCNF satisfied).\n"
        "- Deliberate Denormalization: 'farmer_scan_summaries' pre-computes total_scans, last_scan_at, and critical_scans_count. Avoids expensive COUNT(*) aggregations across millions of rows on every dashboard load, enabling O(1) lookups.\n"
        "- Correctness Maintenance: Maintained transactionally inside the backend application insert transaction block (or via AFTER INSERT database triggers)."
    )

    pdf.subsection_title("Q4: Data Correctness, Constraints & Transactions")
    pdf.paragraph(
        "- Constraints Enforced by DB: PRIMARY KEY, FOREIGN KEY (ON DELETE RESTRICT on master tables), NOT NULL on critical metrics, UNIQUE on farmer phone/email and disease label_code, and CHECK constraints (confidence_score BETWEEN 0.00 AND 100.00, humidity BETWEEN 0 AND 100, pathogen_type IN ('Fungal', 'Bacterial', 'Viral', 'Healthy')).\n"
        "- DB vs App Responsibility: App handles image tensor resizing and model inference; DB strictly enforces relational and domain integrity, rejecting out-of-range confidence scores or dangling keys.\n"
        "- Multi-Record Atomic Transaction: 'recordScanTransaction' executes 4 operations atomically: (1) insert prediction_scans, (2) insert scan_treatments, (3) insert farmer_alert_notifications, (4) update farmer_scan_summaries. If any step fails, ROLLBACK ensures zero partial writes.\n"
        "- Concurrency: Read Committed isolation with row-level locks on farmer_scan_summaries prevents lost updates."
    )

    pdf.subsection_title("Q5: Performance, Indexing & Scalability")
    pdf.paragraph(
        "- Indexes Created: B-Tree index on prediction_scans(farmer_id, created_at DESC) for fast chronological dashboard pagination; B-Tree index on (predicted_disease_id, risk_level) for ICAR regional outbreak queries; foreign key indexes on crop_id and disease_id.\n"
        "- Indexes Rejected: Rejected index on 'image_path' due to high cardinality, wide string width, and zero filter utility; rejected indexing raw sensor floats to avoid write amplification on high-frequency IoT logging.\n"
        "- 100x Growth Bottleneck (5M farmers, 100M scans): Buffer cache memory pressure and disk I/O paging on prediction_scans table and index trees.\n"
        "- Architectural Fixes: Horizontal range partitioning by month/season (PARTITION BY RANGE (created_at)); read replicas with connection pooling (PgBouncer) for analytics; cold storage archival of scans older than 2 years to S3 Parquet format."
    )

    pdf.output(output_path)
    print(f"PDF generated successfully at: {output_path}")

if __name__ == "__main__":
    out = os.path.abspath("DBMS_Viva_Video_Presentation_Guide.pdf")
    generate_pdf(out)
