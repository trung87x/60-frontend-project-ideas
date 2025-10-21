const MOCK = { name:"Hanoi", main:{ temp: 30 }, weather:[{ description:"nắng đẹp" }] };

document.getElementById("wf").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const city = document.getElementById("city").value.trim() || "Hanoi";
  // --- MOCK MODE ---
  const data = { ...MOCK, name: city };
  render(data);
  
  // // --- REAL API MODE --- (bỏ comment để dùng)
  // // const key = "YOUR_OPENWEATHER_API_KEY";
  // // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric&lang=vi`);
  // // if(!res.ok) return alert("Không tìm thấy thành phố");
  // // const data = await res.json();
  // // render(data);
});

function render(d){
  const el = document.getElementById("card");
  el.innerHTML = `
    <div class="text-xl font-semibold">${d.name}</div>
    <div class="text-4xl font-bold mt-1">${Math.round(d.main.temp)}°C</div>
    <div class="text-slate-600 capitalize mt-1">${d.weather[0].description}</div>
  `;
  el.classList.remove("hidden");
}
