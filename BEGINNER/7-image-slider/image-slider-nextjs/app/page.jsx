"use client";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">
        🖼️ Image Slider — Level 6 (Next.js + Vercel)
      </h1>
      <Slider />
      <footer className="mt-6 text-gray-600 text-sm text-center">
        <p>
          Tác giả:{" "}
          <a
            href="https://trung87.link"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            trung87.link
          </a>
        </p>
      </footer>
    </main>
  );
}
