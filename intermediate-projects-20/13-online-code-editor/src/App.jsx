import React from "react";

export default function App() {
  const [html, setHtml] = React.useState("<h1>Hello</h1>");
  const [css, setCss] = React.useState("h1{color:tomato}");
  const [js, setJs] = React.useState('console.log("Hi")');

  React.useEffect(() => {
    const raw = import.meta.env.VITE_GIST_RAW_URL;
    if (raw) {
      fetch(raw)
        .then((r) => r.text())
        .then((t) => setHtml(t))
        .catch(() => {});
    }
  }, []);

  const src = `
    <html>
      <head><style>${css}</style></head>
      <body>${html}<script>${js}<\/script></body>
    </html>
  `;

  return (
    <div className="container">
      <h1>Online Code Editor</h1>
      <div className="row">
        <textarea
          className="input"
          style={{ width: "33%", height: 200 }}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <textarea
          className="input"
          style={{ width: "33%", height: 200 }}
          value={css}
          onChange={(e) => setCss(e.target.value)}
        />
        <textarea
          className="input"
          style={{ width: "33%", height: 200 }}
          value={js}
          onChange={(e) => setJs(e.target.value)}
        />
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <iframe
          title="preview"
          style={{ width: "100%", height: 300, border: "none" }}
          srcDoc={src}
        />
      </div>
    </div>
  );
}
