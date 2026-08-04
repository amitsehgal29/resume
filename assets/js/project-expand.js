/* ==========================================================================
   Project Sticky Scroll-Lock Section
   ========================================================================== */

class ProjectExpand {
  constructor() {
    this.wrapper = document.querySelector('.project-expand-wrapper');
    if (!this.wrapper) return;

    this.stickyChild = this.wrapper.querySelector('.project-expand');
    this.bg = this.wrapper.querySelector('.project-expand__bg');
    this.overlay = this.wrapper.querySelector('.project-expand__overlay');
    this.title = this.wrapper.querySelector('.project-expand__title');
    this.desc = this.wrapper.querySelector('.project-expand__desc');
    this.stack = this.wrapper.querySelector('.project-expand__stack');
    this.techTags = this.wrapper.querySelectorAll('.project-expand__stack .tag');

    this.viewportHeight = window.innerHeight;
    this.progress = 0;
    this.lastProgress = 0;
    this.isComplete = false;

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    window.addEventListener('resize', () => {
      this.viewportHeight = window.innerHeight;
    });

    // Set initial states
    if (this.bg) {
      this.bg.style.transform = 'scale(0.3)';
      this.bg.style.borderRadius = 'var(--radius-lg)';
    }
    if (this.overlay) {
      this.overlay.style.opacity = '0';
    }

    // Set staggered fade targets on text elements
    [this.title, this.desc, ...this.techTags].forEach(el => {
      if (el) el.style.opacity = '0';
    });
  }

  onScroll() {
    const rect = this.wrapper.getBoundingClientRect();
    const wrapperHeight = this.wrapper.offsetHeight;

    // Calculate progress through the wrapper
    // 0 = wrapper top at viewport bottom, 1 = wrapper bottom at viewport bottom
    this.progress = Math.max(0, Math.min(1,
      (-rect.top) / (wrapperHeight - this.viewportHeight)
    ));

    // Skip if no change
    if (Math.abs(this.progress - this.lastProgress) < 0.001) return;
    this.lastProgress = this.progress;

    this.update(this.progress);
  }

  update(progress) {
    // Phase 1 (0 - 0.35): Card grid view
    // Phase 2 (0.35 - 0.65): Card expands to full screen
    // Phase 3 (0.65 - 1.0): Content overlay fades in

    const expansionProgress = this.mapProgress(progress, 0.35, 0.65);
    const overlayProgress = this.mapProgress(progress, 0.65, 1.0);

    this.updateExpansion(expansionProgress);
    this.updateOverlay(overlayProgress);
  }

  /**
   * Map progress through a specific phase range to 0-1.
   */
  mapProgress(progress, phaseStart, phaseEnd) {
    return Math.max(0, Math.min(1,
      (progress - phaseStart) / (phaseEnd - phaseStart)
    ));
  }

  updateExpansion(p) {
    if (!this.bg) return;

    // Scale from card size (0.3) to full screen (1.0)
    const scale = 0.3 + p * 0.7;
    // Border radius from card (12px) to full (0px)
    const borderRadius = (1 - p) * 12;

    // Use the design-token ease-expand curve: cubic-bezier(0.33, 1, 0.68, 1)
    // We approximate it by applying easing to the progress
    const easedP = this.easeOutExpo(p);

    const easedScale = 0.3 + easedP * 0.7;
    const easedRadius = (1 - easedP) * 12;

    this.bg.style.transform = `scale(${easedScale})`;
    this.bg.style.borderRadius = `${easedRadius}px`;
  }

  updateOverlay(p) {
    if (!this.overlay) return;

    this.overlay.style.opacity = p;

    // Staggered text reveals
    if (this.title) {
      this.title.style.opacity = this.mapProgress(p, 0, 0.35);
      this.title.style.transform = `translateY(${(1 - this.mapProgress(p, 0, 0.35)) * 20}px)`;
      this.title.style.transition = 'opacity 200ms ease, transform 300ms var(--ease-reveal)';
    }

    if (this.desc) {
      const dp = this.mapProgress(p, 0.15, 0.55);
      this.desc.style.opacity = dp;
      this.desc.style.transform = `translateY(${(1 - dp) * 16}px)`;
      this.desc.style.transition = 'opacity 200ms ease, transform 300ms var(--ease-reveal)';
    }

    // Tech tags stagger
    this.techTags.forEach((tag, i) => {
      const staggerStart = 0.3 + i * 0.08;
      const tp = this.mapProgress(p, staggerStart, staggerStart + 0.25);
      tag.style.opacity = tp;
      tag.style.transform = `translateY(${(1 - tp) * 12}px)`;
      tag.style.transition = 'opacity 150ms ease, transform 250ms var(--ease-reveal)';
    });
  }

  easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ProjectExpand());
} else {
  new ProjectExpand();
}
