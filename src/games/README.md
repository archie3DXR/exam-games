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

GameTemplate usage
==================
initState:  JS object describing mutable state
onKey(e, _, s): return newPartialState OR false
onTick(s):      same, called every 1s if defined
renderBoard(s, setState): JSX     <-- put Grid/Tower here
winCheck(s):    bool -> alert + addWin()

Common recipes
--------------
✓ Grid click   : on cell click call setState({...})
✓ Arrow move   : useKeyPress + dir vector mapping
✓ Stack puzzle : represent peg as array, shift/pop/push
✓ Memory flip  : board[i]={id,open,found}
✓ 2048         : board[4][4] ints, slide+merge then spawn
