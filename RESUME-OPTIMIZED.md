# Amit Sehgal — ATS-Optimized Resume Content

> Built for: Senior / Lead Data Engineer roles | Target: Product companies (Salesforce, ABB-tier) + Fintech/Banking | Geo: Dubai, AUH

---

## Professional Summary

Senior Data Engineer with **9 years** of experience architecting high-performance data platforms across **Azure, on-premises, and hybrid ecosystems** for top-tier financial institutions and industrial enterprises. Delivers **200M AED in annual cost savings** through large-scale legacy migrations (SAP HANA → PySpark) and **250+ daily automated batch jobs** across 7 international banking entities. Built a **GenAI-driven ETL acceleration framework** using Claude Code that automates code generation, compliance checks, and deployment. Combines hands-on IC depth (PySpark, Kafka, Airflow, Databricks) with growing technical leadership — leading data workstreams, mentoring engineers, and collaborating with product owners to translate business requirements into platform architecture. **7 active Microsoft Azure certifications**.

---

## Work Experience

### Data Engineer Consultant
**Emirates NBD (via ValueLabs)** — Dubai, UAE | Jan 2025 – Present

- Architected an end-to-end data pipeline for Wholesale Banking customer deals using **PySpark, Kafka, and ODS**, standardising approval workflows and deal expiry tracking to deliver **200M AED in projected annual business cost savings**.

- Spearheaded the **decommissioning of SAP HANA** by migrating BDM workflows to PySpark across **7 banking entities** (UAE, Emirates Islamic, India, Singapore, Egypt, London, KSA), eliminating SAP license costs and automating **250+ daily batch jobs** loading to Oracle. These jobs support the DealManager application and Power BI/SSRS reporting.

- Designed a highly parameterised PySpark framework configured via **simple YAML files**, enabling the engineering team to rapidly replicate **300+ ETL jobs with zero defects**.

- Built an **internal GenAI-powered ETL acceleration framework** using Claude Code — authored skills and Markdown-based configuration files that understand individual ETL requirements, auto-generate PySpark scripts with business logic, run SonarQube compliance checks, apply Spark optimizations, and trigger Git deployment pipelines. The framework eliminates boilerplate coding and enforces quality gates before CI/CD packaging.

- Manage complex daily and monthly ETL loads aggregating multiple finance sources and pricing structures, leveraging **Airflow, Oozie, and GenAI tooling** to accelerate deployment timelines.

- Shadow technical lead — work closely with Product Owners and occasionally business heads to gather requirements and translate them into engineering specifications.

**Tech:** PySpark, Kafka, ODS, SAP HANA, Apache Airflow, Oozie, Oracle, Hadoop Hive, YAML, Claude Code, GenAI, Power BI, SSRS, SonarQube, Git, CI/CD

---

### Senior Data Engineer
**EPAM Systems (Client: Canadian Tire)** — Remote | Dec 2021 – Jan 2025

- Developed feature-based data pipelines using **Azure Data Factory**, enabling an ML-powered analytical web application that processes **100 GB of daily inventory, product specification, and transaction data** to recommend optimal aisle and pegboard layouts for retail store owners.

- The application served **500+ stores** across Canadian Tire and subsidiaries (**Sport Chek, Marks, Party City**), with each store having an owner plus 2–3 dealers with application access.

- Architected the **migration of enterprise data from Hive tables** into an **Azure Cosmos DB** application database. Query optimization during the performance phase reduced retrieval times by **40%**, enabling daily data delivery by **6:00 AM** — ahead of operational SLAs.

- Collaborated directly with Business Analysts and Backend Developers to define business requirements and structure **optimized JSON schemas** for Cosmos DB.

- Acted as **de facto data engineering lead** for a 3-person team, owning architecture decisions and delivery timelines.

**Tech:** Azure Data Factory, Azure Cosmos DB, Apache Hive, Delta Lake, JSON, ML Pipelines, Retail Analytics

---

### Research & Development Engineer
**ABB Global Limited** — Bangalore, India | Feb 2020 – Dec 2021

- Built a **real-time data pipeline** spanning Azure cloud and on-premises edge deployments to process **semi-structured IoT telemetry data** (vibration, temperature, sensor readings) from industrial machines deployed in factories, ships, and ocean vessels. Aggregate data streamed to Azure cloud via **ActiveMQ and Event Hub**, while individual sensor data was collected locally at edge servers without internet dependency.

- Designed a framework to deploy **Machine Learning models on unstructured data** (text, images, and videos) — including **anomaly detection on conveyor belt imagery** for predictive maintenance — routing results to **Cosmos DB and MongoDB** for downstream analytics.

- Developed automated PySpark batch jobs to clean, transform, and migrate data from the data lake to the curated store, scheduling executions via **Rundeck, Azure Pipelines, and Azure Data Factory**.

- Created **custom Python CRUD APIs** (Flask) consumed by local edge servers to insert processed data into **local MongoDB instances**, automating script generation and pipeline construction. This saved the engineering team an estimated **15 hours of manual effort per week**.

- Managed infrastructure using **Docker, Helm, and Kubernetes** for containerized data services.

**Tech:** Azure IoT, PySpark, ActiveMQ, Azure Event Hub, ML Models, Computer Vision, Cosmos DB, MongoDB, Flask, Rundeck, Azure Pipelines, Docker, Kubernetes, Helm

---

### Data Engineer
**Infosys (Clients: PwC, Exelon)** — Pune, India | Mar 2017 – Feb 2020

- Developed PySpark-based ETL workflows to migrate diverse data formats (**CSV, JSON, MySQL**) into an on-premises **HDFS environment** in Parquet format. Served on a **9-person team** for PwC (2 years) and a **4-person team** for Exelon (1 year).

- Optimized data delivery by executing query transformations and creating tables on top of HDFS files to push data to the curated layer, scheduled reliably using **Cron**.

- Designed a **snowflake schema data warehouse** for PwC's Master Data Management system and built energy-domain data models for Exelon using **dimensional modeling** principles.

- Automated data API testing by writing robust test scripts using **Python and Selenium**, successfully validating data loads from Oracle DB to MongoDB.

- Assisted in the architectural design of the data warehouse schema and actively resolved bugs via the **VSTS (Azure DevOps) platform**.

**Tech:** PySpark, HDFS, Apache Hive, Parquet, Python, Selenium, Oracle DB, MongoDB, MySQL, Cron, VSTS, Data Modeling, Dimensional Modeling, MDM

---

## Projects

### GenAI Games Portfolio
**https://amitsehgal29.github.io/games** — *Personal Project*

Built a collection of interactive web games to learn and demonstrate **LLM framework deployment patterns**. Deployed on GitHub Pages. Explored AI-assisted development workflows and real-time inference integration.

### Vasai Corona Resources
**vasai-corona-resources.net** — *Personal Project*

Designed and engineered a highly available web application using the **Flask** framework to curate essential COVID-19 resources for the Vasai-Virar city region. Deployed on a standalone **AWS Linux EC2 instance** with custom DNS and firewall configuration. The backend handled traffic spikes of **5,000+ daily users** without downtime.

**Tech:** Python, Flask, AWS EC2, DNS, Linux, Firewall Configuration

---

## Technical Skills

| Category | Technologies |
|----------|-------------|
| **Languages** | Python, SQL, NoSQL, Shell Scripting |
| **Big Data & Processing** | PySpark (AQE, partitioning, skew handling, broadcast joins), Apache Kafka, Apache Flink, Hadoop, Hive, HDFS |
| **Cloud (Azure)** | Azure Data Factory, Azure Databricks (Delta Lake, Unity Catalog, Photon), Azure Cosmos DB, Azure Event Hub, Azure IoT, Azure DevOps |
| **Modern Data Stack** | Snowflake, dbt, Apache Airflow, Oozie, Delta Lake (OPTIMIZE, Z-Ordering, VACUUM) |
| **Streaming** | Real-time pipelines (Kafka, Flink, Event Hub, ActiveMQ), Spark Structured Streaming |
| **GenAI & LLM** | Claude Code integration, AI-assisted ETL generation, automated code review + compliance, CI/CD automation |
| **DevOps & Infra** | Docker, Kubernetes, Helm, Terraform, Git, CI/CD (Azure DevOps), SonarQube |
| **Data Modeling** | Dimensional modeling, star/snowflake schema, SCD Type 2, Master Data Management |
| **Governance** | Unity Catalog, Data Quality frameworks, Data Lineage |

---

## Certifications

- Microsoft Certified: **Azure Developer Associate**
- Microsoft Certified: **Azure IoT Developer Specialty**
- **5 additional** Microsoft Azure certifications (7 total active)
- Databricks Data Engineer Associate *(in progress — renewal)*
- Multiple LinkedIn Learning certifications in data engineering, cloud architecture, and leadership

---

## Education

**Bachelor of Engineering — Electronics & Telecommunications**
Mumbai University | 2012 – 2016

---

## Languages

English (Fluent), Hindi (Native)

---

## Visa Status

UAE Work Visa (current) — Dubai & Abu Dhabi
