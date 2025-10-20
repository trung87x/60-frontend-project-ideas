import React, { useState } from "react";
import ArrowButton from "./ArrowButton";
import Slide from "./Slide";
import "./index.css";
const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg"];
export default function Slider() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  return (
    <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => <Slide key={i} src={`images/${img}`} />)}
      </div>
      <ArrowButton direction="prev" onClick={prevSlide} />
      <ArrowButton direction="next" onClick={nextSlide} />
    </div>
  );
}
