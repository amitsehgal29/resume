/* ==========================================================================
   Navigation — Active Link Tracking
   ========================================================================== */

class NavTracker {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.links = document.querySelectorAll('.nav__link');
    if (!this.links.length) return;

    this.sections = [];
    this.links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const section = document.querySelector(href);
      if (section) {
        this.sections.push({ link, section });
      }
    });

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0, rootMargin: '-20% 0px -70% 0px' }
    );

    this.sections.forEach(({ section }) => observer.observe(section));

    // Smooth scroll for nav links (with offset for fixed nav)
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  handleIntersection(entries) {
    // Find the first visible section
    let activeHref = null;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeHref = `#${entry.target.id}`;
      }
    });

    // Update active link
    this.links.forEach(link => {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === activeHref);
    });
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new NavTracker());
} else {
  new NavTracker();
}
