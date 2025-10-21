const projects = [
  { title: "Landing Page", desc: "Trang sản phẩm responsive", link: "#" },
  { title: "Image Gallery", desc: "Thư viện ảnh có modal", link: "#" },
  { title: "Calculator", desc: "Máy tính cơ bản", link: "#" },
];

const grid = document.getElementById("projectGrid");
grid.innerHTML = projects.map(p => `
  <article class="rounded-xl border bg-white p-4 shadow hover:shadow-md transition">
    <h4 class="font-semibold">${p.title}</h4>
    <p class="text-sm text-slate-600 mt-1">${p.desc}</p>
    <a class="text-blue-600 text-sm inline-block mt-2" href="${p.link}">Xem →</a>
  </article>
`).join("");

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("contactMsg").classList.remove("hidden");
});
