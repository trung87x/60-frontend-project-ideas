"use client";
import Image from "next/image";

export default function Slide({ src }) {
  return (
    <div className="min-w-full">
      <Image
        src={src}
        alt="Slide"
        width={800}
        height={450}
        className="object-cover h-[400px] w-full"
        priority
      />
    </div>
  );
}
