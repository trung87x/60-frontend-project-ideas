const DATA = [
  { name:"Grilled Chicken", img:"https://picsum.photos/seed/r1/400/300", ing:["chicken","salt","pepper"] },
  { name:"Beef Salad", img:"https://picsum.photos/seed/r2/400/300", ing:["beef","lettuce","tomato"] },
  { name:"Veggie Bowl", img:"https://picsum.photos/seed/r3/400/300", ing:["rice","broccoli","carrot"] },
];
const grid = document.getElementById("grid");
const kw = document.getElementById("kw");
kw.addEventListener("input", render);
render();
function render(){
  const q = kw.value.trim().toLowerCase();
  const list = DATA.filter(r => r.name.toLowerCase().includes(q) || r.ing.some(i=>i.includes(q)));
  grid.innerHTML = list.map(r=>`
    <article class="rounded-xl border bg-white shadow overflow-hidden">
      <img src="${r.img}" class="w-full h-36 object-cover">
      <div class="p-3">
        <h3 class="font-semibold">${r.name}</h3>
        <p class="text-sm text-slate-600">Nguyên liệu: ${r.ing.join(", ")}</p>
      </div>
    </article>
  `).join("");
}
