/* ============================================================
   IslandBytes — Main JavaScript
   Handles: nav scroll state, IntersectionObserver reveals,
            scroll indicator visibility
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Navigation: add .scrolled class on scroll
     ---------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const scrollContainer = document.querySelector('.scroll-container') || window;

  function updateNav() {
    const scrollY = scrollContainer === window
      ? window.scrollY
      : scrollContainer.scrollTop;
    nav.classList.toggle('scrolled', scrollY > 20);
  }

  scrollContainer.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ----------------------------------------------------------
     Scroll Indicator: hide after user scrolls past hero
     ---------------------------------------------------------- */
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const heroSection = document.querySelector('.section--hero');

  if (scrollIndicator && heroSection) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        scrollIndicator.classList.toggle('hidden', !entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    heroObserver.observe(heroSection);
  }

  /* ----------------------------------------------------------
     Reveal Animations: IntersectionObserver on .reveal elements
     ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once revealed, stop observing to save resources
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     Hero: fire reveals immediately on load (no scroll needed)
     ---------------------------------------------------------- */
  const heroReveals = document.querySelectorAll('.section--hero .reveal');
  heroReveals.forEach((el) => {
    // Small timeout lets the browser paint first for a smoother load animation
    setTimeout(() => el.classList.add('visible'), 100);
  });

})();
