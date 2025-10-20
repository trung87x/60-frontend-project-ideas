export default function Header({ onToggleTheme }) {
  return (
    <header className="header">
      <div className="header-inner container">
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <strong>📝 Blog React (Level 5 - React Query + CMS)</strong>
        </a>
        <nav className="nav">
          <a href="/">Trang chủ</a>
          <a href="/posts">Bài viết</a>
          <a href="/#about">Giới thiệu</a>
          <a href="/#contact">Liên hệ</a>
          <button className="button" onClick={onToggleTheme}>Dark/Light</button>
        </nav>
      </div>
    </header>
  )
}
