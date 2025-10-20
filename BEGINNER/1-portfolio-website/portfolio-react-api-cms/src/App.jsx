import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Blog from "./pages/Blog.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import Contact from "./pages/Contact.jsx";
import { useTheme, ThemeProvider } from "./services/theme.jsx";

function NavbarInner() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur bg-white/70 dark:bg-slate-950/70">
      <div className="container-std h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-wide">
          trung87
        </Link>
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/projects" className="px-3 py-1.5 rounded-full">
            Dự án
          </NavLink>
          <NavLink to="/blog" className="px-3 py-1.5 rounded-full">
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            className="px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          >
            Liên hệ
          </NavLink>
        </nav>
        <button
          onClick={toggle}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-700"
          aria-label="Đổi theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-dvh flex flex-col">
        <NavbarInner />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:name" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="py-8 border-t border-slate-200 dark:border-slate-800">
          <div className="container-std flex items-center justify-between">
            <p>© 2025 • Tên của bạn</p>
            <a href="#root" className="btn">
              Lên đầu ↑
            </a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
