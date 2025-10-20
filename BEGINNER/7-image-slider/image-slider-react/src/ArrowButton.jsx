import React from "react";
export default function ArrowButton({ direction, onClick }) {
  return (
    <button className={\`arrow \${direction}\`} onClick={onClick}>
      {direction === "prev" ? "❮" : "❯"}
    </button>
  );
}
