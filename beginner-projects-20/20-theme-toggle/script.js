const root = document.documentElement;
const k="theme";
function apply(v){ root.classList.toggle("dark", v==="dark"); }
apply(localStorage.getItem(k)||"light");
document.getElementById("toggle").onclick = ()=>{
  const cur = root.classList.contains("dark") ? "dark":"light";
  const next = cur==="dark"?"light":"dark";
  localStorage.setItem(k, next);
  apply(next);
};
