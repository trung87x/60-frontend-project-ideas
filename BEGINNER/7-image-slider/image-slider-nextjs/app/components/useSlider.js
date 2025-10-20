"use client";
import { useState, useEffect, useRef } from "react";

export function useSlider(totalSlides, delay = 3000) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, delay);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, delay, totalSlides]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  return { index, next, prev, onMouseEnter, onMouseLeave };
}
