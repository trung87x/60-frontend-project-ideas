const icons = ["🍎","🍌","🍇","🍊","🍉","🍓","🥑","🥕"];
let cards = [];
let first=null, lock=false, matched=0;
function setup(){
  const arr = [...icons, ...icons].sort(()=>Math.random()-0.5);
  cards = arr.map((v,i)=>({id:i, v, open:false, done:false}));
  render();
}
function clickCard(i){
  if(lock) return;
  const c = cards[i];
  if(c.done || c.open) return;
  c.open = true; render();
  if(!first){ first=i; return; }
  const a = cards[first], b = c;
  if(a.v===b.v){ a.done=b.done=true; matched+=2; first=null; return; }
  lock=true; setTimeout(()=>{ a.open=b.open=false; first=null; lock=false; render(); }, 700);
}
function render(){
  const grid = document.getElementById("grid");
  grid.innerHTML = cards.map((c,i)=>`
    <button onclick="clickCard(${i})" class="h-20 rounded-xl border bg-white text-3xl">
      ${c.open||c.done ? c.v : "?"}
    </button>
  `).join("");
  if(matched===cards.length){ alert("Bạn thắng!"); }
}
document.getElementById("restart").onclick = ()=>{ matched=0; first=null; setup(); };
setup();
