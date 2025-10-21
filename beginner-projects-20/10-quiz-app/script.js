const qs = [
  { q: "HTML là viết tắt của?", a:["HyperText Markup Language","HighText Machine Language","Home Tool Markup Language"], i:0 },
  { q: "CSS dùng để?", a:["Xử lý logic","Định dạng giao diện","Lưu trữ dữ liệu"], i:1 },
  { q: "JS chạy ở đâu?", a:["Browser và Node.js","Chỉ browser","Chỉ server"], i:0 },
];
let idx=0, score=0;
const box=document.getElementById("box");
render();
function render(){
  if(idx>=qs.length){ 
    box.innerHTML = `<p class="text-xl">Điểm: <b>${score}/${qs.length}</b></p>
    <button class="mt-4 px-4 py-2 rounded border" onclick="restart()">Làm lại</button>`;
    return;
  }
  const cur=qs[idx];
  box.innerHTML = `
    <p class="font-semibold">${cur.q}</p>
    <div class="mt-3 grid gap-2">
      ${cur.a.map((t,i)=>`<button class="px-4 py-2 rounded border text-left hover:bg-slate-50" onclick="choose(${i})">${t}</button>`).join("")}
    </div>`;
}
function choose(i){ if(i===qs[idx].i) score++; idx++; render(); }
function restart(){ idx=0; score=0; render(); }
