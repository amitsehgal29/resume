/* ==========================================================================
   Magnetic Contact Button — Dual-Spring Hover Effect
   ========================================================================== */

import { Spring2D } from './spring.js';

class MagneticButton {
  constructor() {
    this.button = document.querySelector('.magnetic-btn');
    if (!this.button) return;

    this.bgLayer = this.button;
    this.textLayer = this.button.querySelector('.magnetic-btn__text');

    // Spring instances
    this.bgSpring = new Spring2D(150, 15);  // Tight, responsive
    this.textSpring = new Spring2D(80, 18); // Looser = parallax depth

    this.radius = 30; // Magnetic pull radius in px
    this.maxBgDisplacement = 15;
    this.maxTextDisplacement = 8;

    this.hovering = false;
    this.animating = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.btnCenterX = 0;
    this.btnCenterY = 0;

    this.init();
  }

  init() {
    this.button.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.button.addEventListener('mouseenter', () => { this.hovering = true; this.startLoop(); });
    this.button.addEventListener('mouseleave', () => this.onMouseLeave());

    // Recalculate center on scroll/resize
    window.addEventListener('scroll', () => this.updateCenter(), { passive: true });
    window.addEventListener('resize', () => this.updateCenter(), { passive: true });
    this.updateCenter();
  }

  updateCenter() {
    const rect = this.button.getBoundingClientRect();
    this.btnCenterX = rect.left + rect.width / 2;
    this.btnCenterY = rect.top + rect.height / 2;
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.updateCenter();
    this.calcTargets();
  }

  calcTargets() {
    const dx = this.mouseX - this.btnCenterX;
    const dy = this.mouseY - this.btnCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < this.radius && this.hovering) {
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);
      const pull = (this.radius - dist) / this.radius; // 0 at edge, 1 at center

      this.bgSpring.setTarget(nx * pull * this.maxBgDisplacement, ny * pull * this.maxBgDisplacement);
      this.textSpring.setTarget(nx * pull * this.maxTextDisplacement, ny * pull * this.maxTextDisplacement);
    } else if (!this.hovering) {
      // Snap back to origin
      this.bgSpring.setTarget(0, 0);
      this.textSpring.setTarget(0, 0);
    }
  }

  onMouseLeave() {
    this.hovering = false;
    this.bgSpring.setTarget(0, 0);
    this.textSpring.setTarget(0, 0);
  }

  startLoop() {
    if (this.animating) return;
    this.animating = true;
    requestAnimationFrame(() => this.loop());
  }

  loop() {
    if (!this.hovering) {
      this.calcTargets(); // Let springs settle to origin
    }

    const bg = this.bgSpring.step();
    const text = this.textSpring.step();

    // Apply transforms via GPU-composited properties
    this.bgLayer.style.transform = `translate3d(${bg.x}px, ${bg.y}px, 0)`;
    if (this.textLayer) {
      this.textLayer.style.transform = `translate3d(${text.x}px, ${text.y}px, 0)`;
    }

    // Update shadow offset for realistic lighting
    const shadowX = bg.x * 0.2;
    const shadowY = bg.y * 0.2;
    this.bgLayer.style.boxShadow = `${shadowX}px ${shadowY}px 24px rgba(255, 54, 33, 0.35)`;

    // Check if settled
    const settled = this.bgSpring.isSettled() && this.textSpring.isSettled();

    if (settled && !this.hovering) {
      this.animating = false;
      return;
    }

    requestAnimationFrame(() => this.loop());
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new MagneticButton());
} else {
  new MagneticButton();
}
