const imgs = Array.from({length:5}, (_,i)=>`https://picsum.photos/seed/s${i}/900/500`);
const track = document.getElementById("track");
track.innerHTML = imgs.map(src=>`<img src="${src}" class="w-full flex-shrink-0">`).join("");
let i=0;
function update(){ track.style.transform = `translateX(${-i*100}%)`; }
document.getElementById("prev").onclick = ()=>{ i = (i-1+imgs.length)%imgs.length; update(); };
document.getElementById("next").onclick = ()=>{ i = (i+1)%imgs.length; update(); };
update();
