import React from "react";

export default function App() {
  const [msgs, setMsgs] = React.useState([]);
  const [text, setText] = React.useState("");
  const bcRef = React.useRef(null);

  React.useEffect(() => {
    // Tạo mới channel mỗi lần effect chạy (Strict Mode sẽ chạy 2 lần ở dev)
    const ch = new BroadcastChannel("chat");
    bcRef.current = ch;

    const onMessage = (e) => setMsgs((m) => [...m, e.data]);
    ch.addEventListener("message", onMessage);

    return () => {
      ch.removeEventListener("message", onMessage);
      try {
        ch.close();
      } catch {}
      bcRef.current = null;
    };
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const ch = bcRef.current; // luôn đọc từ ref
    const m = { id: Date.now(), user: "Me", text: text.trim() };

    setMsgs((x) => [...x, m]);
    setText("");

    // Chỉ gửi nếu channel đang mở
    if (ch) {
      try {
        ch.postMessage({ ...m, user: "Peer" });
      } catch {
        // Channel có thể đã đóng do Fast Refresh — bỏ qua hoặc tự tạo lại nếu muốn
        console.warn("BroadcastChannel is closed; skipping postMessage.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Chat Application (Realtime Mock)</h1>
      <div className="card" style={{ height: 300, overflow: "auto" }}>
        {msgs.map((m) => (
          <div key={m.id}>
            <b>{m.user}:</b> {m.text}
          </div>
        ))}
      </div>
      <form className="row" onSubmit={send}>
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tin nhắn…"
        />
        <button className="btn">Gửi</button>
      </form>
      <small>Realtime mock: BroadcastChannel (mở 2 tab để test).</small>
    </div>
  );
}
