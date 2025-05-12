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
