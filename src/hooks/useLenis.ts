import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

let globalLenis: Lenis | null = null;

export function stopLenis() {
  if (globalLenis) {
    globalLenis.stop();
  }
}

export function startLenis() {
  if (globalLenis) {
    globalLenis.start();
  }
}

export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Keep native scroll on touch devices or if reduced motion is enabled
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    globalLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, [reducedMotion]);
}
