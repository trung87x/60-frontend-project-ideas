import React from 'react'
import Header from './components/Header.jsx'
import PostCard from './components/PostCard.jsx'
import SearchBar from './components/SearchBar.jsx'
import Footer from './components/Footer.jsx'
import post1 from './assets/post1.jpg'
import post2 from './assets/post2.jpg'
import post3 from './assets/post3.jpg'

const POSTS = [
  { id: 1, title: 'Hành trình học React từ con số 0', excerpt: 'Tư duy component, state, props...', date: '2025-10-20', cover: post1, tag: 'React' },
  { id: 2, title: 'TailwindCSS có gì đặc biệt?', excerpt: 'Utility-first & tốc độ dựng UI', date: '2025-10-18', cover: post2, tag: 'Tailwind' },
  { id: 3, title: 'Typography cho Blog', excerpt: 'Measure, line-height, contrast', date: '2025-10-12', cover: post3, tag: 'Design' },
]

const THEME_KEY = 'theme'

function useTheme() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem(THEME_KEY) || 'dark')
  React.useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  return { theme, toggle }
}

export default function App() {
  const { toggle } = useTheme()
  const [q, setQ] = React.useState('')

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return POSTS
    return POSTS.filter(p => (p.title + p.excerpt + p.tag).toLowerCase().includes(s))
  }, [q])

  return (
    <>
      <Header onToggleTheme={toggle} />
      <main className="container">
        <section className="hero">
          <h1>Blog Website — Level 3 (React + Vite)</h1>
          <p>Component-based UI, state & props, dark mode, tìm kiếm — chưa có router/API.</p>
        </section>
        <SearchBar q={q} setQ={setQ} />
        <section id="posts" style={{ paddingTop: 0 }}>
          <h2 style={{ margin: '8px 0 14px' }}>Bài viết nổi bật</h2>
          <div className="grid">
            {filtered.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        </section>
        <section id="about" style={{ marginTop: 24 }}>
          <h2>Giới thiệu</h2>
          <p>Tôi là <strong>trung87</strong>, yêu thích React, Tailwind và hệ sinh thái học tập sáng tạo.</p>
        </section>
        <section id="contact" style={{ marginTop: 24 }}>
          <h2>Liên hệ</h2>
          <p>Email: contact@trung87.link</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
