// Level 2 — Tailwind UI + Dark Mode, không persist todos
const $ = (sel, root = document) => root.querySelector(sel);
const form = $("#todo-form");
const input = $("#todo-input");
const list = $("#todo-list");
const empty = $("#empty-state");
const countAll = $("#count-all");
const countActive = $("#count-active");
const countDone = $("#count-done");
const themeBtn = $("#theme-toggle");

let todos = [
  { id: "1", title: "Thiết kế UI với Tailwind", done: false },
  { id: "2", title: "Thêm Dark Mode toggle", done: true },
];

function updateStats() {
  const all = todos.length;
  const done = todos.filter(t => t.done).length;
  const active = all - done;
  countAll.textContent = all;
  countActive.textContent = active;
  countDone.textContent = done;
  empty.style.display = all ? "none" : "block";
}

function render() {
  list.innerHTML = "";
  todos.forEach(todo => list.appendChild(renderItem(todo)));
  updateStats();
}

function renderItem(todo) {
  const li = document.createElement("li");
  li.className = "grid grid-cols-[24px_1fr_auto] items-center gap-2 px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900";

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.className = "h-4 w-4 accent-sky-500";
  cb.checked = !!todo.done;
  cb.addEventListener("change", () => {
    todo.done = cb.checked;
    title.classList.toggle("line-through", todo.done);
    title.classList.toggle("text-slate-400", todo.done);
    updateStats();
  });

  const title = document.createElement("div");
  title.className = "text-base break-words " + (todo.done ? "line-through text-slate-400" : "");
  title.contentEditable = "true";
  title.spellcheck = false;
  title.textContent = todo.title;
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); title.blur(); }
  });
  title.addEventListener("blur", () => {
    todo.title = title.textContent.trim() || todo.title;
    title.textContent = todo.title;
  });

  const actions = document.createElement("div");
  actions.className = "flex gap-2";
  const del = document.createElement("button");
  del.className = "px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-red-600";
  del.textContent = "Xoá";
  del.addEventListener("click", () => {
    todos = todos.filter(t => t.id !== todo.id);
    render();
  });

  actions.appendChild(del);
  li.appendChild(cb);
  li.appendChild(title);
  li.appendChild(actions);
  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = input.value.trim();
  if (!v) return input.focus();
  todos.unshift({ id: String(Date.now() + Math.random()), title: v, done: false });
  input.value = "";
  input.focus();
  render();
});

// Theme toggle
themeBtn.addEventListener("click", () => {
  const root = document.documentElement;
  const isDark = root.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

render();
