const login = document.getElementById("login");
const register = document.getElementById("register");
const msg = document.getElementById("msg");
document.getElementById("tabLogin").onclick = ()=>{login.classList.remove("hidden");register.classList.add("hidden");};
document.getElementById("tabRegister").onclick = ()=>{register.classList.remove("hidden");login.classList.add("hidden");};

login.addEventListener("submit", e=>{ e.preventDefault(); msg.classList.remove("hidden"); });
register.addEventListener("submit", e=>{ e.preventDefault(); msg.classList.remove("hidden"); });
