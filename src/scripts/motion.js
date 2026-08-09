// Shared GSAP setup. Import this once per island that needs animation.
// Wraps everything in gsap.matchMedia() so reduced-motion users and
// mobile (where the pinned horizontal scroll is disabled) get a clean,
// simple fallback instead of the full effect.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  // Lenis is optional/progressive — page works fine with native scroll if it fails to load.
  return import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    return lenis;
  });
}

// mm.add() conditions used across islands:
//   isDesktop         -> min-width: 769px AND no reduced motion
//   isReducedMotion    -> prefers-reduced-motion: reduce
export const mm = gsap.matchMedia();

export { gsap, ScrollTrigger };
