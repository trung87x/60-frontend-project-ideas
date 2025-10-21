import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function App() {
  const [cols, setCols] = React.useState({
    todo: [],
    doing: [],
    done: [],
  });
  const [text, setText] = React.useState("");

  const sync = useMutation({
    mutationFn: (payload) =>
      axios.post("https://jsonplaceholder.typicode.com/todos", payload),
  });

  const add = (e) => {
    e.preventDefault();
    if (!text) return;
    setCols((c) => ({ ...c, todo: [...c.todo, { id: Date.now(), text }] }));
    setText("");
    sync.mutate({ title: text, completed: false });
  };
  const move = (from, to, id) => {
    setCols((c) => {
      const item = c[from].find((x) => x.id === id);
      return {
        ...c,
        [from]: c[from].filter((x) => x.id !== id),
        [to]: [...c[to], item],
      };
    });
  };

  const Col = ({ name, label }) => (
    <div className="card" style={{ flex: 1, minWidth: 280 }}>
      <h2>{label}</h2>
      {cols[name].map((i) => (
        <div
          key={i.id}
          className="row"
          style={{ justifyContent: "space-between" }}
        >
          <div>{i.text}</div>
          <div className="row">
            {name !== "todo" && (
              <button className="btn" onClick={() => move(name, "todo", i.id)}>
                ←
              </button>
            )}
            {name !== "doing" && (
              <button className="btn" onClick={() => move(name, "doing", i.id)}>
                •
              </button>
            )}
            {name !== "done" && (
              <button className="btn" onClick={() => move(name, "done", i.id)}>
                →
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <h1>Task Management (Kanban)</h1>
      <form className="row" onSubmit={add}>
        <input
          className="input"
          placeholder="Việc cần làm…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn">Thêm</button>
      </form>
      <div className="row" style={{ marginTop: 12 }}>
        <Col name="todo" label="To do" />
        <Col name="doing" label="Doing" />
        <Col name="done" label="Done" />
      </div>
      <small>Sync demo: POST đến jsonplaceholder.typicode.com/todos</small>
    </div>
  );
}
