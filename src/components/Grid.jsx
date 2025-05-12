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
