let base=0, tId=null;
const timeEl = document.getElementById("time");
document.getElementById("start").onclick = ()=>{
  if(tId) return;
  base = Date.now() - base;
  tId = setInterval(()=>{
    const ms = Date.now() - base;
    const m = Math.floor(ms/60000).toString().padStart(2,'0');
    const s = Math.floor(ms%60000/1000).toString().padStart(2,'0');
    const d = Math.floor(ms%1000/100);
    timeEl.textContent = `${m}:${s}.${d}`;
  }, 100);
};
document.getElementById("pause").onclick = ()=>{
  if(tId){ clearInterval(tId); tId=null; base = Date.now() - base; }
};
document.getElementById("reset").onclick = ()=>{
  clearInterval(tId); tId=null; base=0; timeEl.textContent="00:00.0";
};
