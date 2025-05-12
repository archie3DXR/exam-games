#!/usr/bin/env bash
# ────────────────────────────────────────────────────────────────
#  scaffold.sh – COMP6080 exam helper
#  Usage:  bash scaffold.sh
#          (run at repo root; it overwrites only the files below)
# ────────────────────────────────────────────────────────────────
set -euo pipefail

mkdir -p src/{components,engine,games}

# ---------- main entry ----------
cat > src/main.jsx <<'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
EOF

# ---------- app & layout ----------
cat > src/app.jsx <<'EOF'
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';      // make later
// Placeholder pages until you add real games
const Stub = ({ name }) => <h2 className="text-xl">{name} coming soon…</h2>;

export default function App () {
  return (
    <>
      <Header />
      <main className="pt-[80px] pb-[50px] min-h-screen
                       flex flex-col items-center justify-center">
        <Routes>
          <Route path="/"     element={<Home />} />
          <Route path="/g1"   element={<Stub name="Game 1" />} />
          <Route path="/g2"   element={<Stub name="Game 2" />} />
          <Route path="/g3"   element={<Stub name="Game 3" />} />
          <Route path="*"     element={<h1>404</h1>} />
        </Routes>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
EOF

# ---------- components ----------
cat > src/components/Header.jsx <<'EOF'
import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/',   lg: 'Home', sm: 'H' },
  { to: '/g1', lg: 'G1',   sm: '1' },
  { to: '/g2', lg: 'G2',   sm: '2' },
  { to: '/g3', lg: 'G3',   sm: '3' },
];

export default function Header () {
  return (
    <header className="fixed top-0 w-full h-20 bg-[#eeeeee]
                       flex items-center justify-between z-10">
      <img src="/logo.png"
           alt="logo"
           className="w-[50px] h-[50px] m-[15px]" />
      <nav className="mr-6 space-x-2 text-lg">
        {links.map(({ to, lg, sm }) => (
          <NavLink key={to} to={to} className="hover:underline">
            {({ isActive }) => (
              <span className={isActive ? 'font-bold' : ''}>
                <span className="hidden lg:inline">{lg}</span>
                <span className="lg:hidden">{sm}</span>
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
EOF

cat > src/components/Footer.jsx <<'EOF'
export default () => (
  <footer className="h-[50px] w-full bg-[#999999]
                     flex items-center justify-center">
    <span className="text-white text-sm">COMP6080 Exam Scaffold</span>
  </footer>
);
EOF

cat > src/components/GameStats.jsx <<'EOF'
import React from 'react';
import { useLocalScore } from '../engine/useLocalScore';

export default function GameStats () {
  const { wins, resetWins } = useLocalScore();
  return (
    <p className="text-center">
      <span className="text-red-600 text-2xl">Games&nbsp;won:&nbsp;{wins}</span>{' '}
      <button onClick={resetWins} className="underline">(reset)</button>
    </p>
  );
}
EOF

cat > src/components/Grid.jsx <<'EOF'
import React from 'react';
// Generic grid renderer: supply rows×cols data + cell render fn
export default function Grid ({ rows, cols, data, size = 'auto', render }) {
  return (
    <div className="grid gap-0.5"
         style={{ gridTemplateColumns: `repeat(${cols}, ${size})` }}>
      {data.flat().map((cell, i) => render(cell, i))}
    </div>
  );
}
EOF

cat > src/components/Tower.jsx <<'EOF'
import React from 'react';   // Optional stack/peg renderer (Hanoi etc.)
export default function Tower ({ discs = [], held = null }) {
  const pegH = discs.length + (held ? 1 : 0) || 1;
  return (
    <div className="flex flex-col-reverse items-center
                    w-24 border h-40 space-y-0.5">
      {[...discs].map((d) => (
        <div key={d}
             className="bg-blue-500 h-4"
             style={{ width: `${20 + d * 15}%` }} />
      ))}
    </div>
  );
}
EOF

# ---------- engine ----------
cat > src/engine/useLocalScore.js <<'EOF'
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
EOF

cat > src/engine/useGameLoop.js <<'EOF'
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
EOF

cat > src/engine/useKeyPress.js <<'EOF'
import { useEffect } from 'react';
export const useKeyPress = (handler) => {
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
};
EOF

# ---------- games cheat-sheet ----------
cat > src/games/README.md <<'EOF'
# Exam Game Recipes (Cheat-Sheet)
import makeGame from './GameTemplate'; // supply below
import Grid from '../components/Grid';

export default makeGame({
title: 'My Game',
initState: { … },
onKey: (e, helpers, s) => { … return newPartialState || false; },
onTick: (s) => { … return newPartialState; }, // optional
renderBoard: (s, setState) => <Grid … />,
winCheck: (s) => boolean,
});

Helpers you already have:  
* `useLocalScore` → `addWin()` automatically wired in template  
* `useGameLoop`   (time-based)  
* `useKeyPress`   (arrow / WASD / digits)  
* `Grid` / `Tower` UI components
EOF

echo "Scaffold complete ✅   Now run:  npm run dev"
