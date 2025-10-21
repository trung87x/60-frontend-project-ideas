import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function App() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=20"))
        .data,
  });
  const [q, setQ] = React.useState("");

  const list = (posts || []).filter(
    (p) => p.title.includes(q) || p.body.includes(q)
  );

  return (
    <div className="container">
      <h1>Blog CMS (Feed)</h1>
      <input
        className="input"
        placeholder="Tìm kiếm tiêu đề/nội dung…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="grid" style={{ marginTop: 12 }}>
        {isLoading ? (
          <small>Đang tải…</small>
        ) : (
          list.map((p) => (
            <article className="card" key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
