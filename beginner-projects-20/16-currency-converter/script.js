const RATES = { USD:1, VND:24000, EUR:0.92 }; // mock
document.getElementById("convert").onclick = ()=>{
  const amt = parseFloat(document.getElementById("amount").value||"0");
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const usd = amt / RATES[from];
  const res = usd * RATES[to];
  document.getElementById("result").value = res.toFixed(2);
};

// // REAL API MODE (example):
// // const res = await fetch("https://open.er-api.com/v6/latest/USD");
// // const data = await res.json(); data.rates -> thay cho RATES
