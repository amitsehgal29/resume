/* ==========================================================================
   Pipeline Engine v3 — ADF Nodes + Layer Boundaries
   ========================================================================== */

class PipelineEngine {
  constructor() {
    this.canvas = document.getElementById('pipeline-canvas');
    this.canvasInner = this.canvas.querySelector('.pipeline-canvas__inner');
    this.svgLayer = document.getElementById('pipeline-svg');
    this.detailPanel = document.getElementById('detail-panel');
    this.detailContent = document.getElementById('detail-content');
    this.detailTitle = document.getElementById('detail-title');
    this.detailSubtitleEl = document.getElementById('detail-subtitle');
    this.detailSparkMeta = document.getElementById('detail-spark-meta');
    this.runBtn = document.getElementById('btn-run');
    this.statusIndicator = document.getElementById('pipeline-status');
    this.clusterRuntime = document.getElementById('cluster-runtime');
    this.nodeCount = document.getElementById('node-count');
    this.connectionCount = document.getElementById('connection-count');

    this.nodes = [];
    this.nodeEls = {};
    this.connections = [];
    this.particles = [];
    this.activeNodeId = null;
    this.isRunning = false;
    this.layerBoxes = [];

    this.init();
  }

  /* ── Pipeline Data ──────────────────────────────────────────── */

  buildPipeline() {
    const nodeDefs = [
      // ═══════════ SOURCE ═══════════
      {
        id: 'source', label: 'Raw Profile Data', type: 'source', shortLabel: 'SOURCE',
        x: 50, y: 300, w: 150, h: 44,
        icon: '📥', layer: 'source', sparkJob: 'ingest_profile_data',
        connectsTo: ['bronze-layer'],
        detail: {
          title: 'Amit Sehgal',
          subtitle: 'Senior Data Engineer · Dubai, UAE',
          sparkMeta: 'Job: ingest_profile_data · Status: Succeeded · Duration: 0.8s',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">📍 Dubai, UAE</span>
                <span class="detail-badge primary">📧 reachamitsehgal29@gmail.com</span>
                <span class="detail-badge">📞 +971-506889952</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%spark</div>
                <div class="nb-cell__code">df_profile = spark.read.format("json").load("s3://data-lake/bronze/profile/*.json")<br>df_profile.printSchema()</div>
                <div class="nb-cell__output">root<br> |-- name: string — Amit Sehgal<br> |-- title: string — Senior Data Engineer<br> |-- experience_years: int — 9<br> |-- location: string — Dubai, UAE</div>
              </div>
              <p class="detail-text">Innovative Senior Data Engineer with <strong>9 years</strong> experience architecting high-performance data platforms across <strong>Azure and on-premises ecosystems</strong> for top-tier financial institutions. Proven track record integrating GenAI tools (Claude Code) to accelerate zero-defect delivery.</p>
              <div class="detail-links">
                <a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a>
                <a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download Resume</a>
              </div>
            </div>`
        }
      },

      // ═══════════ BRONZE LAYER ═══════════
      {
        id: 'bronze-layer', label: 'Bronze — Raw Ingestion', type: 'layer', shortLabel: 'BRONZE LAYER',
        x: 280, y: 70, w: 260, h: 36,
        icon: '🟤', layer: 'bronze', sparkJob: 'bronze_ingestion_job',
        status: 'pending',
        connectsTo: ['silver-layer', 'emirates', 'epam', 'abb', 'infosys'],
        detail: {
          title: 'Bronze Layer — Raw Data Lake',
          subtitle: 'Delta Table: delta_bronze.career_experience',
          sparkMeta: 'Job: bronze_ingestion_job · Rows: 4 · Duration: 2.1s',
          content: `
            <div class="detail-block">
              <div class="nb-cell">
                <div class="nb-cell__cmd">%sql</div>
                <div class="nb-cell__code">DESCRIBE HISTORY delta_bronze.career_experience</div>
                <div class="nb-cell__output">4 versions · 4 companies · 9 years · Banking, Retail, IoT, Consulting</div>
              </div>
              <p class="detail-text">Raw experience data ingested from <strong>4 enterprise organizations</strong>. Each record represents a role where business requirements were transformed into operational data pipelines at scale.</p>
            </div>`
        }
      },
      {
        id: 'emirates', label: 'Emirates NBD', type: 'activity', shortLabel: 'DE Consultant',
        x: 250, y: 150, w: 155, h: 48,
        icon: '🏦', layer: 'bronze', sparkJob: 'bronze_emirates_nbd',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Data Engineer Consultant',
          subtitle: 'Emirates NBD · via ValueLabs · Jan 2025 – Present',
          sparkMeta: 'Cluster: prod-de-jobs · Runtime: 14.3 LTS · Photon: Enabled',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">PySpark</span><span class="detail-badge primary">Kafka</span>
                <span class="detail-badge primary">Airflow</span><span class="detail-badge">Oozie</span>
                <span class="detail-badge">Oracle</span><span class="detail-badge">SAP HANA</span>
                <span class="detail-badge success">Claude Code</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%spark</div>
                <div class="nb-cell__code"><span class="nb-comment">// Wholesale Banking ETL — PySpark + Kafka</span><br>spark.conf.set("spark.sql.adaptive.enabled", "true")<br>spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", "true")<br>spark.conf.set("spark.sql.adaptive.coalescingPartitions.enabled", "true")</div>
              </div>
              <ul class="detail-list">
                <li>Engineered E2E Wholesale Banking pipeline — <strong>PySpark + Kafka + ODS</strong></li>
                <li>Spearheaded <strong>SAP HANA → PySpark</strong> migration for 5 banking entities, eliminating license costs</li>
                <li>Automated <strong>~180 daily jobs</strong> via YAML-driven parameterized PySpark framework</li>
                <li>Managed complex finance ETL loads with <strong>Airflow, Oozie, and Claude Code</strong></li>
              </ul>
            </div>`
        }
      },
      {
        id: 'epam', label: 'EPAM Systems', type: 'activity', shortLabel: 'Sr Data Engineer',
        x: 250, y: 230, w: 155, h: 48,
        icon: '🏢', layer: 'bronze', sparkJob: 'bronze_epam_cantire',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Senior Data Engineer',
          subtitle: 'EPAM Systems · Client: Canadian Tire · Dec 2021 – Jan 2025',
          sparkMeta: 'Target: Azure Cosmos DB · Query gain: 40% · Daily throughput: 100 GB',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Cosmos DB</span>
                <span class="detail-badge">Hive</span><span class="detail-badge">Delta Lake</span><span class="detail-badge">JSON</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%sql</div>
                <div class="nb-cell__code"><span class="nb-comment">-- Migration: Hive → Delta → Cosmos DB</span><br>CREATE TABLE delta_silver.dealer_analytics<br>USING DELTA LOCATION 's3://datalake/silver/dealer_analytics'<br>AS SELECT * FROM hive_enterprise.dealer_data</div>
              </div>
              <ul class="detail-list">
                <li>Built Azure Data Factory pipelines processing <strong>100 GB daily</strong> for dealer analytics</li>
                <li>Architected <strong>Hive → Cosmos DB</strong> migration — <strong>40% faster queries</strong></li>
                <li>Designed optimized JSON schemas with cross-functional teams</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'abb', label: 'ABB Global', type: 'activity', shortLabel: 'R&D Engineer',
        x: 250, y: 310, w: 155, h: 48,
        icon: '⚡', layer: 'bronze', sparkJob: 'bronze_abb_iot',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'R&D Engineer',
          subtitle: 'ABB Global Limited · Feb 2020 – Dec 2021',
          sparkMeta: 'Streaming: ActiveMQ + Event Hub · Sink: Cosmos DB + MongoDB',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Azure IoT</span><span class="detail-badge primary">PySpark</span>
                <span class="detail-badge primary">ML Models</span><span class="detail-badge">ActiveMQ</span>
                <span class="detail-badge">Event Hub</span><span class="detail-badge">Cosmos DB</span>
                <span class="detail-badge">MongoDB</span><span class="detail-badge success">Python APIs</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%spark</div>
                <div class="nb-cell__code"><span class="nb-comment">// Real-time IoT stream → Delta</span><br>df_stream = spark.readStream.format("eventhubs").options(**ehConf).load()<br>df_stream.writeStream.format("delta") \\<br>  .option("checkpointLocation", "s3://datalake/checkpoints/iot/") \\<br>  .table("delta_bronze.iot_telemetry")</div>
              </div>
              <ul class="detail-list">
                <li>Built <strong>real-time IoT pipeline</strong> across Azure cloud + on-prem (ActiveMQ, Event Hub)</li>
                <li>Deployed <strong>ML models on unstructured data</strong> (text, images, video) → Cosmos DB + MongoDB</li>
                <li>Automated PySpark batch jobs via Rundeck, Azure Pipelines, and ADF</li>
                <li>Built Python CRUD APIs — <strong>saved 15 hrs/week</strong></li>
              </ul>
            </div>`
        }
      },
      {
        id: 'infosys', label: 'Infosys', type: 'activity', shortLabel: 'Data Engineer',
        x: 250, y: 390, w: 155, h: 48,
        icon: '💻', layer: 'bronze', sparkJob: 'bronze_infosys_pwc',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Data Engineer',
          subtitle: 'Infosys · Clients: PwC, Exelon · Mar 2017 – Feb 2020',
          sparkMeta: 'Format: Parquet on HDFS · Schedule: Cron · Testing: Selenium',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">PySpark</span><span class="detail-badge primary">HDFS</span>
                <span class="detail-badge">Parquet</span><span class="detail-badge">Python</span>
                <span class="detail-badge">Selenium</span><span class="detail-badge">Oracle</span>
                <span class="detail-badge">MongoDB</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%spark</div>
                <div class="nb-cell__code"><span class="nb-comment">// Multi-format ingestion → Parquet on HDFS</span><br>df = spark.read.format("csv").option("header","true").load(csv_path)<br>  .unionByName(spark.read.json(json_path))<br>  .unionByName(spark.read.format("jdbc").option("url",mysql_url).load())<br>df.write.format("parquet").mode("overwrite").partitionBy("dt").save("hdfs://datalake/curated/")</div>
              </div>
              <ul class="detail-list">
                <li>PySpark ETL workflows migrating <strong>CSV, JSON, MySQL → HDFS Parquet</strong></li>
                <li>Query transformations on HDFS → curated layer, scheduled via <strong>Cron</strong></li>
                <li>Automated API testing with <strong>Python + Selenium</strong> (Oracle DB → MongoDB)</li>
                <li>Data warehouse schema design + bug resolution via <strong>VSTS DevOps</strong></li>
              </ul>
            </div>`
        }
      },

      // ═══════════ SILVER LAYER ═══════════
      {
        id: 'silver-layer', label: 'Silver — Validated & Clean', type: 'layer', shortLabel: 'SILVER LAYER',
        x: 580, y: 70, w: 240, h: 36,
        icon: '⚪', layer: 'silver', sparkJob: 'silver_validation_job',
        status: 'pending',
        connectsTo: ['gold-layer', 'skills-node', 'certs-node', 'edu-node'],
        detail: {
          title: 'Silver Layer — Validated & Cleaned',
          subtitle: 'Delta Table: delta_silver.validated_skills',
          sparkMeta: 'Job: silver_validation_job · Quality checks: 12/12 passed · Duration: 1.4s',
          content: `
            <div class="detail-block">
              <div class="nb-cell">
                <div class="nb-cell__cmd">%sql</div>
                <div class="nb-cell__code">SELECT skill_category, COUNT(*) as tech_count<br>FROM delta_silver.validated_skills<br>GROUP BY skill_category ORDER BY tech_count DESC</div>
                <div class="nb-cell__output">Core Engineering: 7 | Cloud & Big Data: 9 | Modern Stack: 4 | Advanced Pipelines: 6</div>
              </div>
              <p class="detail-text">Technical capabilities validated across enterprise deployments — each skill verified through production implementation at scale.</p>
            </div>`
        }
      },
      {
        id: 'skills-node', label: 'Technical Skills', type: 'activity', shortLabel: '26 Technologies',
        x: 560, y: 150, w: 155, h: 48,
        icon: '🔧', layer: 'silver', sparkJob: 'silver_skills_catalog',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Technical Skills',
          subtitle: 'Unity Catalog: main.eng_skills — 26 verified technologies',
          sparkMeta: 'Catalog: main.eng_skills · Schema: validated · Tables: 4',
          content: `
            <div class="detail-block">
              <div class="detail-section"><h4 class="detail-section-title">Core Engineering</h4><div class="detail-meta-row"><span class="detail-badge primary">Python</span><span class="detail-badge primary">PySpark</span><span class="detail-badge">SQL</span><span class="detail-badge">NoSQL</span><span class="detail-badge">Data APIs</span><span class="detail-badge">Shell</span><span class="detail-badge">Kubernetes</span></div></div>
              <div class="detail-section"><h4 class="detail-section-title">Cloud & Big Data</h4><div class="detail-meta-row"><span class="detail-badge primary">ADF</span><span class="detail-badge primary">Databricks</span><span class="detail-badge">Delta Lake</span><span class="detail-badge">Unity Catalog</span><span class="detail-badge">Cosmos DB</span><span class="detail-badge">Hadoop</span><span class="detail-badge">Spark SQL</span><span class="detail-badge">Kafka</span><span class="detail-badge">Flink</span></div></div>
              <div class="detail-section"><h4 class="detail-section-title">Modern Stack</h4><div class="detail-meta-row"><span class="detail-badge primary">Snowflake</span><span class="detail-badge">dbt</span><span class="detail-badge primary">Airflow</span><span class="detail-badge">Oozie</span></div></div>
              <div class="detail-section"><h4 class="detail-section-title">Advanced</h4><div class="detail-meta-row"><span class="detail-badge primary">Streaming</span><span class="detail-badge">Kafka/Flink</span><span class="detail-badge primary">LLM/GenAI</span><span class="detail-badge">Claude Code</span><span class="detail-badge">Data Gov</span></div></div>
            </div>`
        }
      },
      {
        id: 'certs-node', label: 'Certifications', type: 'activity', shortLabel: '2 Azure Certs',
        x: 560, y: 230, w: 155, h: 48,
        icon: '📜', layer: 'silver', sparkJob: 'silver_certs_validate',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Microsoft Azure Certifications',
          subtitle: '2 Active Credentials · Verified',
          sparkMeta: 'Validation: Microsoft Learning · Status: Active',
          content: `
            <div class="detail-block">
              <div class="detail-cert"><span class="detail-cert-icon">☁️</span><div><strong>Azure Developer Associate</strong><br><span class="detail-text-sm">Microsoft Certified — Cloud application development and maintenance</span></div></div>
              <div class="detail-cert"><span class="detail-cert-icon">🔌</span><div><strong>Azure IoT Developer Specialty</strong><br><span class="detail-text-sm">Microsoft Certified — Cloud and edge IoT solutions</span></div></div>
            </div>`
        }
      },
      {
        id: 'edu-node', label: 'Education', type: 'activity', shortLabel: 'B.E. Mumbai Univ',
        x: 560, y: 310, w: 155, h: 48,
        icon: '🎓', layer: 'silver', sparkJob: 'silver_edu_validate',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Education',
          subtitle: 'Bachelor of Engineering · Mumbai University',
          sparkMeta: 'Duration: 2012 – 2016 · Field: Electronics & Telecom',
          content: `
            <div class="detail-block">
              <div class="detail-cert"><span class="detail-cert-icon">🎓</span><div><strong>B.E. Electronics & Telecom</strong><br><span class="detail-text-sm">Mumbai University · 2012 – 2016</span></div></div>
            </div>`
        }
      },

      // ═══════════ GOLD LAYER ═══════════
      {
        id: 'gold-layer', label: 'Gold — Business Value', type: 'layer', shortLabel: 'GOLD LAYER',
        x: 880, y: 70, w: 220, h: 36,
        icon: '🟡', layer: 'gold', sparkJob: 'gold_aggregation_job',
        status: 'pending',
        connectsTo: ['sink', 'project-node', 'kpi-node'],
        detail: {
          title: 'Gold Layer — Curated Business Value',
          subtitle: 'Delta Table: delta_gold.kpi_metrics — OPTIMIZE + VACUUM applied',
          sparkMeta: 'Job: gold_aggregation_job · Aggregations: 6 · Duration: 0.6s',
          content: `
            <div class="detail-block">
              <div class="nb-cell">
                <div class="nb-cell__cmd">%sql</div>
                <div class="nb-cell__code">OPTIMIZE delta_gold.kpi_metrics<br>VACUUM delta_gold.kpi_metrics RETAIN 168 HOURS<br><br>SELECT * FROM delta_gold.kpi_metrics</div>
              </div>
              <p class="detail-text">Aggregated business-value metrics curated for stakeholder consumption. Each KPI reflects measured impact from production deployments.</p>
            </div>`
        }
      },
      {
        id: 'project-node', label: 'Production Project', type: 'activity', shortLabel: 'Flask · 5K DAU',
        x: 860, y: 150, w: 160, h: 48,
        icon: '🚀', layer: 'gold', sparkJob: 'gold_project_vasai',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Vasai Corona Resources',
          subtitle: 'Flask · High Availability · 5,000 Daily Users',
          sparkMeta: 'Deployment: Flask on Production · Uptime: 99.9% · Peak: 5K DAU',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Python</span><span class="detail-badge primary">Flask</span>
                <span class="detail-badge">REST APIs</span><span class="detail-badge success">HA Design</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%python</div>
                <div class="nb-cell__code"><span class="nb-comment"># Flask app — 5,000 DAU at sub-50ms</span><br>from flask import Flask, jsonify<br>app = Flask(__name__)<br><br>@app.route('/api/resources')<br>def get_resources():<br>    return jsonify(cached_query("SELECT * FROM resources"))</div>
              </div>
              <ul class="detail-list">
                <li>Engineered <strong>Flask web app</strong> for COVID-19 resources in Vasai-Virar region</li>
                <li>Backend handling <strong>5,000+ daily users</strong> with zero-downtime architecture</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'kpi-node', label: 'Performance KPIs', type: 'activity', shortLabel: '6 Key Metrics',
        x: 860, y: 240, w: 160, h: 48,
        icon: '📊', layer: 'gold', sparkJob: 'gold_kpi_dashboard',
        status: 'pending', connectsTo: [],
        detail: {
          title: 'Pipeline Performance Metrics',
          subtitle: '9 Years · 6 Key Indicators',
          sparkMeta: 'Refresh: Real-time · Source: delta_gold.kpi_metrics',
          content: `
            <div class="detail-block">
              <div class="kpi-grid">
                <div class="kpi-card"><span class="kpi-value">9+</span><span class="kpi-label">Years Experience</span></div>
                <div class="kpi-card"><span class="kpi-value">180/day</span><span class="kpi-label">Automated Jobs</span></div>
                <div class="kpi-card"><span class="kpi-value">100 GB</span><span class="kpi-label">Daily Throughput</span></div>
                <div class="kpi-card"><span class="kpi-value">40%</span><span class="kpi-label">Query Gain</span></div>
                <div class="kpi-card"><span class="kpi-value">15 hrs</span><span class="kpi-label">Saved/Week</span></div>
                <div class="kpi-card"><span class="kpi-value">5,000</span><span class="kpi-label">Peak DAU</span></div>
              </div>
            </div>`
        }
      },

      // ═══════════ SINK ═══════════
      {
        id: 'sink', label: 'Export / Contact', type: 'sink', shortLabel: 'SINK',
        x: 1160, y: 300, w: 120, h: 44,
        icon: '📤', layer: 'sink', sparkJob: 'sink_export_contact',
        connectsTo: [],
        detail: {
          title: 'Let\'s Build Together',
          subtitle: 'Dubai, UAE · Open to Senior DE Roles',
          sparkMeta: 'Format: PDF / LinkedIn / Email · Always Available',
          content: `
            <div class="detail-block">
              <div class="detail-links">
                <a href="mailto:reachamitsehgal29@gmail.com" class="detail-link primary">✉️ Send Email</a>
                <a href="tel:+971506889952" class="detail-link">📞 Call</a>
                <a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a>
                <a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download PDF</a>
              </div>
            </div>`
        }
      }
    ];

    this.nodes = nodeDefs;
    this.connections = [];
    nodeDefs.forEach(node => {
      (node.connectsTo || []).forEach(targetId => {
        this.connections.push({ from: node.id, to: targetId });
      });
    });

    // Layer bounding boxes
    this.layerBoxes = [
      { id: 'bronze-box', label: 'BRONZE — Raw Data Lake', x: 220, y: 115, w: 210, h: 350, layer: 'bronze' },
      { id: 'silver-box', label: 'SILVER — Validated & Clean', x: 540, y: 115, w: 200, h: 270, layer: 'silver' },
      { id: 'gold-box', label: 'GOLD — Curated Insights', x: 840, y: 115, w: 205, h: 220, layer: 'gold' },
    ];

    if (this.nodeCount) this.nodeCount.textContent = this.nodes.length;
    if (this.connectionCount) this.connectionCount.textContent = this.connections.length;
  }

  /* ── Rendering ───────────────────────────────────────────────── */

  render() {
    this.buildPipeline();
    this.renderLayerBoxes();
    this.renderNodes();
    this.renderConnections();
    this.initParticles();
    this.initSidebar();
  }

  renderLayerBoxes() {
    this.layerBoxes.forEach(box => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', box.x);
      rect.setAttribute('y', box.y);
      rect.setAttribute('width', box.w);
      rect.setAttribute('height', box.h);
      rect.setAttribute('rx', '8');
      rect.setAttribute('fill', box.layer === 'bronze' ? 'rgba(184,115,51,0.04)' :
                                      box.layer === 'silver' ? 'rgba(160,160,171,0.04)' :
                                      'rgba(251,191,36,0.05)');
      rect.setAttribute('stroke', box.layer === 'bronze' ? 'rgba(184,115,51,0.25)' :
                                       box.layer === 'silver' ? 'rgba(160,160,171,0.3)' :
                                       'rgba(251,191,36,0.3)');
      rect.setAttribute('stroke-width', '1.5');
      rect.setAttribute('stroke-dasharray', '8 4');
      rect.classList.add('layer-box');
      rect.dataset.layer = box.layer;
      this.svgLayer.appendChild(rect);

      // Label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', box.x + 12);
      text.setAttribute('y', box.y - 8);
      text.setAttribute('fill', box.layer === 'bronze' ? '#B87333' :
                                      box.layer === 'silver' ? '#A0A0AB' :
                                      '#FBBF24');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.setAttribute('font-size', '10');
      text.setAttribute('font-weight', '600');
      text.setAttribute('letter-spacing', '0.06em');
      text.textContent = box.label;
      this.svgLayer.appendChild(text);
    });
  }

  renderNodes() {
    this.nodes.forEach(nodeDef => {
      const el = document.createElement('div');
      el.className = `pipeline-node pipeline-node--${nodeDef.type} pipeline-node--${nodeDef.layer}`;
      el.id = `node-${nodeDef.id}`;
      el.style.left = nodeDef.x + 'px';
      el.style.top = nodeDef.y + 'px';
      el.style.width = (nodeDef.w || 140) + 'px';
      el.style.height = (nodeDef.h || 44) + 'px';
      el.dataset.nodeId = nodeDef.id;
      el.dataset.layer = nodeDef.layer || '';

      el.innerHTML = `
        <span class="pipeline-node__icon">${nodeDef.icon}</span>
        <span class="pipeline-node__text">
          <span class="pipeline-node__label">${nodeDef.label}</span>
          ${nodeDef.shortLabel && nodeDef.type !== 'layer' ? `<span class="pipeline-node__sublabel">${nodeDef.shortLabel}</span>` : ''}
        </span>
        ${nodeDef.status !== undefined ? `<span class="pipeline-node__status status--${nodeDef.status}"></span>` : ''}
        ${nodeDef.type === 'layer' ? `<span class="pipeline-node__delta">Δ</span>` : ''}
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectNode(nodeDef.id);
      });

      this.canvasInner.appendChild(el);
      this.nodeEls[nodeDef.id] = el;
    });
  }

  renderConnections() {
    this.connections.forEach(conn => {
      const fromEl = this.nodeEls[conn.from];
      const toEl = this.nodeEls[conn.to];
      if (!fromEl || !toEl) return;

      const canvasRect = this.canvas.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
      const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
      const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('pipeline-connection');
      g.dataset.from = conn.from;
      g.dataset.to = conn.to;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.classList.add('pipeline-edge');
      g.appendChild(line);

      const angle = Math.atan2(y2 - y1, x2 - x1);
      const asz = 7;
      const ax = x2 - asz * Math.cos(angle);
      const ay = y2 - asz * Math.sin(angle);
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arrow.setAttribute('points', `${x2},${y2} ${ax - 3.5 * Math.sin(angle)},${ay + 3.5 * Math.cos(angle)} ${ax + 3.5 * Math.sin(angle)},${ay - 3.5 * Math.cos(angle)}`);
      arrow.classList.add('pipeline-arrow');
      g.appendChild(arrow);

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3.5'); dot.setAttribute('cx', x1); dot.setAttribute('cy', y1);
      dot.classList.add('pipeline-particle');
      g.appendChild(dot);

      this.svgLayer.appendChild(g);
    });
  }

  initParticles() {
    this.particles = [];
    this.svgLayer.querySelectorAll('.pipeline-particle').forEach((dot) => {
      const line = dot.parentElement.querySelector('.pipeline-edge');
      if (!line) return;
      this.particles.push({
        el: dot, line: line,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      });
    });
    this.animateParticles();
  }

  animateParticles() {
    this.particles.forEach(p => {
      p.progress += p.speed * (this.isRunning ? 4 : 1);
      if (p.progress > 1) p.progress -= 1;
      const x1 = parseFloat(p.line.getAttribute('x1')), y1 = parseFloat(p.line.getAttribute('y1'));
      const x2 = parseFloat(p.line.getAttribute('x2')), y2 = parseFloat(p.line.getAttribute('y2'));
      p.el.setAttribute('cx', x1 + (x2 - x1) * p.progress);
      p.el.setAttribute('cy', y1 + (y2 - y1) * p.progress);
      const fade = p.progress < 0.08 ? p.progress / 0.08 : p.progress > 0.92 ? (1 - p.progress) / 0.08 : 1;
      p.el.setAttribute('opacity', fade);
    });
    requestAnimationFrame(() => this.animateParticles());
  }

  /* ── Sidebar ─────────────────────────────────────────────────── */

  initSidebar() {
    document.querySelectorAll('.sidebar__item').forEach(item => {
      item.addEventListener('click', () => {
        const nodeId = item.dataset.targetNode;
        if (nodeId) this.selectNode(nodeId);
      });
    });
  }

  /* ── Selection ───────────────────────────────────────────────── */

  selectNode(nodeId) {
    if (this.activeNodeId) {
      const prevEl = this.nodeEls[this.activeNodeId];
      if (prevEl) prevEl.classList.remove('pipeline-node--selected');
      this.highlightConnections(null);
    }

    const nodeDef = this.nodes.find(n => n.id === nodeId);
    if (!nodeDef || !nodeDef.detail) return;

    this.activeNodeId = nodeId;
    const el = this.nodeEls[nodeId];
    if (el) el.classList.add('pipeline-node--selected');
    this.highlightConnections(nodeId);
    this.highlightLayerBox(nodeDef.layer);

    this.detailTitle.textContent = nodeDef.detail.title;
    if (this.detailSubtitleEl) this.detailSubtitleEl.textContent = nodeDef.detail.subtitle || '';
    if (this.detailSparkMeta) this.detailSparkMeta.textContent = nodeDef.detail.sparkMeta || '';
    this.detailContent.innerHTML = nodeDef.detail.content;
    this.detailPanel.classList.add('detail-panel--open');
  }

  highlightConnections(nodeId) {
    this.svgLayer.querySelectorAll('.pipeline-connection').forEach(g => {
      g.classList.toggle('pipeline-connection--active',
        nodeId && (g.dataset.from === nodeId || g.dataset.to === nodeId));
    });
  }

  highlightLayerBox(layer) {
    this.svgLayer.querySelectorAll('.layer-box').forEach(rect => {
      rect.classList.toggle('layer-box--active', rect.dataset.layer === layer);
    });
  }

  closePanel() {
    this.detailPanel.classList.remove('detail-panel--open');
    if (this.activeNodeId) {
      const el = this.nodeEls[this.activeNodeId];
      if (el) el.classList.remove('pipeline-node--selected');
      this.activeNodeId = null;
      this.highlightConnections(null);
      this.svgLayer.querySelectorAll('.layer-box').forEach(r => r.classList.remove('layer-box--active'));
    }
  }

  /* ── Run Pipeline ────────────────────────────────────────────── */

  runPipeline() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.runBtn) { this.runBtn.textContent = '⏸ Running...'; this.runBtn.classList.add('toolbar-btn--active'); }
    if (this.statusIndicator) { this.statusIndicator.textContent = 'Running'; this.statusIndicator.className = 'status-badge status--running'; }
    if (this.clusterRuntime) this.clusterRuntime.textContent = 'Cluster: amit-resume-prod ● Running';

    const layerOrder = ['source', 'bronze', 'silver', 'gold', 'sink'];
    layerOrder.forEach((layer, i) => {
      setTimeout(() => {
        this.nodes.filter(n => n.layer === layer || n.id === layer).forEach(n => { n.status = 'running'; this.updateNodeStatus(n.id, 'running'); });
      }, i * 600);
      setTimeout(() => {
        this.nodes.filter(n => n.layer === layer || n.id === layer).forEach(n => { n.status = 'success'; this.updateNodeStatus(n.id, 'success'); });
      }, i * 600 + 400);
    });

    setTimeout(() => {
      this.isRunning = false;
      if (this.runBtn) { this.runBtn.textContent = '▶ Run Pipeline'; this.runBtn.classList.remove('toolbar-btn--active'); }
      if (this.statusIndicator) { this.statusIndicator.textContent = 'Succeeded'; this.statusIndicator.className = 'status-badge status--success'; }
      if (this.clusterRuntime) this.clusterRuntime.textContent = 'Cluster: amit-resume-prod ● Idle';
    }, layerOrder.length * 600 + 200);
  }

  updateNodeStatus(nodeId, status) {
    const el = this.nodeEls[nodeId];
    if (!el) return;
    const badge = el.querySelector('.pipeline-node__status');
    if (badge) badge.className = `pipeline-node__status status--${status}`;
  }

  /* ── Init ────────────────────────────────────────────────────── */

  init() {
    this.render();
    if (this.runBtn) this.runBtn.addEventListener('click', () => this.runPipeline());
    document.getElementById('btn-close-panel').addEventListener('click', () => this.closePanel());
    this.canvas.addEventListener('click', (e) => {
      if (e.target === this.canvas || e.target === this.canvasInner) this.closePanel();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closePanel(); });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.svgLayer.innerHTML = '';
        this.renderLayerBoxes();
        this.renderConnections();
        this.initParticles();
      }, 200);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => { window.pipeline = new PipelineEngine(); });
