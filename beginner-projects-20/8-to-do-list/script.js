const f = document.getElementById("f");
const inp = document.getElementById("inp");
const list = document.getElementById("list");
let todos = JSON.parse(localStorage.getItem("todos")||"[]");
render();
f.addEventListener("submit",(e)=>{
  e.preventDefault();
  const t = inp.value.trim();
  if(!t) return;
  todos.push({ id: Date.now(), text: t, done: false });
  inp.value=""; save(); render();
});
function toggle(id){ const t=todos.find(x=>x.id===id); t.done=!t.done; save(); render(); }
function del(id){ todos=todos.filter(x=>x.id!==id); save(); render(); }
function render(){
  list.innerHTML = todos.map(t=>`
    <li class="flex items-center justify-between rounded border p-2 ${t.done?'opacity-60':''}">
      <span class="${t.done?'line-through':''}">${t.text}</span>
      <div class="space-x-2 text-sm">
        <button onclick="toggle(${t.id})" class="px-2 py-1 border rounded">Done</button>
        <button onclick="del(${t.id})" class="px-2 py-1 border rounded">Xóa</button>
      </div>
    </li>
  `).join("");
}
function save(){ localStorage.setItem("todos", JSON.stringify(todos)); }
