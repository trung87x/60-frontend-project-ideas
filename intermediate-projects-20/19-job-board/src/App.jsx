import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function App() {
  const [q, setQ] = React.useState("frontend");
  const { data, isLoading } = useQuery({
    queryKey: ["jobs", q],
    queryFn: async () =>
      (
        await axios.get("https://remotive.com/api/remote-jobs", {
          params: { search: q },
        })
      ).data,
  });

  return (
    <div className="container">
      <h1>Job Board</h1>
      <input
        className="input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Từ khóa…"
      />
      <div className="grid" style={{ marginTop: 12 }}>
        {isLoading ? (
          <small>Đang tải…</small>
        ) : (
          (data?.jobs || []).slice(0, 30).map((j) => (
            <article className="card" key={j.id}>
              <h2>{j.title}</h2>
              <small>
                {j.company_name} • {j.job_type}
              </small>
              <div>
                <a className="btn" href={j.url} target="_blank">
                  Xem
                </a>
              </div>
            </article>
          ))
        )}
      </div>
      <small>API: remotive.com</small>
    </div>
  );
}
