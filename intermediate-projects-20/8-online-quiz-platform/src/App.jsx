import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = "https://opentdb.com/api.php?amount=10&type=multiple";

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => (await axios.get(API)).data.results,
    staleTime: 60_000,
  });

  const [i, setI] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // Luôn tính q theo data (có thể null ở lần đầu)
  const q = data?.[i] ?? null;

  // Luôn gọi useMemo; nếu chưa có q thì trả về []
  const options = React.useMemo(() => {
    if (!q) return [];
    const arr = [...q.incorrect_answers, q.correct_answer];
    return arr.sort(() => Math.random() - 0.5);
  }, [i, q]);

  const choose = (a) => {
    if (!q) return;
    if (a === q.correct_answer) setScore((s) => s + 1);
    setI((x) => (x + 1 < (data?.length ?? 0) ? x + 1 : x));
  };

  // Sau khi đã gọi đủ Hooks, mới return theo điều kiện
  if (isLoading || !q) {
    return <div className="container">Đang tải đề…</div>;
  }

  return (
    <div className="container">
      <h1>Online Quiz Platform</h1>
      <div className="card">
        <div dangerouslySetInnerHTML={{ __html: q.question }} />
        <div className="grid" style={{ marginTop: 12 }}>
          {options.map((o, idx) => (
            <button
              className="btn"
              key={idx}
              onClick={() => choose(o)}
              dangerouslySetInnerHTML={{ __html: o }}
            />
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <b>Điểm:</b> {score}/{data.length}
        </div>
      </div>
    </div>
  );
}
