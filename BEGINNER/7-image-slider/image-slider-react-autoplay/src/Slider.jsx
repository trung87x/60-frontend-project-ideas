import React from "react";
import { useSlider } from "./useSlider";
import ArrowButton from "./ArrowButton";
import Slide from "./Slide";
import "./index.css";

const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg"];

export default function Slider() {
  const { index, next, prev, onMouseEnter, onMouseLeave } = useSlider(images.length, 3000);

  return (
    <div className="slider-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="slider" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((img, i) => (
          <Slide key={i} src={`images/${img}`} />
        ))}
      </div>
      <ArrowButton direction="prev" onClick={prev} />
      <ArrowButton direction="next" onClick={next} />
    </div>
  );
}
