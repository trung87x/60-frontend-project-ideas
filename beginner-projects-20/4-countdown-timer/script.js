let target = null, tId = null;
const view = document.getElementById("view");
document.getElementById("startBtn").onclick = () => {
  const v = document.getElementById("dateInput").value;
  if (!v) return alert("Chọn thời điểm!");
  target = new Date(v).getTime();
  if (tId) clearInterval(tId);
  tId = setInterval(tick, 250);
  tick();
};
function tick(){
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const h = String(Math.floor(diff/3600000)).padStart(2,'0');
  const m = String(Math.floor(diff%3600000/60000)).padStart(2,'0');
  const s = String(Math.floor(diff%60000/1000)).padStart(2,'0');
  view.textContent = `${h}:${m}:${s}`;
  if (diff<=0){ clearInterval(tId); alert("Hết giờ!"); }
}
