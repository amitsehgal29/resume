/* ==========================================================================
   Pipeline Engine — ADF-style interactive canvas
   ========================================================================== */

class PipelineEngine {
  constructor() {
    this.canvas = document.getElementById('pipeline-canvas');
    this.canvasInner = this.canvas.querySelector('.pipeline-canvas__inner');
    this.svgLayer = document.getElementById('pipeline-svg');
    this.detailPanel = document.getElementById('detail-panel');
    this.detailContent = document.getElementById('detail-content');
    this.detailTitle = document.getElementById('detail-title');
    this.runBtn = document.getElementById('btn-run');
    this.statusIndicator = document.getElementById('pipeline-status');
    this.nodeCount = document.getElementById('node-count');
    this.connectionCount = document.getElementById('connection-count');

    this.nodes = [];
    this.connections = [];
    this.particles = [];
    this.activeNode = null;
    this.isRunning = false;
    this.runProgress = 0;

    this.init();
  }

  /* ── Pipeline Data ──────────────────────────────────────────── */

  buildPipeline() {
    // Define nodes — each has id, label, type, position, connections, and detail data
    const nodeDefs = [
      {
        id: 'source', label: 'Raw Profile\nData', type: 'source',
        x: 40, y: 280,
        icon: '📥', layer: 'source',
        connectsTo: ['bronze-layer'],
        detail: {
          title: 'Amit Sehgal',
          subtitle: 'Senior Data Engineer',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge">📍 Dubai, UAE</span>
                <span class="detail-badge">📧 reachamitsehgal29@gmail.com</span>
                <span class="detail-badge">📞 +971-506889952</span>
              </div>
              <p class="detail-text">Innovative and visionary Senior Data Engineer with <strong>9 years</strong> of experience architecting high-performance, cost-optimized data platforms across Azure and on-premises ecosystems for top-tier financial institutions.</p>
              <p class="detail-text">Specializes in transforming complex, multi-source data into automated, highly parameterized ETL pipelines using <strong>PySpark, Kafka, and Airflow</strong>. Proven track record of integrating GenAI tools (Claude Code) into development workflows to accelerate zero-defect delivery.</p>
              <div class="detail-links">
                <a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link">🔗 LinkedIn</a>
                <a href="Amit Sehgal Resume.pdf" download class="detail-link">📄 Download Resume</a>
              </div>
            </div>`
        }
      },
      {
        id: 'bronze-layer', label: 'Bronze Layer\nRaw Ingestion', type: 'layer',
        x: 260, y: 100, layer: 'bronze',
        icon: '🥉', status: 'pending',
        connectsTo: ['silver-layer', 'emirates', 'epam', 'abb', 'infosys'],
        detail: {
          title: 'Bronze Layer — Raw Data Ingestion',
          subtitle: '4 Enterprise Roles · 9 Years Experience',
          content: `<p class="detail-text">The foundation layer — raw career data ingested from 4 enterprise organizations across banking, retail, IoT, and consulting domains. Each node represents a role that transformed raw business requirements into operational data pipelines.</p>`
        }
      },
      {
        id: 'silver-layer', label: 'Silver Layer\nValidated & Clean', type: 'layer',
        x: 500, y: 100, layer: 'silver',
        icon: '🥈', status: 'pending',
        connectsTo: ['gold-layer', 'skills-node', 'certs-node', 'edu-node'],
        detail: {
          title: 'Silver Layer — Validated & Transformed',
          subtitle: '4 Skill Clusters · 2 Certifications · B.E.',
          content: `<p class="detail-text">Technical skills refined across cloud ecosystems and on-premises environments. Each node has been battle-tested at enterprise scale.</p>`
        }
      },
      {
        id: 'gold-layer', label: 'Gold Layer\nBusiness Value', type: 'layer',
        x: 740, y: 100, layer: 'gold',
        icon: '🥇', status: 'pending',
        connectsTo: ['sink', 'project-node', 'kpi-node'],
        detail: {
          title: 'Gold Layer — Curated Business Value',
          subtitle: 'Production Project · 5 Key Metrics',
          content: `<p class="detail-text">Aggregated insights ready for stakeholder consumption. Proven impact delivered across organizations.</p>`
        }
      },
      {
        id: 'sink', label: 'Contact\n& Export', type: 'sink',
        x: 980, y: 280,
        icon: '📤', layer: 'sink',
        connectsTo: [],
        detail: {
          title: 'Ready to Connect',
          subtitle: 'Dubai, UAE · Open to Opportunities',
          content: `
            <div class="detail-block">
              <p class="detail-text">Let's discuss how I can architect your next data platform.</p>
              <div class="detail-links" style="margin-top:16px">
                <a href="mailto:reachamitsehgal29@gmail.com" class="detail-link primary">✉️ Send Email</a>
                <a href="tel:+971506889952" class="detail-link">📞 Call</a>
                <a href="https://linkedin.com/in/sehgal-amit" target="_blank" class="detail-link">🔗 LinkedIn</a>
                <a href="Amit Sehgal Resume.pdf" download class="detail-link primary">📄 Download Resume</a>
              </div>
            </div>`
        }
      },
      // Bronze children
      {
        id: 'emirates', label: 'Emirates NBD', type: 'activity',
        x: 260, y: 260, layer: 'bronze',
        icon: '🏦', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Data Engineer Consultant',
          subtitle: 'Emirates NBD · via ValueLabs · Jan 2025 – Present',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">PySpark</span>
                <span class="detail-badge primary">Kafka</span>
                <span class="detail-badge primary">Airflow</span>
                <span class="detail-badge">Oozie</span>
                <span class="detail-badge">Oracle</span>
                <span class="detail-badge">SAP HANA</span>
                <span class="detail-badge">Claude Code</span>
              </div>
              <ul class="detail-list">
                <li>Engineered end-to-end data pipeline for Wholesale Banking customer deals using PySpark, Kafka, and ODS — standardising approvals and tracking deal expiries to deliver significant business cost savings.</li>
                <li>Spearheaded decommissioning of <strong>SAP HANA</strong> by migrating BDM workflows to PySpark for <strong>5 banking entities</strong>, eliminating SAP license costs and automating <strong>~180 daily jobs</strong> loading to Oracle.</li>
                <li>Designed highly parameterised PySpark framework configured via simple YAML files, enabling zero-defect ETL job replication.</li>
                <li>Managed complex daily and monthly ETL loads aggregating multiple finance sources, leveraging <strong>Airflow, Oozie, and GenAI tools</strong> like Claude Code to accelerate deployment.</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'epam', label: 'EPAM Systems', type: 'activity',
        x: 260, y: 370, layer: 'bronze',
        icon: '🏢', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Senior Data Engineer',
          subtitle: 'EPAM Systems · Client: Canadian Tire · Dec 2021 – Jan 2025',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Azure Data Factory</span>
                <span class="detail-badge primary">Cosmos DB</span>
                <span class="detail-badge">Hive</span>
                <span class="detail-badge">JSON</span>
              </div>
              <ul class="detail-list">
                <li>Developed feature-based data pipelines using Azure Data Factory, enabling a new analytical web application for dealers that seamlessly processed <strong>100 GB of daily data</strong>.</li>
                <li>Architected migration of enterprise data from Hive tables into Azure Cosmos DB, <strong>reducing query retrieval times by 40%</strong>.</li>
                <li>Collaborated directly with Business Analysts and Backend Developers to define business requirements and structure optimized JSON schemas for Cosmos DB.</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'abb', label: 'ABB Global', type: 'activity',
        x: 260, y: 460, layer: 'bronze',
        icon: '⚡', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Research and Development Engineer',
          subtitle: 'ABB Global Limited · Feb 2020 – Dec 2021',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Azure</span>
                <span class="detail-badge primary">IoT</span>
                <span class="detail-badge primary">PySpark</span>
                <span class="detail-badge">ML</span>
                <span class="detail-badge">Cosmos DB</span>
                <span class="detail-badge">MongoDB</span>
                <span class="detail-badge">Python APIs</span>
              </div>
              <ul class="detail-list">
                <li>Built real-time data pipeline across Azure cloud and on-premises deployments to process semi-structured IoT telemetry data from ActiveMQ and Event Hub.</li>
                <li>Designed framework to deploy ML models on unstructured data (text, images, videos), routing predictive results to Cosmos DB and MongoDB.</li>
                <li>Developed automated PySpark batch jobs to clean, transform, and migrate data from data lake to curated store via Rundeck, Azure Pipelines, and ADF.</li>
                <li>Created custom Python APIs facilitating CRUD operations, <strong>saving ~15 hours of manual effort per week</strong>.</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'infosys', label: 'Infosys', type: 'activity',
        x: 260, y: 540, layer: 'bronze',
        icon: '💻', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Data Engineer',
          subtitle: 'Infosys · Clients: PwC, Exelon · Mar 2017 – Feb 2020',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">PySpark</span>
                <span class="detail-badge primary">HDFS</span>
                <span class="detail-badge">Parquet</span>
                <span class="detail-badge">Python</span>
                <span class="detail-badge">Selenium</span>
                <span class="detail-badge">MongoDB</span>
              </div>
              <ul class="detail-list">
                <li>Developed PySpark-based ETL workflows to migrate diverse data formats (CSV, JSON, MySQL) into on-premises HDFS in Parquet format.</li>
                <li>Optimized data delivery by executing query transformations and creating tables on HDFS to push data to curated layer, scheduled via Cron.</li>
                <li>Automated data API testing with Python and Selenium, validating data loads from Oracle DB to MongoDB.</li>
                <li>Assisted in architectural design of data warehouse schema and resolved bugs via VSTS DevOps platform.</li>
              </ul>
            </div>`
        }
      },
      // Silver children
      {
        id: 'skills-node', label: 'Technical\nSkills', type: 'activity',
        x: 500, y: 260, layer: 'silver',
        icon: '🔧', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Technical Skills',
          subtitle: '4 Clusters · Enterprise-Grade Stack',
          content: `
            <div class="detail-block">
              <div class="detail-section">
                <h4 class="detail-section-title">Core Engineering</h4>
                <div class="detail-meta-row">
                  <span class="detail-badge primary">Python</span><span class="detail-badge primary">PySpark</span>
                  <span class="detail-badge">SQL</span><span class="detail-badge">NoSQL</span>
                  <span class="detail-badge">Data APIs</span><span class="detail-badge">Shell Scripting</span>
                  <span class="detail-badge">Kubernetes</span>
                </div>
              </div>
              <div class="detail-section">
                <h4 class="detail-section-title">Cloud & Big Data</h4>
                <div class="detail-meta-row">
                  <span class="detail-badge primary">Azure Data Factory</span><span class="detail-badge primary">Databricks</span>
                  <span class="detail-badge">Delta Lake</span><span class="detail-badge">Unity Catalog</span>
                  <span class="detail-badge">Cosmos DB</span><span class="detail-badge">Hadoop</span>
                  <span class="detail-badge">Spark SQL</span><span class="detail-badge">Kafka</span><span class="detail-badge">Flink</span>
                </div>
              </div>
              <div class="detail-section">
                <h4 class="detail-section-title">Modern Data Stack</h4>
                <div class="detail-meta-row">
                  <span class="detail-badge primary">Snowflake</span><span class="detail-badge">dbt</span>
                  <span class="detail-badge primary">Apache Airflow</span><span class="detail-badge">Oozie</span>
                </div>
              </div>
              <div class="detail-section">
                <h4 class="detail-section-title">Advanced Pipelines</h4>
                <div class="detail-meta-row">
                  <span class="detail-badge primary">Real-time Streaming</span><span class="detail-badge">Kafka/Flink</span>
                  <span class="detail-badge primary">LLM/GenAI Pipelines</span><span class="detail-badge">Claude Code</span>
                  <span class="detail-badge">Data Governance</span>
                </div>
              </div>
            </div>`
        }
      },
      {
        id: 'certs-node', label: 'Certifications', type: 'activity',
        x: 500, y: 390, layer: 'silver',
        icon: '📜', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Certifications',
          subtitle: 'Microsoft Azure Certified',
          content: `
            <div class="detail-block">
              <div class="detail-cert"><span class="detail-cert-icon">☁️</span><div><strong>Azure Developer Associate</strong><br><span class="detail-text-sm">Microsoft Certified</span></div></div>
              <div class="detail-cert"><span class="detail-cert-icon">🔌</span><div><strong>Azure IoT Developer Specialty</strong><br><span class="detail-text-sm">Microsoft Certified</span></div></div>
            </div>`
        }
      },
      {
        id: 'edu-node', label: 'Education', type: 'activity',
        x: 500, y: 480, layer: 'silver',
        icon: '🎓', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Education',
          subtitle: 'Bachelor of Engineering',
          content: `
            <div class="detail-block">
              <div class="detail-cert"><span class="detail-cert-icon">🎓</span><div><strong>B.E. in Electronics & Telecom</strong><br><span class="detail-text-sm">Mumbai University · 2012 – 2016</span></div></div>
            </div>`
        }
      },
      // Gold children
      {
        id: 'project-node', label: 'Personal\nProject', type: 'activity',
        x: 740, y: 280, layer: 'gold',
        icon: '🚀', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Vasai Corona Resources',
          subtitle: 'Flask Web Application · High Availability',
          content: `
            <div class="detail-block">
              <div class="detail-meta-row">
                <span class="detail-badge primary">Python</span>
                <span class="detail-badge primary">Flask</span>
                <span class="detail-badge">REST APIs</span>
                <span class="detail-badge">High Availability</span>
              </div>
              <ul class="detail-list">
                <li>Designed and engineered a highly available web application using Flask framework to curate essential COVID-19 resources for the Vasai-Virar city region.</li>
                <li>Built robust backend to successfully handle <strong>traffic spikes of up to 5,000 daily users</strong> without downtime.</li>
              </ul>
            </div>`
        }
      },
      {
        id: 'kpi-node', label: 'Performance\nKPIs', type: 'activity',
        x: 740, y: 420, layer: 'gold',
        icon: '📊', status: 'pending',
        connectsTo: [],
        detail: {
          title: 'Pipeline Performance Metrics',
          subtitle: '9 Years of Engineering Impact',
          content: `
            <div class="detail-block">
              <div class="kpi-grid">
                <div class="kpi-card"><span class="kpi-value">9+</span><span class="kpi-label">Years Experience</span></div>
                <div class="kpi-card"><span class="kpi-value">180/day</span><span class="kpi-label">Automated Jobs</span></div>
                <div class="kpi-card"><span class="kpi-value">100 GB</span><span class="kpi-label">Daily Data</span></div>
                <div class="kpi-card"><span class="kpi-value">40%</span><span class="kpi-label">Query Gain</span></div>
                <div class="kpi-card"><span class="kpi-value">15 hrs</span><span class="kpi-label">Saved/Week</span></div>
                <div class="kpi-card"><span class="kpi-value">5,000</span><span class="kpi-label">Daily Users</span></div>
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

    // Update status bar counts
    if (this.nodeCount) this.nodeCount.textContent = this.nodes.length;
    if (this.connectionCount) this.connectionCount.textContent = this.connections.length;
  }

  /* ── Rendering ───────────────────────────────────────────────── */

  render() {
    this.buildPipeline();
    this.renderNodes();
    this.renderConnections();
    this.initParticles();
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
        ${nodeDef.status ? `<span class="pipeline-node__status status--${nodeDef.status}"></span>` : ''}
      `;

      el.addEventListener('click', () => this.selectNode(nodeDef.id));
      this.canvasInner.appendChild(el);
    });
  }

  renderConnections() {
    this.connections.forEach(conn => {
      const fromEl = document.getElementById(`node-${conn.from}`);
      const toEl = document.getElementById(`node-${conn.to}`);
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const canvasRect = this.canvas.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
      const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
      const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

      // Create connection group
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('pipeline-connection');
      g.dataset.from = conn.from;
      g.dataset.to = conn.to;

      // Edge line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.classList.add('pipeline-edge');
      g.appendChild(line);

      // Arrow head
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const arrowSize = 8;
      const ax = x2 - arrowSize * Math.cos(angle);
      const ay = y2 - arrowSize * Math.sin(angle);
      arrow.setAttribute('points', `${x2},${y2} ${ax - 4 * Math.sin(angle)},${ay + 4 * Math.cos(angle)} ${ax + 4 * Math.sin(angle)},${ay - 4 * Math.cos(angle)}`);
      arrow.classList.add('pipeline-arrow');
      g.appendChild(arrow);

      // Particle dot (for animation)
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3');
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
    particleEls.forEach((dot, i) => {
      // Find the edge line in the same group
      const g = dot.parentElement;
      const line = g.querySelector('.pipeline-edge');
      if (!line) return;
      this.particles.push({
        el: dot,
        line: line,
        progress: Math.random(), // random start
        speed: 0.002 + Math.random() * 0.004,
      });
    });
    this.animateParticles();
  }

  animateParticles() {
    this.particles.forEach(p => {
      p.progress += p.speed * (this.isRunning ? 3 : 1);
      if (p.progress > 1) p.progress = 0;

      const x1 = parseFloat(p.line.getAttribute('x1'));
      const y1 = parseFloat(p.line.getAttribute('y1'));
      const x2 = parseFloat(p.line.getAttribute('x2'));
      const y2 = parseFloat(p.line.getAttribute('y2'));

      const cx = x1 + (x2 - x1) * p.progress;
      const cy = y1 + (y2 - y1) * p.progress;
      p.el.setAttribute('cx', cx);
      p.el.setAttribute('cy', cy);

      // Fade at ends
      const fade = p.progress < 0.1 ? p.progress / 0.1 :
                   p.progress > 0.9 ? (1 - p.progress) / 0.1 : 1;
      p.el.setAttribute('opacity', fade);
    });

    requestAnimationFrame(() => this.animateParticles());
  }

  /* ── Node Selection ──────────────────────────────────────────── */

  selectNode(nodeId) {
    // Deselect previous
    if (this.activeNode) {
      const prevEl = document.getElementById(`node-${this.activeNode}`);
      if (prevEl) prevEl.classList.remove('pipeline-node--selected');
    }

    // Select new
    const nodeDef = this.nodes.find(n => n.id === nodeId);
    if (!nodeDef || !nodeDef.detail) return;

    this.activeNode = nodeId;
    const el = document.getElementById(`node-${nodeId}`);
    if (el) el.classList.add('pipeline-node--selected');

    // Populate detail panel
    this.detailTitle.textContent = nodeDef.detail.title;
    this.detailContent.innerHTML = `
      <p class="detail-subtitle">${nodeDef.detail.subtitle || ''}</p>
      ${nodeDef.detail.content}
    `;
    this.detailPanel.classList.add('detail-panel--open');
  }

  closePanel() {
    this.detailPanel.classList.remove('detail-panel--open');
    if (this.activeNode) {
      const el = document.getElementById(`node-${this.activeNode}`);
      if (el) el.classList.remove('pipeline-node--selected');
      this.activeNode = null;
    }
  }

  /* ── Run Pipeline ────────────────────────────────────────────── */

  runPipeline() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.runBtn.textContent = '⏸ Running...';
    this.runBtn.classList.add('toolbar-btn--active');
    this.statusIndicator.textContent = 'Running';
    this.statusIndicator.className = 'status-badge status--running';

    // Animate status changes through nodes in sequence
    const layerOrder = ['source', 'bronze', 'silver', 'gold', 'sink'];
    const allNodes = this.nodes;

    layerOrder.forEach((layer, layerIdx) => {
      setTimeout(() => {
        allNodes.filter(n => n.layer === layer || n.id === layer).forEach(n => {
          n.status = 'running';
          this.updateNodeStatus(n.id, 'running');
        });
      }, layerIdx * 600);

      setTimeout(() => {
        allNodes.filter(n => n.layer === layer || n.id === layer).forEach(n => {
          n.status = 'success';
          this.updateNodeStatus(n.id, 'success');
        });
      }, layerIdx * 600 + 400);
    });

    // Complete after all layers done
    setTimeout(() => {
      this.isRunning = false;
      this.runBtn.textContent = '▶ Run Pipeline';
      this.runBtn.classList.remove('toolbar-btn--active');
      this.statusIndicator.textContent = 'Succeeded';
      this.statusIndicator.className = 'status-badge status--success';
    }, layerOrder.length * 600 + 200);
  }

  updateNodeStatus(nodeId, status) {
    const el = document.getElementById(`node-${nodeId}`);
    if (!el) return;
    const statusEl = el.querySelector('.pipeline-node__status');
    if (statusEl) {
      statusEl.className = `pipeline-node__status status--${status}`;
    }
  }

  /* ── Initialization ──────────────────────────────────────────── */

  init() {
    this.render();

    // Run button
    this.runBtn.addEventListener('click', () => this.runPipeline());

    // Close panel button
    document.getElementById('btn-close-panel').addEventListener('click', () => this.closePanel());

    // Click on canvas background to deselect
    this.canvas.addEventListener('click', (e) => {
      if (e.target === this.canvas) this.closePanel();
    });

    // Escape key to close panel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closePanel();
    });

    // Handle window resize — re-render connections
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

// Boot
document.addEventListener('DOMContentLoaded', () => {
  window.pipeline = new PipelineEngine();
});
