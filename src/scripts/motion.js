import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    return lenis;
  });
}

export const mm = gsap.matchMedia();

export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* -------------------------------------------------------
   Basic reveal
------------------------------------------------------- */

export function revealElements(
  selector = '[data-reveal]',
  options = {}
) {
  if (isReducedMotion()) return;

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const distance =
      element.dataset.revealDistance
        ? Number(element.dataset.revealDistance)
        : 35;

    const duration =
      element.dataset.revealDuration
        ? Number(element.dataset.revealDuration)
        : 1.2;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: distance,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
        ...options,
      }
    );
  });
}


/* -------------------------------------------------------
   Line reveal
------------------------------------------------------- */

export function revealLines(selector = '[data-reveal-line]') {
  if (isReducedMotion()) return;

  document.querySelectorAll(selector).forEach((line) => {
    gsap.fromTo(
      line,
      {
        scaleX: 0,
        transformOrigin: 'left center',
      },
      {
        scaleX: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });
}


/* -------------------------------------------------------
   Image reveal
------------------------------------------------------- */

export function revealImages(selector = '[data-reveal-image]') {
  if (isReducedMotion()) return;

  document.querySelectorAll(selector).forEach((image) => {
    const wrapper = image.parentElement;

    if (!wrapper) return;

    gsap.set(image, {
      scale: 1.08,
    });

    gsap.fromTo(
      wrapper,
      {
        clipPath: 'inset(12% 0% 12% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 78%',
          once: true,
        },
      }
    );

    gsap.to(image, {
      scale: 1,
      duration: 2.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 78%',
        once: true,
      },
    });
  });
}


/* -------------------------------------------------------
   Staggered children
------------------------------------------------------- */

export function revealStaggered(
  selector = '[data-reveal-stagger]'
) {
  if (isReducedMotion()) return;

  document.querySelectorAll(selector).forEach((group) => {
    const children = group.querySelectorAll('[data-reveal-item]');

    if (!children.length) return;

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 75%',
          once: true,
        },
      }
    );
  });
}


export { gsap, ScrollTrigger };