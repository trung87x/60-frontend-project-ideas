"use client";
import { useSlider } from "./useSlider";
import ArrowButton from "./ArrowButton";
import Slide from "./Slide";

const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg", "slide4.jpg"];

export default function Slider() {
  const { index, next, prev, onMouseEnter, onMouseLeave } = useSlider(images.length, 3000);

  return (
    <div
      className="relative w-11/12 md:w-3/4 lg:w-1/2 overflow-hidden rounded-2xl shadow-xl"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <Slide key={i} src={`/${img}`} />
        ))}
      </div>
      <ArrowButton direction="prev" onClick={prev} />
      <ArrowButton direction="next" onClick={next} />
    </div>
  );
}
