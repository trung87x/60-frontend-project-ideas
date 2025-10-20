let intervalId=null;
const $=s=>document.querySelector(s);
const dEl=$("#d"),hEl=$("#h"),mEl=$("#m"),sEl=$("#s"),target=$("#target"),timer=$("#timer");
const pad=n=>String(n).padStart(2,"0");
function tick(){
  if(!target.value)return;
  const t=new Date(target.value).getTime(),now=Date.now();
  let diff=Math.max(0,t-now);
  const d=Math.floor(diff/86400000); diff-=d*86400000;
  const h=Math.floor(diff/3600000);  diff-=h*3600000;
  const m=Math.floor(diff/60000);    diff-=m*60000;
  const s=Math.floor(diff/1000);
  dEl.textContent=pad(d);hEl.textContent=pad(h);mEl.textContent=pad(m);sEl.textContent=pad(s);
  if(t-now<=10000&&t-now>0){timer.classList.add("ring-2","ring-red-700","border-red-700");}
  else{timer.classList.remove("ring-2","ring-red-700","border-red-700");}
  if(t-now<=0){clearInterval(intervalId);intervalId=null;new Audio('end.mp3').play().catch(()=>{});}
}
$("#start").addEventListener("click",()=>{ if(intervalId)return; tick(); intervalId=setInterval(tick,1000); });
$("#stop").addEventListener("click",()=>{ if(intervalId){clearInterval(intervalId);intervalId=null;} });
$("#reset").addEventListener("click",()=>{ if(intervalId){clearInterval(intervalId);intervalId=null;} target.value=""; ["d","h","m","s"].forEach(id=>document.getElementById(id).textContent="00"); timer.classList.remove("ring-2","ring-red-700","border-red-700"); });
