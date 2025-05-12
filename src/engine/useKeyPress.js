import { useEffect } from 'react';
export const useKeyPress = (handler) => {
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
};
