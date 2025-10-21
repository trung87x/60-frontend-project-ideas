const grid = document.getElementById("grid");
const images = Array.from({length: 12}, (_,i) => `https://picsum.photos/seed/p${i+1}/600/400`);
grid.innerHTML = images.map(src => `
  <img src="${src}" alt="img" class="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90">
`).join("");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
grid.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    modalImg.src = e.target.src;
    modal.classList.remove("hidden");
  }
});
modal.addEventListener("click", () => modal.classList.add("hidden"));
