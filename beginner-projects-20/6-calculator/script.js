const keys = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","C","+","="];
const el = document.getElementById("keys");
const disp = document.getElementById("display");
keys.forEach(k=>{
  const b = document.createElement("button");
  b.textContent = k;
  b.className = "px-3 py-2 rounded border hover:bg-slate-50";
  b.onclick = ()=> press(k);
  el.appendChild(b);
});
let expr = "";
function press(k){
  if(k==="C"){ expr=""; disp.value=""; return; }
  if(k==="="){
    try{ expr = String(Function(`return (${expr})`)()); }
    catch{ expr = "Error"; }
    disp.value = expr;
    return;
  }
  expr += k;
  disp.value = expr;
}
