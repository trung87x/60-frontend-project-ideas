import React from "react";
export default function App() {
  const [name, setName] = React.useState("Trung Nguyen");
  const avatar = `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(
    name
  )}`;
  const html = `
<section style="font-family:system-ui;padding:24px">
  <img src="${avatar}" alt="avatar" width="96" height="96" style="border-radius:50%" />
  <h1>${name}</h1>
  <p>Front-end Developer</p>
</section>`;

  return (
    <div className="container">
      <h1>Portfolio Generator</h1>
      <input
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="card" style={{ marginTop: 12 }}>
        <iframe
          title="preview"
          style={{ width: "100%", height: 220, border: "none" }}
          srcDoc={html}
        />
      </div>
      <small>Avatar API: DiceBear (no key)</small>
    </div>
  );
}
