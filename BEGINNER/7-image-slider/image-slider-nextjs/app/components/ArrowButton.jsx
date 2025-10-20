"use client";
export default function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${
        direction === "prev" ? "left-3" : "right-3"
      } top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-2xl shadow`}
    >
      {direction === "prev" ? "❮" : "❯"}
    </button>
  );
}
