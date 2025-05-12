import { useEffect, useRef } from 'react';
// Interval or RAF loop    ms = 'raf' | number
export const useGameLoop = (cb, ms = 1000) => {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; });
  useEffect(() => {
    if (!cb) return () => {};
    if (ms === 'raf') {
      let id;
      const loop = (t) => { saved.current(t); id = requestAnimationFrame(loop); };
      id = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(id);
    }
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [ms, cb]);
};
