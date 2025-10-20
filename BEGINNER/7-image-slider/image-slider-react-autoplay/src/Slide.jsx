import React from "react";
export default function Slide({ src }) {
  return (
    <div className="slide">
      <img src={src} alt="slide" />
    </div>
  );
}
