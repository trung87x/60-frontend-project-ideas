// JS rất nhẹ cho tương tác cơ bản (không lưu localStorage)
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const form = $("#todo-form");
const input = $("#todo-input");
const list = $("#todo-list");
const empty = $("#empty-state");
const countAll = $("#count-all");
const countActive = $("#count-active");
const countDone = $("#count-done");

let todos = []; // chỉ giữ trong bộ nhớ tạm thời (mất khi refresh)

function render() {
  list.innerHTML = "";
  todos.forEach((t) => list.appendChild(renderItem(t)));
  empty.style.display = todos.length ? "none" : "block";

  // Cập nhật bộ đếm
  const all = todos.length;
  const done = todos.filter(t => t.done).length;
  const active = all - done;
  countAll.textContent = all;
  countActive.textContent = active;
  countDone.textContent = done;
}

function renderItem(todo) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = !!todo.done;
  checkbox.addEventListener("change", () => {
    // Toggle trạng thái: chỉ thay đổi UI/memory, không persist
    todo.done = checkbox.checked;
    title.classList.toggle("done", todo.done);
    render(); // cập nhật bộ đếm
  });

  const title = document.createElement("div");
  title.className = "title" + (todo.done ? " done" : "");
  title.textContent = todo.title;
  title.contentEditable = "true";
  title.spellcheck = false;
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      title.blur();
    }
  });
  title.addEventListener("blur", () => {
    todo.title = title.textContent.trim() || todo.title;
    title.textContent = todo.title;
  });

  const actions = document.createElement("div");
  actions.className = "actions";

  const del = document.createElement("button");
  del.className = "icon-btn danger";
  del.type = "button";
  del.title = "Xoá";
  del.textContent = "Xoá";
  del.addEventListener("click", () => {
    todos = todos.filter(t => t.id !== todo.id);
    render();
  });

  actions.appendChild(del);

  li.appendChild(checkbox);
  li.appendChild(title);
  li.appendChild(actions);
  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  todos.unshift({
    id: String(Date.now() + Math.random()),
    title: value,
    done: false,
  });
  input.value = "";
  input.focus();
  render();
});

// Khởi tạo ví dụ mặc định
todos = [
  { id: "1", title: "Viết 3 việc cần làm hôm nay", done: false },
  { id: "2", title: "Dọn dẹp thư mục dự án", done: true },
];
render();
