import {
  initLenis,
  revealElements,
  revealLines,
  revealImages,
  revealStaggered,
} from './motion.js';

async function init() {
  await initLenis();

  revealElements();
  revealLines();
  revealImages();
  revealStaggered();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}