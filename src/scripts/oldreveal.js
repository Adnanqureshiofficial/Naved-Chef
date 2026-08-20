// Toggles `.is-visible` on any [data-reveal] element once it enters the
// viewport. CSS transitions do the actual animating (see global.css).
// [data-reveal-group] staggers its direct [data-reveal] children.

function initReveal() {
  const groups = document.querySelectorAll('[data-reveal-group]');
  groups.forEach((group) => {
    const items = group.querySelectorAll(':scope > [data-reveal]');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 90}ms`;
    });
  });

  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

document.addEventListener('astro:page-load', initReveal);
initReveal();