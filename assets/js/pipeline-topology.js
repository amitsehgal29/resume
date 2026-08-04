/* ==========================================================================
   Pipeline Topology — SVG Animation Controller
   ========================================================================== */

class PipelineTopology {
  constructor() {
    this.svg = document.querySelector('.pipeline-topology-svg');
    if (!this.svg) return;

    this.nodes = this.svg.querySelectorAll('.pipeline-node-shape');
    this.edges = this.svg.querySelectorAll('.pipeline-edge');
    this.dataDots = this.svg.querySelectorAll('.pipeline-flow-dot');

    // Section to node mapping
    this.sections = {
      'hero': [],
      'bronze': [],
      'silver': [],
      'gold': [],
    };

    // Map nodes by data attribute
    this.nodes.forEach(node => {
      const zone = node.dataset.zone;
      if (zone && this.sections[zone]) {
        this.sections[zone].push(node);
      }
    });

    this.init();
  }

  init() {
    // Observe sections to highlight corresponding nodes
    const sectionObserver = new IntersectionObserver(
      (entries) => this.handleSectionChange(entries),
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-pipeline-zone]').forEach(section => {
      sectionObserver.observe(section);
    });

    // Initialize data dot animations
    this.initDataDots();
  }

  handleSectionChange(entries) {
    entries.forEach(entry => {
      const zone = entry.target.dataset.pipelineZone;
      if (!zone) return;

      if (entry.isIntersecting) {
        this.activateZone(zone);
      }
    });
  }

  activateZone(zone) {
    // Deactivate all nodes
    this.nodes.forEach(node => node.classList.remove('pipeline-node-shape--active'));

    // Activate nodes in current zone
    if (this.sections[zone]) {
      this.sections[zone].forEach(node => {
        node.classList.add('pipeline-node-shape--active');
      });
    }

    // Update edge styles
    this.edges.forEach(edge => {
      const edgeZone = edge.dataset.zone;
      if (edgeZone === zone) {
        edge.style.stroke = 'var(--color-brand)';
        edge.style.strokeWidth = '2';
        edge.style.opacity = '0.6';
      } else {
        edge.style.stroke = '';
        edge.style.strokeWidth = '';
        edge.style.opacity = '';
      }
    });
  }

  initDataDots() {
    // Stagger dot animation start times so they don't all sync
    this.dataDots.forEach((dot, i) => {
      dot.style.animationDelay = `${(i * 0.4) % 3}s`;
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PipelineTopology());
} else {
  new PipelineTopology();
}
