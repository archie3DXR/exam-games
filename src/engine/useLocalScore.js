import { useEffect, useState } from 'react';

export const useLocalScore = () => {
  const [wins, setWins] = useState(() => {
    const cached = localStorage.getItem('wins');
    return cached ? Number(cached) : null;        // null triggers fetch
  });

  useEffect(() => {
    if (wins === null) {
      fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json')
        .then((r) => r.json())
        .then(({ score }) => setWins(score))
        .catch(() => setWins(0));
    }
  }, [wins]);

  useEffect(() => {
    if (wins !== null) localStorage.setItem('wins', wins);
  }, [wins]);

  return {
    wins,
    addWin: () => setWins((w) => w + 1),
    resetWins: () => setWins(0),
  };
};
