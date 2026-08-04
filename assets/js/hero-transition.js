/* ==========================================================================
   Hero → Nav Spring Scroll Transition
   ========================================================================== */

import { Spring1D } from './spring.js';

class HeroTransition {
  constructor() {
    this.heroHeadline = document.querySelector('.hero__headline');
    this.heroSubtitle = document.querySelector('.hero__subtitle');
    this.heroMeta = document.querySelector('.hero__meta');
    this.heroScrollHint = document.querySelector('.hero__scroll-hint');
    this.nav = document.querySelector('.nav');
    this.navLogo = document.querySelector('.nav__logo');

    if (!this.heroHeadline) return;

    // Spring parameters from design tokens
    this.stiffness = 120;
    this.damping = 20;

    // Springs for each animated property
    this.springFontSize = new Spring1D(this.stiffness, this.damping);
    this.springY = new Spring1D(this.stiffness, this.damping);
    this.springScale = new Spring1D(this.stiffness, this.damping);
    this.springNavOpacity = new Spring1D(this.stiffness * 0.8, this.damping);

    // Store initial values
    this.initialFontSize = parseFloat(getComputedStyle(this.heroHeadline).fontSize);
    this.targetFontSize = 22; // px — nav logo size
    this.scrollThreshold = 350; // px of scroll to complete transition

    this.animating = false;
    this.lastScrollY = 0;
    this.currentSpringValue = 0; // 0 = hero mode, 1 = nav mode

    this.init();
  }

  init() {
    // Initialize spring to hero state
    this.springFontSize.value = 0;
    this.springFontSize.target = 0;
    this.springY.snap();
    this.springScale.snap();
    this.springNavOpacity.snap();

    // Use passive scroll listener
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Initial update
    this.update(0);
  }

  onScroll() {
    const scrollY = window.scrollY;
    this.lastScrollY = scrollY;

    // Calculate raw progress based on scroll
    const rawProgress = Math.min(Math.max(scrollY / this.scrollThreshold, 0), 1);

    // Set spring target
    this.springFontSize.setTarget(rawProgress);
    this.springY.setTarget(rawProgress);
    this.springScale.setTarget(rawProgress);
    this.springNavOpacity.setTarget(rawProgress);

    if (!this.animating) {
      this.animating = true;
      requestAnimationFrame(() => this.animate());
    }
  }

  animate() {
    const fontSizeProgress = this.springFontSize.step();
    const yProgress = this.springY.step();
    const scaleProgress = this.springScale.step();
    const navProgress = this.springNavOpacity.step();

    this.applyTransforms(fontSizeProgress, yProgress, scaleProgress, navProgress);

    // Update nav state
    this.updateNavState(navProgress);

    // Check if settled
    const settled = this.springFontSize.isSettled()
                 && this.springY.isSettled()
                 && this.springScale.isSettled()
                 && this.springNavOpacity.isSettled();

    if (settled && this.lastScrollY === window.scrollY) {
      this.animating = false;
      return;
    }

    requestAnimationFrame(() => this.animate());
  }

  applyTransforms(fontSizeP, yP, scaleP, navP) {
    // Interpolate font size
    const fontSize = this.initialFontSize + (this.targetFontSize - this.initialFontSize) * fontSizeP;
    this.heroHeadline.style.fontSize = fontSize + 'px';

    // Interpolate scale (subtle shrink) + upward drift toward nav position
    const scale = 1 - 0.02 * scaleP;
    const translateY = -yP * 20; // drift up slightly to bridge toward nav
    this.heroHeadline.style.transform = `scale(${scale}) translateY(${translateY}px)`;

    // Fade out subtitle and meta
    if (this.heroSubtitle) {
      this.heroSubtitle.style.opacity = 1 - navP;
    }
    if (this.heroMeta) {
      this.heroMeta.style.opacity = 1 - navP;
    }
    if (this.heroScrollHint) {
      this.heroScrollHint.style.opacity = 1 - navP;
    }

    // Nav logo visibility — show when transition is mostly complete
    if (this.navLogo) {
      const logoOpacity = Math.max(0, (navP - 0.5) * 2);
      this.navLogo.style.opacity = logoOpacity;
    }

    this.currentSpringValue = navP;
  }

  updateNavState(progress) {
    if (progress > 0.9) {
      this.nav.classList.add('nav--scrolled');
    } else {
      this.nav.classList.remove('nav--scrolled');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new HeroTransition());
} else {
  new HeroTransition();
}
