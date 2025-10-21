import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function App() {
  const [q, setQ] = React.useState("lofi");
  const { data, isLoading } = useQuery({
    queryKey: ["music", q],
    queryFn: async () =>
      (
        await axios.get("https://itunes.apple.com/search", {
          params: { term: q, media: "music", limit: 15 },
        })
      ).data,
  });
  const [idx, setIdx] = React.useState(0);
  const list = data?.results || [];
  const current = list[idx];

  return (
    <div className="container">
      <h1>Music Streaming Mini</h1>
      <input
        className="input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm bài hát…"
      />
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        {isLoading ? (
          <small>Đang tải…</small>
        ) : (
          list.map((t, i) => (
            <article
              className="card"
              key={t.trackId}
              onClick={() => setIdx(i)}
              style={{ cursor: "pointer" }}
            >
              <img src={t.artworkUrl100} alt={t.trackName} />
              <h2>{t.trackName}</h2>
              <small>{t.artistName}</small>
            </article>
          ))
        )}
      </div>
      {current && (
        <div className="card" style={{ marginTop: 12 }}>
          <b>Đang phát:</b> {current.trackName} — {current.artistName}
          <audio
            controls
            src={current.previewUrl}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
      )}
    </div>
  );
}
