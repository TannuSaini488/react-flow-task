import React, { useEffect, useState } from "react";

const STATIC_BLOCKS = [
  { id: "1", type: "blockA", label: "Block A" },
  { id: "2", type: "blockB", label: "Block B" },
];

export default function Sidebar() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setTimeout(() => setBlocks(STATIC_BLOCKS), 300);
  }, []);

  const onDragStart = (event, block) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(block));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h4>Drag Blocks</h4>
      {blocks.length === 0 && <div className="muted">Loading...</div>}
      {blocks.map((b) => (
        <div
          key={b.id}
          className={`palette-item ${b.type}`}
          draggable
          onDragStart={(e) => onDragStart(e, b)}
        >
          {b.label}
        </div>
      ))}
      <p className="hint">Right-click a node on canvas → "Hello World"</p>
    </aside>
  );
}
