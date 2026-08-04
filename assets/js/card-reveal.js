/* ==========================================================================
   Experience Card 3D Transform Reveal
   ========================================================================== */

class CardReveal {
  constructor() {
    this.cards = document.querySelectorAll('.card-reveal');
    this.observer = null;

    if (!this.cards.length) return;

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    this.cards.forEach((card, index) => {
      // Assign stagger delay class
      const delayClass = `card-reveal--delay-${Math.min(index + 1, 4)}`;
      card.classList.add(delayClass);

      this.observer.observe(card);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;

        // Reveal the card
        card.classList.add('card-reveal--visible');

        // After transition completes, clean up will-change
        card.addEventListener('transitionend', () => {
          card.classList.add('card-reveal--complete');
        }, { once: true });

        // Stop observing this card
        this.observer.unobserve(card);
      }
    });
  }

  /**
   * Reveal all cards instantly (used for fast-scroll / reduced motion).
   */
  static revealAll() {
    document.querySelectorAll('.card-reveal').forEach(card => {
      card.classList.add('card-reveal--visible', 'card-reveal--complete');
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new CardReveal());
} else {
  new CardReveal();
}

// Listen for reduced motion
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mq.matches) {
  document.addEventListener('DOMContentLoaded', () => CardReveal.revealAll());
}
