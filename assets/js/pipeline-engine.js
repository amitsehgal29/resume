/* ==========================================================================
   Pipeline Engine v5 — Simple Big Box Layout
   ========================================================================== */

const DETAIL = {
  source: {
    title: 'Amit Sehgal', subtitle: 'Senior Data Engineer · Dubai, UAE · 9 Years Experience',
    sparkMeta: '7 Azure Certs · English & Hindi · UAE Work Visa',
    html: `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">📍 Dubai, UAE</span><span class="detail-badge primary">📧 reachamitsehgal29@gmail.com</span><span class="detail-badge">📞 +971-506889952</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code">df = spark.read.format("json").load("s3://data-lake/bronze/profile/*.json")<br>df.select("name","title","experience_years","certs","target_role").show()</div><div class="nb-cell__output">name: Amit Sehgal<br>title: Senior Data Engineer → targeting Lead DE<br>experience_years: 9 (Banking, Retail, IoT, Consulting)<br>certs: 7 active (Azure Developer, IoT, +5 more)<br>target: Product companies & Fintech | Dubai & AUH</div></div><p class="detail-text">Senior Data Engineer with <strong>9 years</strong> of experience architecting data platforms across <strong>Azure, on-premises, and hybrid ecosystems</strong> for top-tier financial institutions and industrial enterprises. Delivers <strong>200M AED in annual cost savings</strong> through large-scale migrations and <strong>250+ daily automated jobs</strong>. Built a <strong>GenAI-driven ETL framework</strong> using Claude Code for automated code generation, compliance, and deployment. Combines hands-on IC depth with growing technical leadership.</p><div class="detail-links"><a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a><a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download Resume</a></div></div>`
  },
  bronze: {
    title: 'Bronze Layer — Raw Data Lake',
    subtitle: 'Delta Table: delta_bronze.career_experience',
    sparkMeta: '4 versions · 4 companies · 9 years · Banking, Retail, IoT, Consulting',
    html: `<div class="detail-block"><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">DESCRIBE HISTORY delta_bronze.career_experience</div><div class="nb-cell__output">4 versions · 4 companies · 9 years · Banking, Retail, IoT, Consulting</div></div><p class="detail-text">Raw experience data ingested from <strong>4 enterprise organizations</strong> across diverse domains.</p></div>`
  },
  silver: {
    title: 'Silver Layer — Validated & Clean',
    subtitle: 'Delta Table: delta_silver.validated_skills',
    sparkMeta: 'Quality checks: 12/12 passed · 1.4s',
    html: `<div class="detail-block"><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">SELECT skill_category, COUNT(*) as cnt FROM delta_silver.validated_skills GROUP BY 1</div><div class="nb-cell__output">Core Engineering: 7 | Cloud & Big Data: 9 | Modern Stack: 4 | Advanced: 6</div></div></div>`
  },
  gold: {
    title: 'Gold Layer — Business Value',
    subtitle: 'Delta Table: delta_gold.kpi_metrics',
    sparkMeta: 'OPTIMIZE + VACUUM applied · 0.6s',
    html: `<div class="detail-block"><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">OPTIMIZE delta_gold.kpi_metrics<br>VACUUM delta_gold.kpi_metrics RETAIN 168 HOURS<br>SELECT * FROM delta_gold.kpi_metrics</div></div></div>`
  },
  sink: {
    title: 'Let\'s Build Together',
    subtitle: 'Dubai, UAE · Open to Senior DE Roles',
    sparkMeta: 'Format: PDF / LinkedIn / Email · Always available',
    html: `<div class="detail-block"><div class="detail-links"><a href="mailto:reachamitsehgal29@gmail.com" class="detail-link primary">✉️ Email</a><a href="tel:+971506889952" class="detail-link">📞 Call</a><a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a><a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download PDF</a></div></div>`
  },
  emirates: {
    title: 'Data Engineer Consultant',
    subtitle: 'Emirates NBD · via ValueLabs · Jan 2025 – Present',
    sparkMeta: '7 banking entities · 250+ daily jobs · 200M AED saved/year',
    html: `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">PySpark</span><span class="detail-badge primary">Kafka</span><span class="detail-badge primary">Airflow</span><span class="detail-badge success">GenAI/Claude Code</span><span class="detail-badge">Oozie</span><span class="detail-badge">Oracle</span><span class="detail-badge">SAP HANA</span><span class="detail-badge">ODS</span><span class="detail-badge">Hive</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code"><span class="nb-comment">// GenAI-driven ETL acceleration framework</span><br>spark.conf.set("spark.sql.adaptive.enabled", "true")<br>spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", "true")<br><span class="nb-comment">// Claude Code: auto-generate scripts, SonarQube, Git deploy</span><br>skills run etl-generator --source hana --target hive --compliance sonar</div></div><ul class="detail-list"><li>Architected E2E Wholesale Banking pipeline — <strong>PySpark + Kafka + ODS</strong> — delivering <strong>200M AED in projected annual cost savings</strong> through automated approval workflows and deal expiry tracking.</li><li>Spearheaded <strong>SAP HANA decommissioning</strong> across <strong>7 international banking entities</strong> (UAE, Emirates Islamic, India, Singapore, Egypt, London, KSA), migrating BDM workflows to PySpark and automating <strong>250+ daily batch jobs</strong> for DealManager, Power BI, and SSRS reporting.</li><li>Designed a <strong>parameterised YAML-driven PySpark framework</strong> — enabled the team to rapidly replicate <strong>300+ ETL jobs with zero defects</strong>.</li><li>Built an <strong>internal GenAI-powered ETL acceleration framework</strong> using Claude Code — authored skills and MD configs that auto-generate PySpark scripts with business logic, run SonarQube compliance, apply Spark optimizations, and trigger Git deployment pipelines <strong>before CI/CD packaging</strong>.</li><li>Manage complex ETL loads aggregating multiple finance sources via <strong>Airflow, Oozie, and GenAI tooling</strong>. Shadow technical lead — collaborate with Product Owners and business heads on requirements.</li></ul></div>`
  },
  epam: {
    title: 'Senior Data Engineer',
    subtitle: 'EPAM Systems · Client: Canadian Tire · Dec 2021 – Jan 2025',
    sparkMeta: '500+ stores · 100 GB/day · 40% faster queries · 3 subsidiaries',
    html: `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Cosmos DB</span><span class="detail-badge">Hive</span><span class="detail-badge">Delta Lake</span><span class="detail-badge">JSON</span><span class="detail-badge">ML Pipelines</span></div><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code"><span class="nb-comment">-- Hive → Delta → Cosmos DB: 40% faster, data by 6 AM</span><br>CREATE TABLE delta_silver.dealer_analytics<br>USING DELTA<br>LOCATION 's3://datalake/silver/dealer_analytics'<br>AS SELECT * FROM hive_enterprise.dealer_data<br>WHERE partition_date >= '2021-01-01'</div></div><ul class="detail-list"><li>Developed <strong>feature-based ADF pipelines</strong> processing <strong>100 GB of daily inventory, product spec, and transaction data</strong> to power an ML-driven retail analytics application that recommends optimal aisle and pegboard layouts.</li><li>Served <strong>500+ stores</strong> across Canadian Tire and subsidiaries (<strong>Sport Chek, Marks, Party City</strong>), with each store owner plus 2–3 dealers having application access.</li><li>Architected <strong>Hive → Cosmos DB</strong> migration — query optimization reduced retrieval times by <strong>40%</strong>, enabling daily data delivery by <strong>6:00 AM</strong> ahead of operational SLAs.</li><li>Acted as <strong>de facto data engineering lead</strong> for a 3-person team — owned architecture decisions, delivery timelines, and cross-functional collaboration with BAs and Backend Developers on JSON schema design.</li></ul></div>`
  },
  abb: {
    title: 'R&D Engineer',
    subtitle: 'ABB Global Limited · Feb 2020 – Dec 2021',
    sparkMeta: 'Industrial IoT · Edge + Cloud · Predictive Maintenance · Docker/K8s',
    html: `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">Azure IoT</span><span class="detail-badge primary">PySpark</span><span class="detail-badge primary">ML/Computer Vision</span><span class="detail-badge">ActiveMQ</span><span class="detail-badge">Event Hub</span><span class="detail-badge">Cosmos DB</span><span class="detail-badge">MongoDB</span><span class="detail-badge">Rundeck</span><span class="detail-badge">Docker</span><span class="detail-badge">Kubernetes</span><span class="detail-badge">Helm</span><span class="detail-badge success">Flask APIs</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code"><span class="nb-comment">// Real-time IoT: vibration + temp → anomaly detection</span><br>df_stream = spark.readStream \\<br>  .format("eventhubs") \\<br>  .options(**ehConf) \\<br>  .load()<br><br>df_stream.writeStream \\<br>  .format("delta") \\<br>  .option("checkpointLocation", "s3://datalake/checkpoints/iot/") \\<br>  .table("delta_bronze.iot_telemetry")</div></div><ul class="detail-list"><li>Built <strong>real-time IoT pipeline</strong> across Azure cloud and on-premises edge — processed <strong>semi-structured telemetry</strong> (vibration, temperature, sensor readings) from industrial machines in factories, ships, and ocean vessels.</li><li>Aggregate data streamed to Azure via <strong>ActiveMQ + Event Hub</strong>; individual sensor data collected locally at <strong>edge servers</strong> (no internet dependency).</li><li>Designed <strong>ML framework for unstructured data</strong> (text, images, video) — including <strong>computer vision anomaly detection on conveyor belt imagery</strong> for predictive maintenance. Results routed to Cosmos DB and MongoDB.</li><li>Created <strong>custom Flask CRUD APIs</strong> consumed by local edge servers to insert data into <strong>local MongoDB</strong> — automated script generation and pipeline construction, saving <strong>15 hrs/week</strong> across the engineering team.</li><li>Managed containerized services using <strong>Docker, Kubernetes, and Helm</strong>. Scheduled PySpark batch jobs via Rundeck, Azure Pipelines, and ADF.</li></ul></div>`
  },
  infosys: {
    title: 'Data Engineer',
    subtitle: 'Infosys · Clients: PwC, Exelon · Mar 2017 – Feb 2020',
    sparkMeta: 'PwC (2 yrs, 9-person team) · Exelon (1 yr, 4-person team)',
    html: `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">PySpark</span><span class="detail-badge primary">HDFS</span><span class="detail-badge">Parquet</span><span class="detail-badge">Python</span><span class="detail-badge">Selenium</span><span class="detail-badge">Oracle DB</span><span class="detail-badge">MongoDB</span><span class="detail-badge">MySQL</span><span class="detail-badge">VSTS</span><span class="detail-badge">Data Modeling</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code"><span class="nb-comment">// Multi-format ETL: CSV + JSON + MySQL → Parquet on HDFS</span><br>df = spark.read \\<br>  .format("csv").option("header", "true").load(csv_path)<br>  .unionByName(spark.read.json(json_path))<br>  .unionByName(spark.read.format("jdbc").option("url", mysql_url).load())<br><br>df.write.format("parquet") \\<br>  .mode("overwrite").partitionBy("date") \\<br>  .save("hdfs://datalake/curated/")</div></div><ul class="detail-list"><li>Developed <strong>PySpark ETL workflows</strong> to ingest diverse formats (<strong>CSV, JSON, MySQL</strong>) into on-premises <strong>HDFS in Parquet</strong> — served on a 9-person PwC team (2 years) and 4-person Exelon team (1 year).</li><li>Designed <strong>snowflake schema data warehouse</strong> for PwC's Master Data Management system and built <strong>energy-domain dimensional models</strong> for Exelon.</li><li>Optimized data delivery via query transformations and HDFS table creation → curated layer, scheduled reliably via <strong>Cron</strong>.</li><li>Automated <strong>API testing with Python + Selenium</strong> — validated data loads from Oracle DB to MongoDB. Contributed to <strong>architectural data warehouse design</strong> and resolved bugs via <strong>Azure DevOps (VSTS)</strong>.</li></ul></div>`
  },
  skills: {
    title: 'Technical Skills', subtitle: 'Unity Catalog: main.eng_skills · 30+ verified technologies · 7 Azure Certs', sparkMeta: 'GenAI · Databricks · Kafka · Spark Tuning · DevOps · Data Modeling',
    html: `<div class="detail-block">
      <div class="detail-section"><h4 class="detail-section-title">Languages & Core</h4><div class="detail-meta-row"><span class="detail-badge primary">Python</span><span class="detail-badge primary">PySpark (AQE, skew, partitioning)</span><span class="detail-badge">SQL</span><span class="detail-badge">NoSQL</span><span class="detail-badge">Shell</span></div></div>
      <div class="detail-section"><h4 class="detail-section-title">Cloud & Big Data (Azure)</h4><div class="detail-meta-row"><span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Databricks (Delta Lake, Unity Catalog, Photon)</span><span class="detail-badge">Cosmos DB</span><span class="detail-badge">Event Hub</span><span class="detail-badge">Azure IoT</span><span class="detail-badge">Hadoop/Hive/HDFS</span></div></div>
      <div class="detail-section"><h4 class="detail-section-title">Streaming & Real-Time</h4><div class="detail-meta-row"><span class="detail-badge primary">Apache Kafka</span><span class="detail-badge">Flink</span><span class="detail-badge">ActiveMQ</span><span class="detail-badge">Spark Structured Streaming</span><span class="detail-badge">Event Hub</span></div></div>
      <div class="detail-section"><h4 class="detail-section-title">Modern Data Stack</h4><div class="detail-meta-row"><span class="detail-badge primary">Snowflake</span><span class="detail-badge">dbt</span><span class="detail-badge primary">Apache Airflow</span><span class="detail-badge">Oozie</span></div></div>
      <div class="detail-section"><h4 class="detail-section-title">GenAI & LLM Pipelines</h4><div class="detail-meta-row"><span class="detail-badge primary">Claude Code</span><span class="detail-badge">AI-Assisted ETL</span><span class="detail-badge">Automated Code Review</span><span class="detail-badge">CI/CD Automation</span></div></div>
      <div class="detail-section"><h4 class="detail-section-title">DevOps & Infra</h4><div class="detail-meta-row"><span class="detail-badge primary">Docker</span><span class="detail-badge">Kubernetes</span><span class="detail-badge">Helm</span><span class="detail-badge">Terraform</span><span class="detail-badge">Azure DevOps</span><span class="detail-badge">SonarQube</span><span class="detail-badge">Git</span></div></div>
      <div class="detail-section"><h4 class="detail-section-title">Data Modeling & Governance</h4><div class="detail-meta-row"><span class="detail-badge primary">Dimensional Modeling</span><span class="detail-badge">Star/Snowflake Schema</span><span class="detail-badge">SCD Type 2</span><span class="detail-badge">MDM</span><span class="detail-badge">Unity Catalog</span></div></div>
    </div>`
  },
  certs: {
    title: 'Certifications — 7 Active Microsoft Azure Certs', subtitle: 'Databricks Data Engineer Associate (in progress)', sparkMeta: 'Validation: Microsoft Learning · LinkedIn Learning · Continuous Education',
    html: `<div class="detail-block"><div class="detail-cert"><span class="detail-cert-icon">☁️</span><div><strong>Azure Developer Associate</strong><br><span class="detail-text-sm">Microsoft Certified — Active</span></div></div><div class="detail-cert"><span class="detail-cert-icon">🔌</span><div><strong>Azure IoT Developer Specialty</strong><br><span class="detail-text-sm">Microsoft Certified — Active</span></div></div><div class="detail-cert"><span class="detail-cert-icon">📜</span><div><strong>5 Additional Microsoft Azure Certifications</strong><br><span class="detail-text-sm">7 total active certifications across cloud, data, and IoT domains</span></div></div><div class="detail-cert"><span class="detail-cert-icon">📚</span><div><strong>LinkedIn Learning</strong><br><span class="detail-text-sm">Multiple courses in Data Engineering, Cloud Architecture, and Technical Leadership</span></div></div></div>`
  },
  edu: {
    title: 'Education', subtitle: 'B.E. Electronics & Telecom · Mumbai University · 2012 – 2016', sparkMeta: 'Continuous learning: LinkedIn Learning · Personal GitHub · LLM Deployment Projects',
    html: `<div class="detail-block"><div class="detail-cert"><span class="detail-cert-icon">🎓</span><div><strong>B.E. Electronics & Telecommunications</strong><br><span class="detail-text-sm">Mumbai University · 2012 – 2016</span></div></div><div class="detail-cert"><span class="detail-cert-icon">🎮</span><div><strong>GenAI Games Portfolio</strong><br><span class="detail-text-sm">github.com/amitsehgal29/games — Interactive games for learning LLM framework deployment</span></div></div><div class="detail-cert"><span class="detail-cert-icon">✍️</span><div><strong>Technical Writing</strong><br><span class="detail-text-sm">Published articles on Medium.com — Data Engineering & Cloud Architecture</span></div></div></div>`
  },
  project: {
    title: 'Production Projects', subtitle: 'Flask · AWS EC2 · DNS · LLM Framework Deployment', sparkMeta: 'vasai-corona-resources.net + github.com/amitsehgal29/games',
    html: `<div class="detail-block">
      <div class="detail-section"><h4 class="detail-section-title">Vasai Corona Resources</h4><div class="detail-meta-row"><span class="detail-badge primary">Python</span><span class="detail-badge primary">Flask</span><span class="detail-badge">AWS EC2</span><span class="detail-badge">DNS</span></div><ul class="detail-list"><li>Engineered <strong>Flask web app</strong> for COVID-19 resources in the Vasai-Virar region. Deployed on standalone <strong>AWS Linux EC2</strong> with custom DNS and firewall configuration. Backend handled <strong>5,000+ daily users</strong> with zero downtime.</li></ul></div>
      <div class="detail-section" style="margin-top:12px"><h4 class="detail-section-title">GenAI Games Portfolio</h4><div class="detail-meta-row"><span class="detail-badge primary">LLM Integration</span><span class="detail-badge">GitHub Pages</span><span class="detail-badge">AI-Assisted Dev</span></div><ul class="detail-list"><li>Built interactive web games to learn and demonstrate <strong>LLM framework deployment patterns</strong>. Deployed on GitHub Pages. Explored AI-assisted development workflows and real-time inference.</li></ul></div>
      <div class="nb-cell" style="margin-top:12px"><div class="nb-cell__cmd">%sh</div><div class="nb-cell__code"><span class="nb-comment"># Flask deployment on AWS EC2 with custom DNS</span><br>ssh -i key.pem ec2-user@vasai-corona-resources.net<br>sudo systemctl status flask-app<br><span class="nb-comment"># active (running) — 5,000 DAU, zero downtime</span></div></div>
    </div>`
  },
  kpi: {
    title: 'Pipeline Performance Metrics', subtitle: '9 Years · Production Impact Across Banking, Retail, IoT & Consulting', sparkMeta: 'Refresh: Real-time · Source: delta_gold.kpi_metrics · OPTIMIZE + VACUUM applied',
    html: `<div class="detail-block"><div class="kpi-grid kpi-grid--wide"><div class="kpi-card"><span class="kpi-value">200M<span class="kpi-unit"> AED</span></span><span class="kpi-label">Annual Cost Savings</span><span class="kpi-context">SAP HANA Decommissioning</span></div><div class="kpi-card"><span class="kpi-value">250<span class="kpi-unit">/day</span></span><span class="kpi-label">Automated Batch Jobs</span><span class="kpi-context">7 International Entities</span></div><div class="kpi-card"><span class="kpi-value">300<span class="kpi-unit">+ ETL</span></span><span class="kpi-label">YAML Framework Jobs</span><span class="kpi-context">Zero-Defect Replication</span></div><div class="kpi-card"><span class="kpi-value">100<span class="kpi-unit"> GB</span></span><span class="kpi-label">Daily Throughput</span><span class="kpi-context">500+ Stores · 3 Subsidiaries</span></div><div class="kpi-card"><span class="kpi-value">40<span class="kpi-unit">%</span></span><span class="kpi-label">Query Performance Gain</span><span class="kpi-context">Hive → Cosmos DB</span></div><div class="kpi-card"><span class="kpi-value">7<span class="kpi-unit"> certs</span></span><span class="kpi-label">Azure Certifications</span><span class="kpi-context">Microsoft Active</span></div><div class="kpi-card"><span class="kpi-value">15<span class="kpi-unit"> hrs</span></span><span class="kpi-label">Saved Per Week</span><span class="kpi-context">Py CRUD API Automation</span></div><div class="kpi-card"><span class="kpi-value">5,000<span class="kpi-unit"> DAU</span></span><span class="kpi-label">Peak Traffic Handled</span><span class="kpi-context">Flask · AWS EC2 · Zero Downtime</span></div><div class="kpi-card"><span class="kpi-value">30<span class="kpi-unit">+ tools</span></span><span class="kpi-label">Technology Stack</span><span class="kpi-context">Azure · Spark · Kafka · GenAI</span></div></div><div class="nb-cell" style="margin-top:12px"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">SELECT pipeline_stage, sla_pct, p90_latency_ms<br>FROM delta_gold.pipeline_sla_metrics<br>WHERE pipeline_id = 'amit_resume_dag'</div><div class="nb-cell__output">bronze_ingestion: 99.8% SLA (p90: 320ms)<br>silver_validation: 99.9% SLA (p90: 180ms)<br>gold_aggregation: 100% SLA (p90: 95ms)<br>sink_export: 99.99% SLA (p90: 45ms)</div></div></div>`
  }
};

class PipelineEngine {
  constructor() {
    this.canvas = document.getElementById('pipeline-canvas');
    this.svgLayer = document.getElementById('pipeline-svg');
    this.mainFlow = document.getElementById('pipeline-main-flow');
    this.detailPanel = document.getElementById('detail-panel');
    this.detailContent = document.getElementById('detail-content');
    this.detailTitle = document.getElementById('detail-title');
    this.detailSubtitleEl = document.getElementById('detail-subtitle');
    this.detailSparkMeta = document.getElementById('detail-spark-meta');
    this.runBtn = document.getElementById('btn-run');
    this.statusIndicator = document.getElementById('pipeline-status');
    this.clusterRuntime = document.getElementById('cluster-runtime');
    this.nodeEls = {};
    this.activeNodeId = null;
    this.isRunning = false;
    this.particles = [];
    this.init();
  }

  /* ── Build + Render ─────────────────────────────────────────── */

  buildHTML() {
    this.mainFlow.innerHTML = `
      <!-- SOURCE -->
      <div class="pipeline-node pipeline-node--source" id="node-source" data-node="source">
        <span class="pipeline-node__icon">📥</span><span class="pipeline-node__text"><span class="pipeline-node__label">Raw Profile<br>Data</span></span>
        <span class="pipeline-node__status status--pending"></span>
      </div>

      <!-- SVG line instead -->

      <!-- BRONZE ZONE -->
      <div class="pipeline-zone pipeline-zone--bronze" id="zone-bronze">
        <div class="pipeline-zone__label">BRONZE — Raw Data Lake</div>
        <div class="pipeline-zone__nodes" id="zone-bronze-activities"></div>
      </div>

      <!-- SVG line instead -->

      <!-- SILVER ZONE -->
      <div class="pipeline-zone pipeline-zone--silver" id="zone-silver">
        <div class="pipeline-zone__label">SILVER — Validated & Clean</div>
        <div class="pipeline-zone__nodes" id="zone-silver-activities"></div>
      </div>

      <!-- SVG line instead -->

      <!-- GOLD ZONE -->
      <div class="pipeline-zone pipeline-zone--gold" id="zone-gold">
        <div class="pipeline-zone__label">GOLD — Curated Insights</div>
        <div class="pipeline-zone__nodes" id="zone-gold-activities"></div>
      </div>

      <!-- SVG line instead -->

      <!-- EXPORT -->
      <div class="pipeline-node pipeline-node--sink" id="node-sink" data-node="sink">
        <span class="pipeline-node__icon">📤</span><span class="pipeline-node__text"><span class="pipeline-node__label">Export<br>Contact</span></span>
        <span class="pipeline-node__status status--pending"></span>
      </div>
    `;

    // Activity nodes inside zones
    const activities = [
      { id: 'emirates', zone: 'zone-bronze-activities', icon: '🏦', label: 'Emirates NBD', sub: 'DE Consultant · 250 jobs/day · 7 entities', layer: 'bronze' },
      { id: 'epam', zone: 'zone-bronze-activities', icon: '🏢', label: 'EPAM Systems', sub: 'Sr DE · Dec 2021–Jan 2025', layer: 'bronze' },
      { id: 'abb', zone: 'zone-bronze-activities', icon: '⚡', label: 'ABB Global', sub: 'R&D Engineer · Feb 2020–Dec 2021', layer: 'bronze' },
      { id: 'infosys', zone: 'zone-bronze-activities', icon: '💻', label: 'Infosys', sub: 'Data Engineer · Mar 2017–Feb 2020', layer: 'bronze' },
      { id: 'skills', zone: 'zone-silver-activities', icon: '🔧', label: 'Technical Skills', sub: '26 Technologies · 4 Clusters', layer: 'silver' },
      { id: 'certs', zone: 'zone-silver-activities', icon: '📜', label: 'Certifications', sub: '2 Azure Certs', layer: 'silver' },
      { id: 'edu', zone: 'zone-silver-activities', icon: '🎓', label: 'Education', sub: 'B.E. Mumbai Univ · 2012–2016', layer: 'silver' },
      { id: 'project', zone: 'zone-gold-activities', icon: '🚀', label: 'Production Project', sub: 'Flask · 5,000 DAU', layer: 'gold' },
      { id: 'kpi', zone: 'zone-gold-activities', icon: '📊', label: 'Pipeline KPIs', sub: '9 Metrics · SLA · Throughput', layer: 'gold' },
    ];

    activities.forEach(a => {
      const zone = document.getElementById(a.zone);
      if (!zone) return;
      const el = document.createElement('div');
      el.className = `pipeline-node pipeline-node--activity pipeline-node--${a.layer}`;
      el.id = `node-${a.id}`;
      el.dataset.node = a.id;
      el.innerHTML = `<span class="pipeline-node__icon">${a.icon}</span><span class="pipeline-node__text"><span class="pipeline-node__label">${a.label}</span><span class="pipeline-node__sublabel">${a.sub}</span></span>`;
      zone.appendChild(el);
    });

    // Register all node elements
    this.mainFlow.querySelectorAll('[data-node]').forEach(el => {
      this.nodeEls[el.dataset.node] = el;
      el.addEventListener('click', (e) => { e.stopPropagation(); this.selectNode(el.dataset.node); });
    });
  }

  /* ── Helpers ─────────────────────────────────────────────────── */

  // Find where a ray from (cx,cy) in direction (dx,dy) hits a rectangle of half-size (hw,hh)
  edgePoint(cx, cy, hw, hh, dx, dy) {
    if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return { x: cx, y: cy };
    const tx = dx !== 0 ? Math.abs(hw / dx) : Infinity;
    const ty = dy !== 0 ? Math.abs(hh / dy) : Infinity;
    const t = Math.min(tx, ty);
    return { x: cx + dx * t, y: cy + dy * t };
  }

  /* ── SVG Connections — Curved Bezier Lines ───────────────────── */

  drawArrows() {
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    this.svgLayer.innerHTML = '';
    this.particles = [];
    const cr = this.canvas.getBoundingClientRect();

    // Connection definitions: [from, to, style]
    // style: 'flow' (horizontal main), 'bronze', 'silver', 'gold'
    const pairs = [
      ['source', 'emirates', 'flow'],
      ['emirates', 'skills', 'flow'],
      ['skills', 'project', 'flow'],
      ['project', 'sink', 'flow'],
      ['emirates', 'epam', 'bronze'],
      ['epam', 'abb', 'bronze'],
      ['abb', 'infosys', 'bronze'],
      ['skills', 'certs', 'silver'],
      ['certs', 'edu', 'silver'],
      ['project', 'kpi', 'gold'],
    ];

    const colors = {
      flow:   { stroke: '#FF3621', glow: 'rgba(255,54,33,0.4)', dash: 'none' },
      bronze: { stroke: '#B87333', glow: 'rgba(184,115,51,0.3)', dash: '6 3' },
      silver: { stroke: '#8E8E93', glow: 'rgba(142,142,147,0.25)', dash: '4 4' },
      gold:   { stroke: '#FBBF24', glow: 'rgba(251,191,36,0.35)', dash: 'none' },
    };

    pairs.forEach(([from, to, style]) => {
      const fe = this.nodeEls[from], te = this.nodeEls[to];
      if (!fe || !te) return;
      const fr = fe.getBoundingClientRect(), tr = te.getBoundingClientRect();
      const cx1 = fr.left + fr.width/2 - cr.left + this.canvas.scrollLeft;
      const cy1 = fr.top + fr.height/2 - cr.top + this.canvas.scrollTop;
      const cx2 = tr.left + tr.width/2 - cr.left + this.canvas.scrollLeft;
      const cy2 = tr.top + tr.height/2 - cr.top + this.canvas.scrollTop;

      // Calculate edge intersection points based on actual node dimensions
      const sx = this.edgePoint(cx1, cy1, fr.width/2 + 4, fr.height/2 + 4, cx2-cx1, cy2-cy1);
      const ex = this.edgePoint(cx2, cy2, tr.width/2 + 4, tr.height/2 + 4, cx1-cx2, cy1-cy2);

      // Curved path — control point offset perpendicular at midpoint
      const mx = (sx.x+ex.x)/2, my = (sx.y+ex.y)/2;
      const pdx = ex.x - sx.x, pdy = ex.y - sx.y;
      const perpX = -pdy, perpY = pdx;
      const plen = Math.sqrt(perpX*perpX+perpY*perpY)||1;
      const bow = style === 'flow' ? 6 : 4;
      const cpx = mx + (perpX/plen)*bow;
      const cpy = my + (perpY/plen)*bow;

      const col = colors[style];

      const g = document.createElementNS('http://www.w3.org/2000/svg','g');
      g.dataset.from=from; g.dataset.to=to; g.classList.add('pipeline-connection');

      // Curved line
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', `M${sx.x},${sx.y} Q${cpx},${cpy} ${ex.x},${ex.y}`);
      path.setAttribute('fill','none');
      path.setAttribute('stroke', col.stroke);
      path.setAttribute('stroke-width', style==='flow'?'2.5':'1.8');
      path.setAttribute('stroke-dasharray', col.dash);
      path.setAttribute('stroke-linecap','round');
      path.classList.add('pipeline-edge');
      g.appendChild(path);

      // Arrow head at end
      const angle = Math.atan2(ex.y-cpy, ex.x-cpx);
      const asz = style==='flow'?7:5;
      const arrow = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      arrow.setAttribute('points',`${ex.x},${ex.y} ${ex.x-asz*Math.cos(angle-0.5)},${ex.y-asz*Math.sin(angle-0.5)} ${ex.x-asz*Math.cos(angle+0.5)},${ex.y-asz*Math.sin(angle+0.5)}`);
      arrow.setAttribute('fill', col.stroke);
      arrow.classList.add('pipeline-arrow');
      g.appendChild(arrow);

      // 2-3 particles per line at staggered positions
      const particleCount = style==='flow'?2:1;
      for (let i=0; i<particleCount; i++) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
        dot.setAttribute('r', style==='flow'?'3.5':'2.5');
        dot.setAttribute('fill', col.stroke);
        dot.setAttribute('filter', `drop-shadow(0 0 4px ${col.glow})`);
        dot.classList.add('pipeline-particle');
        g.appendChild(dot);
        this.particles.push({
          el: dot, sx: sx.x, sy: sx.y, cpx, cpy, ex: ex.x, ey: ex.y,
          speed: 0.002 + Math.random()*0.003,
          progress: i/particleCount,
          origFill: col.stroke,
          origFilter: `drop-shadow(0 0 4px ${col.glow})`,
        });
      }

      this.svgLayer.appendChild(g);
    });
    this.animateParticles();
  }

  animateParticles() {
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    if (!this.particles.length) { this._animFrame = requestAnimationFrame(()=>this.animateParticles()); return; }
    // Toggle particle color: yellow when running, original when idle
    this.particles.forEach(p => {
      if (this.isRunning) {
        p.el.setAttribute('fill', '#FBBF24');
        p.el.setAttribute('filter', 'drop-shadow(0 0 5px rgba(251,191,36,0.5))');
      } else if (p.el.getAttribute('fill') === '#FBBF24') {
        p.el.setAttribute('fill', p.origFill);
        p.el.setAttribute('filter', p.origFilter);
      }
    });
    this.particles.forEach(p => {
      p.progress += p.speed;
      if (p.progress>1) p.progress-=1;
      const t = p.progress, mt = 1-t;
      const cx = mt*mt*p.sx + 2*mt*t*p.cpx + t*t*p.ex;
      const cy = mt*mt*p.sy + 2*mt*t*p.cpy + t*t*p.ey;
      p.el.setAttribute('cx', cx);
      p.el.setAttribute('cy', cy);
      const fade = t<0.08?t/0.08:t>0.92?(1-t)/0.08:1;
      p.el.setAttribute('opacity', fade);
    });
    this._animFrame = requestAnimationFrame(()=>this.animateParticles());
  }

  /* ── Selection ───────────────────────────────────────────────── */

  selectNode(id) {
    if (this.activeNodeId) { const p=this.nodeEls[this.activeNodeId]; if(p)p.classList.remove('pipeline-node--selected'); }
    const d = DETAIL[id]; if (!d) return;
    this.activeNodeId = id;
    const el = this.nodeEls[id]; if (el) { el.classList.add('pipeline-node--selected'); el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' }); }
    this.highlightConnections(id);
    this.detailTitle.textContent = d.title;
    if (this.detailSubtitleEl) this.detailSubtitleEl.textContent = d.subtitle||'';
    if (this.detailSparkMeta) this.detailSparkMeta.textContent = d.sparkMeta||'';
    this.detailContent.innerHTML = d.html;
    this.detailPanel.classList.add('detail-panel--open');
  }

  highlightConnections(id) {
    this.svgLayer.querySelectorAll('.pipeline-connection').forEach(g => {
      g.classList.toggle('pipeline-connection--active', id && (g.dataset.from===id || g.dataset.to===id));
    });
  }

  closePanel() {
    this.detailPanel.classList.remove('detail-panel--open');
    if (this.activeNodeId) { const e=this.nodeEls[this.activeNodeId]; if(e)e.classList.remove('pipeline-node--selected'); this.activeNodeId=null; this.highlightConnections(null); }
  }

  /* ── Run ─────────────────────────────────────────────────────── */

  runPipeline() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.runBtn) { this.runBtn.textContent='⏸ Running...'; this.runBtn.classList.add('toolbar-btn--active'); }
    if (this.statusIndicator) { this.statusIndicator.textContent='Running'; this.statusIndicator.className='status-badge status--running'; }
    if (this.clusterRuntime) this.clusterRuntime.textContent='Cluster: amit-resume-prod ● Acquiring executors...';

    // Spark submit output
    this.detailPanel.classList.add('detail-panel--open');
    this.detailTitle.textContent='Pipeline Run: amit_resume_dag';
    if (this.detailSubtitleEl) this.detailSubtitleEl.textContent='Run ID: run-'+Date.now();
    if (this.detailSparkMeta) this.detailSparkMeta.textContent='Cluster: amit-resume-prod · Runtime: 14.3 LTS · Photon: Enabled';
    this.detailContent.innerHTML='<div class="nb-cell"><div class="nb-cell__cmd">%sh</div><div class="nb-cell__code">spark-submit --class com.amit.resume.PipelineRunner --num-executors 8 --executor-cores 4 --executor-memory 8G s3://jobs/amit_resume_dag.jar</div></div><div class="nb-cell"><div class="nb-cell__output" id="run-output" style="font-size:0.65rem;line-height:1.7;max-height:240px;overflow-y:auto;"></div></div>';
    const out=document.getElementById('run-output');
    const stages=[{n:'bronze_ingestion_job',r:4,t:'0.8s',m:'2.1 GB'},{n:'bronze_emirates_nbd',r:1,t:'1.1s',m:'3.4 GB'},{n:'bronze_epam_cantire',r:1,t:'0.9s',m:'2.8 GB'},{n:'bronze_abb_iot',r:1,t:'1.3s',m:'4.2 GB'},{n:'bronze_infosys_pwc',r:1,t:'0.7s',m:'1.9 GB'},{n:'silver_validation_job',r:12,t:'0.6s',m:'1.5 GB'},{n:'silver_skills_catalog',r:26,t:'0.4s',m:'0.8 GB'},{n:'gold_aggregation_job',r:6,t:'0.5s',m:'1.1 GB'},{n:'gold_kpi_dashboard',r:6,t:'0.3s',m:'0.6 GB'},{n:'sink_export_contact',r:1,t:'0.2s',m:'0.4 GB'}];
    let i=0;
    const append=()=>{
      if(i>=stages.length){out.innerHTML+='<span style="color:#34D399">✓ All jobs succeeded</span><br><span style="color:#A0A0AB">─────────────────</span><br><span style="color:#FBBF24">Total DBU: 0.42 · Rows: 59 · Duration: 6.8s</span><br><span style="color:#34D399">Status: SUCCESS ✓</span>';out.scrollTop=out.scrollHeight;setTimeout(()=>this.celebrateFinish(),800);return;}
      const s=stages[i]; out.innerHTML+=`<span style="color:#60A5FA">[${i+1}/${stages.length}]</span> ${s.n} — ${s.r} rows · ${s.t} · ${s.m}<br>`;out.scrollTop=out.scrollHeight;
      // Update node statuses
      if(i===0) this.setStatus('source','running');
      if(i>=1&&i<=4) this.setStatus(['emirates','epam','abb','infosys'][i-1],'running');
      if(i===5) ['emirates','epam','abb','infosys'].forEach(id=>this.setStatus(id,'success'));
      if(i===6) this.setStatus('skills','running');
      if(i===7) {this.setStatus('skills','success');this.setStatus('certs','running');}
      if(i===8) {this.setStatus('certs','success');this.setStatus('edu','success');}
      if(i===9) {['skills','certs','edu'].forEach(id=>this.setStatus(id,'success'));this.setStatus('sink','running');}
      i++; setTimeout(append,350+Math.random()*200);
    };
    this.setStatus('source','running');
    if(this.clusterRuntime) this.clusterRuntime.textContent='Cluster: amit-resume-prod ● Running (8 executors)';
    setTimeout(append,300);
  }

  setStatus(id,status) {
    const el=this.nodeEls[id]; if(!el)return;
    let b=el.querySelector('.pipeline-node__status');
    if(!b){b=document.createElement('span');b.classList.add('pipeline-node__status');el.appendChild(b);}
    b.className=`pipeline-node__status status--${status}`;
  }

  celebrateFinish() {
    Object.values(this.nodeEls).forEach(el=>el.classList.add('pipeline-node--celebrate'));
    setTimeout(()=>Object.values(this.nodeEls).forEach(el=>el.classList.remove('pipeline-node--celebrate')),1200);
    this.isRunning=false;
    if(this.runBtn){this.runBtn.textContent='▶ Run Pipeline';this.runBtn.classList.remove('toolbar-btn--active');}
    if(this.statusIndicator){this.statusIndicator.textContent='Succeeded';this.statusIndicator.className='status-badge status--success';}
    if(this.clusterRuntime) this.clusterRuntime.textContent='Cluster: amit-resume-prod ● Idle · Last run: '+new Date().toLocaleTimeString();
    this.nodes().forEach(id=>this.setStatus(id,'success'));
  }

  nodes() { return ['source','sink','emirates','epam','abb','infosys','skills','certs','edu','project','kpi']; }

  /* ── Init ────────────────────────────────────────────────────── */

  init() {
    this.buildHTML();
    this.drawArrows();
    if(this.runBtn) this.runBtn.addEventListener('click',()=>this.runPipeline());
    document.getElementById('btn-close-panel').addEventListener('click',()=>this.closePanel());
    this.canvas.addEventListener('click',(e)=>{if(e.target===this.canvas)this.closePanel();});
    document.addEventListener('keydown',(e)=>{if(e.key==='Escape')this.closePanel();});
    // Sidebar clicks
    document.querySelectorAll('.sidebar__item').forEach(item => {
      item.addEventListener('click', () => {
        const nodeId = item.dataset.node;
        if (nodeId) this.selectNode(nodeId);
      });
    });

    // Redraw SVG on resize/scroll
    new ResizeObserver(()=>this.drawArrows()).observe(this.canvas);
    window.addEventListener('resize',()=>this.drawArrows());
    this.canvas.addEventListener('scroll',()=>this.drawArrows());
  }
}

document.addEventListener('DOMContentLoaded',()=>{window.pipeline=new PipelineEngine();});
