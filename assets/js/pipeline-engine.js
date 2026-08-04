/* ==========================================================================
   Pipeline Engine v2 — Databricks-Inspired Interactive Canvas
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
    this.frameId = null;

    // Spring physics for hover
    this.hoverSprings = {};
    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  /* ── Pipeline Data ──────────────────────────────────────────── */

  buildPipeline() {
    const nodeDefs = [
      // ═══════════ SOURCE ═══════════
      {
        id: 'source', label: 'Raw Profile\nData', type: 'source',
        x: 50, y: 310,
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
              <p class="detail-text">Innovative Senior Data Engineer with <strong>9 years</strong> experience architecting high-performance data platforms across <strong>Azure and on-premises ecosystems</strong>. Specializes in transforming multi-source data into automated, parameterized ETL pipelines using PySpark, Kafka, and Airflow.</p>
              <div class="detail-links">
                <a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a>
                <a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download Resume</a>
              </div>
            </div>`
        }
      },

      // ═══════════ BRONZE LAYER ═══════════
      {
        id: 'bronze-layer', label: 'Bronze\nIngestion', type: 'layer',
        x: 290, y: 80, layer: 'bronze',
        icon: '🟤', sparkJob: 'bronze_ingestion_job',
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
              <p class="detail-text">Raw experience data ingested from <strong>4 enterprise organizations</strong> across diverse domains. Each record represents a role where raw business requirements were transformed into operational data pipelines at scale.</p>
            </div>`
        }
      },
      {
        id: 'emirates', label: 'Emirates\nNBD', type: 'activity',
        x: 170, y: 270, layer: 'bronze',
        icon: '🏦', sparkJob: 'bronze_emirates_nbd',
        status: 'pending',
        connectsTo: [],
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
                <div class="nb-cell__code"><span class="nb-comment">// Spark config for Wholesale Banking pipeline</span><br>spark.conf.set("spark.sql.adaptive.enabled", "true")<br>spark.conf.set("spark.sql.adaptive.coalescingPartitions.enabled", "true")<br>spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", "true")</div>
              </div>
              <ul class="detail-list">
                <li>Engineered E2E data pipeline for Wholesale Banking customer deals — <strong>PySpark + Kafka + ODS</strong></li>
                <li>Spearheaded <strong>SAP HANA decommissioning</strong>, migrating BDM workflows to PySpark for <strong>5 banking entities</strong> — eliminated SAP license costs</li>
                <li>Automated <strong>~180 daily jobs</strong> loading to Oracle with zero-defect YAML-driven PySpark framework</li>
                <li>Managed complex ETL loads aggregating finance sources via <strong>Airflow, Oozie, and GenAI</strong></li>
              </ul>
            </div>`
        }
      },
      {
        id: 'epam', label: 'EPAM\nSystems', type: 'activity',
        x: 350, y: 270, layer: 'bronze',
        icon: '🏢', sparkJob: 'bronze_epam_cantire',
        status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Senior Data Engineer',
          subtitle: 'EPAM Systems · Client: Canadian Tire · Dec 2021 – Jan 2025',
          sparkMeta: 'Target: Azure Cosmos DB · Query gain: 40% · Daily data: 100 GB',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Cosmos DB</span>
                <span class="detail-badge">Hive</span><span class="detail-badge">Delta Lake</span><span class="detail-badge">JSON</span>
              </div>
              <div class="nb-cell">
                <div class="nb-cell__cmd">%sql</div>
                <div class="nb-cell__code"><span class="nb-comment">-- Migration: Hive → Cosmos DB</span><br>CREATE TABLE delta_silver.dealer_analytics<br>USING DELTA<br>LOCATION 's3://data-lake/silver/dealer_analytics'<br>AS SELECT * FROM hive_enterprise.dealer_data<br>WHERE partition_date >= '2021-01-01'</div>
              </div>
              <ul class="detail-list">
                <li>Built feature-based pipelines with <strong>Azure Data Factory</strong> processing <strong>100 GB daily</strong></li>
                <li>Architected <strong>Hive → Cosmos DB</strong> migration — <strong>40% faster queries</strong></li>
                <li>Designed optimized <strong>JSON schemas</strong> for Cosmos DB with BA and backend teams</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'abb', label: 'ABB\nGlobal', type: 'activity',
        x: 170, y: 400, layer: 'bronze',
        icon: '⚡', sparkJob: 'bronze_abb_iot',
        status: 'pending',
        connectsTo: [],
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
                <div class="nb-cell__code"><span class="nb-comment">// Real-time IoT stream processing</span><br>df_stream = spark.readStream \\<br>  .format("eventhubs") \\<br>  .options(**ehConf) \\<br>  .load()<br><br>df_stream.writeStream \\<br>  .format("delta") \\<br>  .outputMode("append") \\<br>  .option("checkpointLocation", "s3://datalake/checkpoints/iot/") \\<br>  .table("delta_bronze.iot_telemetry")</div>
              </div>
              <ul class="detail-list">
                <li>Built <strong>real-time pipeline</strong> across Azure cloud and on-premises for IoT telemetry</li>
                <li>Deployed <strong>ML models on unstructured data</strong> (text, images, video) to Cosmos DB + MongoDB</li>
                <li>Automated PySpark batch jobs with Rundeck, Azure Pipelines, and ADF</li>
                <li>Built Python CRUD APIs — <strong>saved 15 hrs/week</strong> of manual effort</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'infosys', label: 'Infosys', type: 'activity',
        x: 350, y: 400, layer: 'bronze',
        icon: '💻', sparkJob: 'bronze_infosys_pwc',
        status: 'pending',
        connectsTo: [],
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
                <div class="nb-cell__code"><span class="nb-comment">// ETL: multi-format ingestion to Parquet</span><br>df = spark.read \\<br>  .format("csv").option("header","true").load(path_csv)<br>  .unionByName(spark.read.json(path_json))<br>  .unionByName(spark.read.format("jdbc").option("url",mysql_url)...)<br><br>df.write.format("parquet") \\<br>  .mode("overwrite") \\<br>  .partitionBy("date") \\<br>  .save("hdfs://datalake/curated/")</div>
              </div>
              <ul class="detail-list">
                <li>PySpark ETL workflows migrating <strong>CSV, JSON, MySQL → HDFS Parquet</strong></li>
                <li>Query transformations and table creation on HDFS → curated layer via <strong>Cron</strong></li>
                <li>Automated API testing with <strong>Python + Selenium</strong> for Oracle DB → MongoDB validations</li>
                <li>Data warehouse schema design and bug resolution via <strong>VSTS DevOps</strong></li>
              </ul>
            </div>`
        }
      },

      // ═══════════ SILVER LAYER ═══════════
      {
        id: 'silver-layer', label: 'Silver\nValidation', type: 'layer',
        x: 570, y: 80, layer: 'silver',
        icon: '⚪', sparkJob: 'silver_validation_job',
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
        id: 'skills-node', label: 'Technical\nSkills', type: 'activity',
        x: 500, y: 240, layer: 'silver',
        icon: '🔧', sparkJob: 'silver_skills_catalog',
        status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Technical Skills',
          subtitle: 'Unity Catalog: main.eng_skills — 26 verified technologies',
          sparkMeta: 'Catalog: main.eng_skills · Schema: validated · Tables: 4',
          content: `
            <div class="detail-block">
              <div class="detail-section"><h4 class="detail-section-title">Core Engineering</h4><div class="detail-meta-row"><span class="detail-badge primary">Python</span><span class="detail-badge primary">PySpark</span><span class="detail-badge">SQL</span><span class="detail-badge">NoSQL</span><span class="detail-badge">Data APIs</span><span class="detail-badge">Shell</span><span class="detail-badge">Kubernetes</span></div></div>
              <div class="detail-section"><h4 class="detail-section-title">Cloud & Big Data</h4><div class="detail-meta-row"><span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Databricks</span><span class="detail-badge">Delta Lake</span><span class="detail-badge">Unity Catalog</span><span class="detail-badge">Cosmos DB</span><span class="detail-badge">Hadoop</span><span class="detail-badge">Spark SQL</span><span class="detail-badge">Kafka</span><span class="detail-badge">Flink</span></div></div>
              <div class="detail-section"><h4 class="detail-section-title">Modern Data Stack</h4><div class="detail-meta-row"><span class="detail-badge primary">Snowflake</span><span class="detail-badge">dbt</span><span class="detail-badge primary">Apache Airflow</span><span class="detail-badge">Oozie</span></div></div>
              <div class="detail-section"><h4 class="detail-section-title">Advanced Pipelines</h4><div class="detail-meta-row"><span class="detail-badge primary">Streaming</span><span class="detail-badge">Kafka/Flink</span><span class="detail-badge primary">LLM/GenAI</span><span class="detail-badge">Claude Code</span><span class="detail-badge">Data Governance</span></div></div>
            </div>`
        }
      },
      {
        id: 'certs-node', label: 'Certifications', type: 'activity',
        x: 500, y: 370, layer: 'silver',
        icon: '📜', sparkJob: 'silver_certs_validate',
        status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Microsoft Azure Certifications',
          subtitle: '2 Active Credentials · Verified',
          sparkMeta: 'Validation: Microsoft Learning · Status: Active',
          content: `
            <div class="detail-block">
              <div class="detail-cert"><span class="detail-cert-icon">☁️</span><div><strong>Azure Developer Associate</strong><br><span class="detail-text-sm">Microsoft Certified — Designing, building, testing, and maintaining cloud applications</span></div></div>
              <div class="detail-cert"><span class="detail-cert-icon">🔌</span><div><strong>Azure IoT Developer Specialty</strong><br><span class="detail-text-sm">Microsoft Certified — Cloud and edge IoT solutions</span></div></div>
            </div>`
        }
      },
      {
        id: 'edu-node', label: 'Education', type: 'activity',
        x: 500, y: 480, layer: 'silver',
        icon: '🎓', sparkJob: 'silver_edu_validate',
        status: 'pending',
        connectsTo: [],
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
        id: 'gold-layer', label: 'Gold\nAggregation', type: 'layer',
        x: 850, y: 80, layer: 'gold',
        icon: '🟡', sparkJob: 'gold_aggregation_job',
        status: 'pending',
        connectsTo: ['sink', 'project-node', 'kpi-node'],
        detail: {
          title: 'Gold Layer — Business Value',
          subtitle: 'Delta Table: delta_gold.kpi_metrics — OPTIMIZE + VACUUM applied',
          sparkMeta: 'Job: gold_aggregation_job · Aggregations: 6 metrics · Duration: 0.6s',
          content: `
            <div class="detail-block">
              <div class="nb-cell">
                <div class="nb-cell__cmd">%sql</div>
                <div class="nb-cell__code">OPTIMIZE delta_gold.kpi_metrics<br>VACUUM delta_gold.kpi_metrics RETAIN 168 HOURS<br><br>SELECT metric_name, metric_value FROM delta_gold.kpi_metrics</div>
              </div>
              <p class="detail-text">Aggregated business-value metrics curated for stakeholder consumption. Each KPI reflects measured impact from production deployments.</p>
            </div>`
        }
      },
      {
        id: 'project-node', label: 'Production\nProject', type: 'activity',
        x: 790, y: 260, layer: 'gold',
        icon: '🚀', sparkJob: 'gold_project_vasai',
        status: 'pending',
        connectsTo: [],
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
                <div class="nb-cell__code"><span class="nb-comment"># Flask app handling 5,000 DAU</span><br>from flask import Flask, jsonify<br>app = Flask(__name__)<br><br>@app.route('/api/resources')<br>def get_resources():<br>    <span class="nb-comment"># Cached query — sub-50ms response</span><br>    return jsonify(cached_query("SELECT * FROM resources"))</div>
              </div>
              <ul class="detail-list">
                <li>Engineered <strong>Flask web application</strong> for COVID-19 resources in Vasai-Virar region</li>
                <li>Built backend handling <strong>5,000+ daily users</strong> with zero-downtime architecture</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'kpi-node', label: 'Performance\nMetrics', type: 'activity',
        x: 790, y: 400, layer: 'gold',
        icon: '📊', sparkJob: 'gold_kpi_dashboard',
        status: 'pending',
        connectsTo: [],
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
        id: 'sink', label: 'Export\nContact', type: 'sink',
        x: 1100, y: 310,
        icon: '📤', layer: 'sink', sparkJob: 'sink_export_contact',
        connectsTo: [],
        detail: {
          title: 'Let\'s Build Together',
          subtitle: 'Dubai, UAE · Open to Senior DE Roles',
          sparkMeta: 'Format: PDF / LinkedIn / Email · Always Available',
          content: `
            <div class="detail-block">
              <div class="detail-links" style="margin-top:16px">
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

    if (this.nodeCount) this.nodeCount.textContent = this.nodes.length;
    if (this.connectionCount) this.connectionCount.textContent = this.connections.length;
  }

  /* ── Rendering ───────────────────────────────────────────────── */

  render() {
    this.buildPipeline();
    this.renderNodes();
    this.renderConnections();
    this.initParticles();
    this.initSidebar();
    this.startHoverLoop();
  }

  renderNodes() {
    this.nodes.forEach(nodeDef => {
      const el = document.createElement('div');
      el.className = `pipeline-node pipeline-node--${nodeDef.type}`;
      el.id = `node-${nodeDef.id}`;
      el.style.left = nodeDef.x + 'px';
      el.style.top = nodeDef.y + 'px';
      el.dataset.nodeId = nodeDef.id;
      el.dataset.layer = nodeDef.layer || '';

      el.innerHTML = `
        <span class="pipeline-node__icon">${nodeDef.icon}</span>
        <span class="pipeline-node__label">${nodeDef.label.replace(/\n/g, '<br>')}</span>
        ${nodeDef.status !== undefined ? `<span class="pipeline-node__status status--${nodeDef.status}"></span>` : ''}
        <span class="pipeline-node__job">${nodeDef.sparkJob || ''}</span>
        ${nodeDef.type === 'layer' ? `<span class="pipeline-node__delta">Δ</span>` : ''}
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectNode(nodeDef.id);
      });

      el.addEventListener('mousedown', () => {
        el.classList.add('pipeline-node--pressed');
      });

      el.addEventListener('mouseup', () => {
        el.classList.remove('pipeline-node--pressed');
      });

      el.addEventListener('mouseleave', () => {
        el.classList.remove('pipeline-node--pressed');
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
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.classList.add('pipeline-edge');
      g.appendChild(line);

      // Arrow
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const asz = 8;
      const ax = x2 - asz * Math.cos(angle);
      const ay = y2 - asz * Math.sin(angle);
      arrow.setAttribute('points',
        `${x2},${y2} ${ax - 4 * Math.sin(angle)},${ay + 4 * Math.cos(angle)} ${ax + 4 * Math.sin(angle)},${ay - 4 * Math.cos(angle)}`);
      arrow.classList.add('pipeline-arrow');
      g.appendChild(arrow);

      // Particle
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3.5');
      dot.setAttribute('cx', x1);
      dot.setAttribute('cy', y1);
      dot.classList.add('pipeline-particle');
      g.appendChild(dot);

      this.svgLayer.appendChild(g);
    });
  }

  initParticles() {
    this.particles = [];
    const particleEls = this.svgLayer.querySelectorAll('.pipeline-particle');
    particleEls.forEach((dot) => {
      const g = dot.parentElement;
      const line = g.querySelector('.pipeline-edge');
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
      const x1 = parseFloat(p.line.getAttribute('x1'));
      const y1 = parseFloat(p.line.getAttribute('y1'));
      const x2 = parseFloat(p.line.getAttribute('x2'));
      const y2 = parseFloat(p.line.getAttribute('y2'));
      const cx = x1 + (x2 - x1) * p.progress;
      const cy = y1 + (y2 - y1) * p.progress;
      p.el.setAttribute('cx', cx);
      p.el.setAttribute('cy', cy);
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
        if (nodeId) {
          this.selectNode(nodeId);
          this.scrollToNode(nodeId);
        }
      });
    });
  }

  scrollToNode(nodeId) {
    const el = this.nodeEls[nodeId];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  /* ── Spring Hover Loop ──────────────────────────────────────── */

  startHoverLoop() {
    // Track mouse on canvas for spring hover
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Animation loop for hover springs
    const hoverLoop = () => {
      Object.values(this.nodeEls).forEach(el => {
        const nodeId = el.dataset.nodeId;
        if (!this.hoverSprings[nodeId]) {
          this.hoverSprings[nodeId] = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
        }
        const s = this.hoverSprings[nodeId];
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = this.mouseX - cx;
        const dy = this.mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 80;

        if (dist < radius && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const pull = (radius - dist) / radius;
          s.tx = nx * pull * 6;
          s.ty = ny * pull * 6;
        } else {
          s.tx = 0;
          s.ty = 0;
        }

        // Spring step (stiffness: 80, damping: 12)
        const stiffness = 80, damping = 12;
        s.vx += (-stiffness * (s.x - s.tx) - damping * s.vx) * 0.016;
        s.vy += (-stiffness * (s.y - s.ty) - damping * s.vy) * 0.016;
        s.x += s.vx;
        s.y += s.vy;

        if (Math.abs(s.x) > 0.01 || Math.abs(s.y) > 0.01) {
          el.style.transform = `translate(${s.x}px, ${s.y}px)`;
        } else {
          el.style.transform = '';
        }
      });
      requestAnimationFrame(hoverLoop);
    };
    requestAnimationFrame(hoverLoop);
  }

  /* ── Node Selection ──────────────────────────────────────────── */

  selectNode(nodeId) {
    // Deselect previous
    if (this.activeNodeId) {
      const prevEl = this.nodeEls[this.activeNodeId];
      if (prevEl) prevEl.classList.remove('pipeline-node--selected');
      this.highlightConnections(null);
    }

    const nodeDef = this.nodes.find(n => n.id === nodeId);
    if (!nodeDef || !nodeDef.detail) return;

    this.activeNodeId = nodeId;
    const el = this.nodeEls[nodeId];
    if (el) {
      el.classList.add('pipeline-node--selected');
      // Ripple animation
      this.triggerRipple(el);
    }

    this.highlightConnections(nodeId);

    // Populate panel
    this.detailTitle.textContent = nodeDef.detail.title;
    if (this.detailSubtitleEl) this.detailSubtitleEl.textContent = nodeDef.detail.subtitle || '';
    if (this.detailSparkMeta) this.detailSparkMeta.textContent = nodeDef.detail.sparkMeta || '';
    this.detailContent.innerHTML = nodeDef.detail.content;
    this.detailPanel.classList.add('detail-panel--open');
  }

  triggerRipple(el) {
    el.classList.add('pipeline-node--ripple');
    setTimeout(() => el.classList.remove('pipeline-node--ripple'), 600);
  }

  highlightConnections(nodeId) {
    const allConnections = this.svgLayer.querySelectorAll('.pipeline-connection');
    allConnections.forEach(g => {
      const from = g.dataset.from;
      const to = g.dataset.to;
      if (nodeId && (from === nodeId || to === nodeId)) {
        g.classList.add('pipeline-connection--active');
      } else {
        g.classList.remove('pipeline-connection--active');
      }
    });
  }

  /* ── Panel ───────────────────────────────────────────────────── */

  closePanel() {
    this.detailPanel.classList.remove('detail-panel--open');
    if (this.activeNodeId) {
      const el = this.nodeEls[this.activeNodeId];
      if (el) el.classList.remove('pipeline-node--selected');
      this.activeNodeId = null;
      this.highlightConnections(null);
    }
  }

  /* ── Run Pipeline ────────────────────────────────────────────── */

  runPipeline() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.runBtn) {
      this.runBtn.textContent = '⏸ Running...';
      this.runBtn.classList.add('toolbar-btn--active');
    }
    if (this.statusIndicator) {
      this.statusIndicator.textContent = 'Running';
      this.statusIndicator.className = 'status-badge status--running';
    }
    if (this.clusterRuntime) {
      this.clusterRuntime.textContent = 'Cluster: amit-resume-prod ● Running';
    }

    const layerOrder = ['source', 'bronze', 'silver', 'gold', 'sink'];
    const totalTime = layerOrder.length * 600 + 200;

    layerOrder.forEach((layer, i) => {
      setTimeout(() => {
        const layerNodes = this.nodes.filter(n => n.layer === layer || n.id === layer);
        layerNodes.forEach(n => { n.status = 'running'; this.updateNodeStatus(n.id, 'running'); });
      }, i * 600);

      setTimeout(() => {
        const layerNodes = this.nodes.filter(n => n.layer === layer || n.id === layer);
        layerNodes.forEach(n => { n.status = 'success'; this.updateNodeStatus(n.id, 'success'); });
      }, i * 600 + 400);
    });

    setTimeout(() => {
      this.isRunning = false;
      if (this.runBtn) {
        this.runBtn.textContent = '▶ Run Pipeline';
        this.runBtn.classList.remove('toolbar-btn--active');
      }
      if (this.statusIndicator) {
        this.statusIndicator.textContent = 'Succeeded';
        this.statusIndicator.className = 'status-badge status--success';
      }
      if (this.clusterRuntime) {
        this.clusterRuntime.textContent = 'Cluster: amit-resume-prod ● Idle';
      }
    }, totalTime);
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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closePanel();
    });

    // Re-render connections on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.svgLayer.innerHTML = '';
        this.renderConnections();
        this.initParticles();
      }, 200);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.pipeline = new PipelineEngine();
});
