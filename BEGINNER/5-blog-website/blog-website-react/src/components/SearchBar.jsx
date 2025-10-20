export default function SearchBar({ q, setQ }) {
  return (
    <div className="search">
      <input
        placeholder="Tìm bài viết (tiêu đề, tag, mô tả)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="button" onClick={() => setQ('')}>Xoá</button>
    </div>
  )
}
