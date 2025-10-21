const sample = "Học lập trình cần sự kiên nhẫn và thực hành đều đặn mỗi ngày.";
let t=0, timer=null;
const text = document.getElementById("text");
const area = document.getElementById("area");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
function start(){ text.textContent = sample; area.value=""; t=0; timeEl.textContent=0; wpmEl.textContent=0; clearInterval(timer); timer=setInterval(()=>{ t++; timeEl.textContent=t; calc(); },1000); }
function calc(){
  const words = area.value.trim().split(/\s+/).filter(Boolean).length;
  const minutes = t/60;
  wpmEl.textContent = minutes>0 ? Math.round(words/minutes) : 0;
}
area.addEventListener("input", calc);
document.getElementById("restart").onclick = start;
start();
