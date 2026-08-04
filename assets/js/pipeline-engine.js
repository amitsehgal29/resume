/* ==========================================================================
   Pipeline Engine v4 — Responsive Flexbox + Dynamic SVG Connections
   ========================================================================== */

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
    this.nodeCount = document.getElementById('node-count');
    this.connectionCount = document.getElementById('connection-count');

    this.nodes = [];
    this.nodeEls = {};
    this.connections = [];
    this.particles = [];
    this.activeNodeId = null;
    this.isRunning = false;

    this.init();
  }

  /* ── Pipeline Data ──────────────────────────────────────────── */

  buildPipeline() {
    this.nodes = [
      // ═══════ MAIN FLOW NODES ═══════
      {
        id: 'source', label: 'Raw Profile\nData', type: 'source',
        container: 'main-flow', icon: '📥', layer: 'source',
        connectsTo: ['bronze-layer'],
        detail: { title: 'Amit Sehgal', subtitle: 'Senior Data Engineer · Dubai, UAE', sparkMeta: 'Job: ingest_profile_data · Status: Succeeded', content: this.sourceDetail() }
      },
      {
        id: 'bronze-layer', label: 'Bronze\nIngestion', type: 'layer',
        container: 'main-flow', icon: '🟤', layer: 'bronze',
        connectsTo: ['silver-layer', 'emirates', 'epam', 'abb', 'infosys'],
        detail: { title: 'Bronze Layer — Raw Data Lake', subtitle: 'Delta Table: delta_bronze.career_experience', sparkMeta: '4 versions · 4 companies · 9 years', content: this.bronzeLayerDetail() }
      },
      {
        id: 'silver-layer', label: 'Silver\nValidation', type: 'layer',
        container: 'main-flow', icon: '⚪', layer: 'silver',
        connectsTo: ['gold-layer', 'skills-node', 'certs-node', 'edu-node'],
        detail: { title: 'Silver Layer — Validated', subtitle: 'Delta Table: delta_silver.validated_skills', sparkMeta: 'Quality checks: 12/12 passed', content: this.silverLayerDetail() }
      },
      {
        id: 'gold-layer', label: 'Gold\nAggregation', type: 'layer',
        container: 'main-flow', icon: '🟡', layer: 'gold',
        connectsTo: ['sink', 'project-node', 'kpi-node'],
        detail: { title: 'Gold Layer — Business Value', subtitle: 'Delta Table: delta_gold.kpi_metrics', sparkMeta: 'OPTIMIZE + VACUUM applied', content: this.goldLayerDetail() }
      },
      {
        id: 'sink', label: 'Export\nContact', type: 'sink',
        container: 'main-flow', icon: '📤', layer: 'sink',
        connectsTo: [],
        detail: { title: 'Let\'s Build Together', subtitle: 'Dubai, UAE · Open to Senior DE Roles', sparkMeta: 'Format: PDF / LinkedIn / Email', content: this.sinkDetail() }
      },
      // ═══════ BRONZE ACTIVITIES ═══════
      {
        id: 'emirates', label: 'Emirates NBD', type: 'activity',
        container: 'zone-bronze-nodes', icon: '🏦', layer: 'bronze', shortLabel: 'DE Consultant · Jan 2025–Present',
        connectsTo: [],
        detail: { title: 'Data Engineer Consultant', subtitle: 'Emirates NBD · via ValueLabs · Jan 2025 – Present', sparkMeta: 'Cluster: prod-de-jobs · Photon: Enabled', content: this.emiratesDetail() }
      },
      {
        id: 'epam', label: 'EPAM Systems', type: 'activity',
        container: 'zone-bronze-nodes', icon: '🏢', layer: 'bronze', shortLabel: 'Sr DE · Dec 2021–Jan 2025',
        connectsTo: [],
        detail: { title: 'Senior Data Engineer', subtitle: 'EPAM Systems · Client: Canadian Tire · Dec 2021 – Jan 2025', sparkMeta: 'Target: Cosmos DB · Query gain: 40% · 100 GB/day', content: this.epamDetail() }
      },
      {
        id: 'abb', label: 'ABB Global', type: 'activity',
        container: 'zone-bronze-nodes', icon: '⚡', layer: 'bronze', shortLabel: 'R&D Engineer · Feb 2020–Dec 2021',
        connectsTo: [],
        detail: { title: 'R&D Engineer', subtitle: 'ABB Global Limited · Feb 2020 – Dec 2021', sparkMeta: 'Streaming: ActiveMQ + Event Hub · Sink: Cosmos DB + MongoDB', content: this.abbDetail() }
      },
      {
        id: 'infosys', label: 'Infosys', type: 'activity',
        container: 'zone-bronze-nodes', icon: '💻', layer: 'bronze', shortLabel: 'Data Engineer · Mar 2017–Feb 2020',
        connectsTo: [],
        detail: { title: 'Data Engineer', subtitle: 'Infosys · Clients: PwC, Exelon · Mar 2017 – Feb 2020', sparkMeta: 'Format: Parquet on HDFS · Schedule: Cron', content: this.infosysDetail() }
      },
      // ═══════ SILVER ACTIVITIES ═══════
      {
        id: 'skills-node', label: 'Technical Skills', type: 'activity',
        container: 'zone-silver-nodes', icon: '🔧', layer: 'silver', shortLabel: '26 Technologies · 4 Clusters',
        connectsTo: [],
        detail: { title: 'Technical Skills', subtitle: 'Unity Catalog: main.eng_skills — 26 verified technologies', sparkMeta: 'Catalog: main.eng_skills · Schema: validated', content: this.skillsDetail() }
      },
      {
        id: 'certs-node', label: 'Certifications', type: 'activity',
        container: 'zone-silver-nodes', icon: '📜', layer: 'silver', shortLabel: '2 Azure Certs',
        connectsTo: [],
        detail: { title: 'Microsoft Azure Certifications', subtitle: '2 Active Credentials · Verified', sparkMeta: 'Validation: Microsoft Learning · Status: Active', content: this.certsDetail() }
      },
      {
        id: 'edu-node', label: 'Education', type: 'activity',
        container: 'zone-silver-nodes', icon: '🎓', layer: 'silver', shortLabel: 'B.E. Mumbai Univ · 2012–2016',
        connectsTo: [],
        detail: { title: 'Education', subtitle: 'B.E. Electronics & Telecom · Mumbai University', sparkMeta: 'Duration: 2012 – 2016', content: this.eduDetail() }
      },
      // ═══════ GOLD ACTIVITIES ═══════
      {
        id: 'project-node', label: 'Production Project', type: 'activity',
        container: 'zone-gold-nodes', icon: '🚀', layer: 'gold', shortLabel: 'Flask · 5,000 DAU',
        connectsTo: [],
        detail: { title: 'Vasai Corona Resources', subtitle: 'Flask · High Availability · 5,000 Daily Users', sparkMeta: 'Deployment: Flask · Uptime: 99.9% · Peak: 5K DAU', content: this.projectDetail() }
      },
      {
        id: 'kpi-node', label: 'Performance KPIs', type: 'activity',
        container: 'zone-gold-nodes', icon: '📊', layer: 'gold', shortLabel: '9 Years · 6 Metrics',
        connectsTo: [],
        detail: { title: 'Pipeline Performance Metrics', subtitle: '9 Years · 6 Key Indicators', sparkMeta: 'Refresh: Real-time · Source: delta_gold.kpi_metrics', content: this.kpiDetail() }
      },
    ];

    this.connections = [];
    this.nodes.forEach(node => {
      (node.connectsTo || []).forEach(targetId => {
        this.connections.push({ from: node.id, to: targetId });
      });
    });

    if (this.nodeCount) this.nodeCount.textContent = this.nodes.length;
    if (this.connectionCount) this.connectionCount.textContent = this.connections.length;
  }

  /* ── Detail Content Helpers (unchanged) ──────────────────────── */
  sourceDetail() { return `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">📍 Dubai, UAE</span><span class="detail-badge primary">📧 reachamitsehgal29@gmail.com</span><span class="detail-badge">📞 +971-506889952</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code">df_profile = spark.read.format("json").load("s3://data-lake/bronze/profile/*.json")<br>df_profile.printSchema()</div><div class="nb-cell__output">root<br> |-- name: string — Amit Sehgal<br> |-- title: string — Senior Data Engineer<br> |-- experience_years: int — 9</div></div><p class="detail-text">Innovative Senior Data Engineer with <strong>9 years</strong> experience architecting high-performance data platforms across <strong>Azure and on-premises ecosystems</strong> for top-tier financial institutions.</p><div class="detail-links"><a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a><a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download Resume</a></div></div>`; }
  bronzeLayerDetail() { return `<div class="detail-block"><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">DESCRIBE HISTORY delta_bronze.career_experience</div><div class="nb-cell__output">4 versions · 4 companies · 9 years</div></div><p class="detail-text">Raw experience data ingested from <strong>4 enterprise organizations</strong> across banking, retail, IoT, and consulting.</p></div>`; }
  silverLayerDetail() { return `<div class="detail-block"><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">SELECT skill_category, COUNT(*) as cnt FROM delta_silver.validated_skills GROUP BY 1</div><div class="nb-cell__output">Core: 7 | Cloud: 9 | Modern: 4 | Advanced: 6</div></div></div>`; }
  goldLayerDetail() { return `<div class="detail-block"><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code">OPTIMIZE delta_gold.kpi_metrics; VACUUM delta_gold.kpi_metrics RETAIN 168 HOURS;<br>SELECT * FROM delta_gold.kpi_metrics</div></div></div>`; }
  sinkDetail() { return `<div class="detail-block"><div class="detail-links"><a href="mailto:reachamitsehgal29@gmail.com" class="detail-link primary">✉️ Email</a><a href="tel:+971506889952" class="detail-link">📞 Call</a><a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link primary">🔗 LinkedIn</a><a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download PDF</a></div></div>`; }
  emiratesDetail() { return `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">PySpark</span><span class="detail-badge primary">Kafka</span><span class="detail-badge primary">Airflow</span><span class="detail-badge">Oozie</span><span class="detail-badge">Oracle</span><span class="detail-badge">SAP HANA</span><span class="detail-badge success">Claude Code</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code"><span class="nb-comment">// Wholesale Banking ETL</span><br>spark.conf.set("spark.sql.adaptive.enabled","true")<br>spark.conf.set("spark.databricks.delta.optimizeWrite.enabled","true")</div></div><ul class="detail-list"><li>Engineered E2E Wholesale Banking pipeline — <strong>PySpark + Kafka + ODS</strong></li><li>Spearheaded <strong>SAP HANA → PySpark</strong> migration for 5 banking entities</li><li>Automated <strong>~180 daily jobs</strong> via YAML-driven parameterized PySpark framework</li><li>Managed complex ETL with <strong>Airflow, Oozie, Claude Code</strong></li></ul></div>`; }
  epamDetail() { return `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Cosmos DB</span><span class="detail-badge">Hive</span><span class="detail-badge">Delta Lake</span></div><div class="nb-cell"><div class="nb-cell__cmd">%sql</div><div class="nb-cell__code"><span class="nb-comment">-- Hive → Delta → Cosmos DB</span><br>CREATE TABLE delta_silver.dealer_analytics USING DELTA<br>AS SELECT * FROM hive_enterprise.dealer_data</div></div><ul class="detail-list"><li>Built ADF pipelines processing <strong>100 GB daily</strong></li><li>Architected <strong>Hive → Cosmos DB</strong> migration — <strong>40% faster queries</strong></li><li>Designed optimized JSON schemas with cross-functional teams</li></ul></div>`; }
  abbDetail() { return `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">Azure IoT</span><span class="detail-badge primary">PySpark</span><span class="detail-badge primary">ML Models</span><span class="detail-badge">ActiveMQ</span><span class="detail-badge">Event Hub</span><span class="detail-badge">Cosmos DB</span><span class="detail-badge success">Python APIs</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code"><span class="nb-comment">// Real-time IoT stream → Delta</span><br>df_stream.writeStream.format("delta").table("delta_bronze.iot_telemetry")</div></div><ul class="detail-list"><li>Built <strong>real-time IoT pipeline</strong> (ActiveMQ, Event Hub)</li><li>Deployed <strong>ML models</strong> on unstructured data → Cosmos DB + MongoDB</li><li>Built Python CRUD APIs — <strong>saved 15 hrs/week</strong></li></ul></div>`; }
  infosysDetail() { return `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">PySpark</span><span class="detail-badge primary">HDFS</span><span class="detail-badge">Parquet</span><span class="detail-badge">Python</span><span class="detail-badge">Selenium</span><span class="detail-badge">Oracle</span></div><div class="nb-cell"><div class="nb-cell__cmd">%spark</div><div class="nb-cell__code"><span class="nb-comment">// Multi-format → Parquet on HDFS</span><br>df.write.format("parquet").mode("overwrite").save("hdfs://datalake/curated/")</div></div><ul class="detail-list"><li>ETL: <strong>CSV, JSON, MySQL → HDFS Parquet</strong></li><li>Query transformations + HDFS tables → curated layer via <strong>Cron</strong></li><li>API testing with <strong>Python + Selenium</strong></li></ul></div>`; }
  skillsDetail() { return `<div class="detail-block"><div class="detail-section"><h4 class="detail-section-title">Core Engineering</h4><div class="detail-meta-row"><span class="detail-badge primary">Python</span><span class="detail-badge primary">PySpark</span><span class="detail-badge">SQL</span><span class="detail-badge">NoSQL</span><span class="detail-badge">APIs</span><span class="detail-badge">Shell</span><span class="detail-badge">K8s</span></div></div><div class="detail-section"><h4 class="detail-section-title">Cloud & Big Data</h4><div class="detail-meta-row"><span class="detail-badge primary">ADF</span><span class="detail-badge primary">Databricks</span><span class="detail-badge">Delta Lake</span><span class="detail-badge">Unity Catalog</span><span class="detail-badge">Cosmos DB</span><span class="detail-badge">Hadoop</span><span class="detail-badge">Kafka</span><span class="detail-badge">Flink</span></div></div><div class="detail-section"><h4 class="detail-section-title">Modern Stack</h4><div class="detail-meta-row"><span class="detail-badge primary">Snowflake</span><span class="detail-badge">dbt</span><span class="detail-badge primary">Airflow</span><span class="detail-badge">Oozie</span></div></div><div class="detail-section"><h4 class="detail-section-title">Advanced</h4><div class="detail-meta-row"><span class="detail-badge primary">Streaming</span><span class="detail-badge">Kafka/Flink</span><span class="detail-badge primary">LLM/GenAI</span><span class="detail-badge">Claude Code</span></div></div></div>`; }
  certsDetail() { return `<div class="detail-block"><div class="detail-cert"><span class="detail-cert-icon">☁️</span><div><strong>Azure Developer Associate</strong><br><span class="detail-text-sm">Microsoft Certified</span></div></div><div class="detail-cert"><span class="detail-cert-icon">🔌</span><div><strong>Azure IoT Developer Specialty</strong><br><span class="detail-text-sm">Microsoft Certified</span></div></div></div>`; }
  eduDetail() { return `<div class="detail-block"><div class="detail-cert"><span class="detail-cert-icon">🎓</span><div><strong>B.E. Electronics & Telecom</strong><br><span class="detail-text-sm">Mumbai University · 2012 – 2016</span></div></div></div>`; }
  projectDetail() { return `<div class="detail-block"><div class="detail-meta-row"><span class="detail-badge primary">Python</span><span class="detail-badge primary">Flask</span><span class="detail-badge">REST APIs</span><span class="detail-badge success">HA Design</span></div><div class="nb-cell"><div class="nb-cell__cmd">%python</div><div class="nb-cell__code"><span class="nb-comment"># Flask — 5,000 DAU, sub-50ms</span><br>@app.route('/api/resources')<br>def get_resources():<br>    return jsonify(cached_query("SELECT * FROM resources"))</div></div><ul class="detail-list"><li>Engineered <strong>Flask web app</strong> for COVID-19 resources</li><li>Backend handling <strong>5,000+ daily users</strong> with zero downtime</li></ul></div>`; }
  kpiDetail() { return `<div class="detail-block"><div class="kpi-grid"><div class="kpi-card"><span class="kpi-value">9+</span><span class="kpi-label">Years Exp</span></div><div class="kpi-card"><span class="kpi-value">180/day</span><span class="kpi-label">Auto Jobs</span></div><div class="kpi-card"><span class="kpi-value">100 GB</span><span class="kpi-label">Daily Data</span></div><div class="kpi-card"><span class="kpi-value">40%</span><span class="kpi-label">Query Gain</span></div><div class="kpi-card"><span class="kpi-value">15 hrs</span><span class="kpi-label">Saved/Week</span></div><div class="kpi-card"><span class="kpi-value">5,000</span><span class="kpi-label">Peak DAU</span></div></div></div>`; }

  /* ── Rendering ───────────────────────────────────────────────── */

  render() {
    this.buildPipeline();
    this.renderNodes();
    this.drawAllConnections();
    this.animateParticles();
    this.initSidebar();
    this.initResizeObserver();
  }

  renderNodes() {
    this.nodes.forEach(nodeDef => {
      const container = document.getElementById(nodeDef.container);
      if (!container) return;

      const el = document.createElement('div');
      el.className = `pipeline-node pipeline-node--${nodeDef.type} pipeline-node--${nodeDef.layer}`;
      el.id = `node-${nodeDef.id}`;
      el.dataset.nodeId = nodeDef.id;
      el.dataset.layer = nodeDef.layer || '';

      el.innerHTML = `
        <span class="pipeline-node__icon">${nodeDef.icon}</span>
        <span class="pipeline-node__text">
          <span class="pipeline-node__label">${(nodeDef.label || '').replace(/\n/g, '<br>')}</span>
          ${nodeDef.shortLabel ? `<span class="pipeline-node__sublabel">${nodeDef.shortLabel}</span>` : ''}
        </span>
        ${nodeDef.type === 'layer' ? '<span class="pipeline-node__delta">Δ</span>' : ''}
      `;

      el.addEventListener('click', (e) => { e.stopPropagation(); this.selectNode(nodeDef.id); });
      container.appendChild(el);
      this.nodeEls[nodeDef.id] = el;
    });
  }

  /* ── SVG Connections ─────────────────────────────────────────── */

  drawAllConnections() {
    this.svgLayer.innerHTML = '';
    this.particles = [];

    this.connections.forEach(conn => {
      const fromEl = this.nodeEls[conn.from];
      const toEl = this.nodeEls[conn.to];
      if (!fromEl || !toEl) return;

      const canvasRect = this.canvas.getBoundingClientRect();
      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();

      const x1 = fr.left + fr.width / 2 - canvasRect.left + this.canvas.scrollLeft;
      const y1 = fr.top + fr.height / 2 - canvasRect.top + this.canvas.scrollTop;
      const x2 = tr.left + tr.width / 2 - canvasRect.left + this.canvas.scrollLeft;
      const y2 = tr.top + tr.height / 2 - canvasRect.top + this.canvas.scrollTop;

      // Shorten lines to start/end at node edges
      const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx*dx + dy*dy) || 1;
      const nx = dx / len, ny = dy / len;
      const fromPad = fromEl.offsetWidth / 2 + 4;
      const toPad = toEl.offsetWidth / 2 + 10;
      const sx = x1 + nx * fromPad, sy = y1 + ny * fromPad;
      const ex = x2 - nx * toPad, ey = y2 - ny * toPad;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('pipeline-connection');
      g.dataset.from = conn.from;
      g.dataset.to = conn.to;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', sx); line.setAttribute('y1', sy);
      line.setAttribute('x2', ex); line.setAttribute('y2', ey);
      line.classList.add('pipeline-edge');
      g.appendChild(line);

      const angle = Math.atan2(ey - sy, ex - sx);
      const asz = 7;
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arrow.setAttribute('points', `${ex},${ey} ${ex - asz*Math.cos(angle - 0.5)},${ey - asz*Math.sin(angle - 0.5)} ${ex - asz*Math.cos(angle + 0.5)},${ey - asz*Math.sin(angle + 0.5)}`);
      arrow.classList.add('pipeline-arrow');
      g.appendChild(arrow);

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3'); dot.setAttribute('cx', sx); dot.setAttribute('cy', sy);
      dot.classList.add('pipeline-particle');
      g.appendChild(dot);

      this.svgLayer.appendChild(g);
      this.particles.push({ el: dot, sx, sy, ex, ey, progress: Math.random(), speed: 0.003 + Math.random() * 0.004 });
    });
  }

  animateParticles() {
    this.particles.forEach(p => {
      p.progress += p.speed * (this.isRunning ? 4 : 1);
      if (p.progress > 1) p.progress -= 1;
      const cx = p.sx + (p.ex - p.sx) * p.progress;
      const cy = p.sy + (p.ey - p.sy) * p.progress;
      p.el.setAttribute('cx', cx);
      p.el.setAttribute('cy', cy);
      p.el.setAttribute('opacity', p.progress < 0.08 ? p.progress/0.08 : p.progress > 0.92 ? (1-p.progress)/0.08 : 1);
    });
    requestAnimationFrame(() => this.animateParticles());
  }

  initResizeObserver() {
    new ResizeObserver(() => this.drawAllConnections()).observe(this.canvas);
    window.addEventListener('resize', () => this.drawAllConnections());
    this.canvas.addEventListener('scroll', () => this.drawAllConnections());
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
    if (this.runBtn) { this.runBtn.textContent = '⏸ Running...'; this.runBtn.classList.add('toolbar-btn--active'); }
    if (this.statusIndicator) { this.statusIndicator.textContent = 'Running'; this.statusIndicator.className = 'status-badge status--running'; }
    if (this.clusterRuntime) this.clusterRuntime.textContent = 'Cluster: amit-resume-prod ● Running';

    const layerOrder = ['source', 'bronze', 'silver', 'gold', 'sink'];
    layerOrder.forEach((layer, i) => {
      setTimeout(() => {
        this.nodes.filter(n => n.layer === layer || n.id === layer).forEach(n => { this.updateNodeStatus(n.id, 'running'); });
      }, i * 600);
      setTimeout(() => {
        this.nodes.filter(n => n.layer === layer || n.id === layer).forEach(n => { this.updateNodeStatus(n.id, 'success'); });
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
    let badge = el.querySelector('.pipeline-node__status');
    if (!badge) { badge = document.createElement('span'); badge.classList.add('pipeline-node__status'); el.appendChild(badge); }
    badge.className = `pipeline-node__status status--${status}`;
  }

  /* ── Init ────────────────────────────────────────────────────── */

  init() {
    this.render();
    if (this.runBtn) this.runBtn.addEventListener('click', () => this.runPipeline());
    document.getElementById('btn-close-panel').addEventListener('click', () => this.closePanel());
    this.canvas.addEventListener('click', (e) => { if (e.target === this.canvas) this.closePanel(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closePanel(); });
  }
}

document.addEventListener('DOMContentLoaded', () => { window.pipeline = new PipelineEngine(); });
