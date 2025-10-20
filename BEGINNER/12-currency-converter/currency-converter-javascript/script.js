// Mock rates (base USD)
const RATES = {"USD": 1.0, "EUR": 0.92, "VND": 25400.0, "JPY": 151.2, "GBP": 0.78, "AUD": 1.52, "CAD": 1.37, "KRW": 1380.0};
const amountEl = document.getElementById('amount')
const fromEl = document.getElementById('from')
const toEl = document.getElementById('to')
const resEl = document.getElementById('result')

Object.keys(RATES).forEach(c=>{
  fromEl.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`)
  toEl.insertAdjacentHTML('beforeend', `<option value="${c}">${c}</option>`)
})
fromEl.value='USD'; toEl.value='VND'

const fmt=(n,cur)=> new Intl.NumberFormat('vi-VN',{style:'currency',currency:cur}).format(n)
function convert(){
  const amt=parseFloat(amountEl.value||'0')
  const usd = amt / RATES[fromEl.value]
  const out = usd * RATES[toEl.value]
  resEl.textContent = `${fmt(amt, fromEl.value)} = ${fmt(out, toEl.value)}`
}
document.getElementById('convert').addEventListener('click', convert)
document.getElementById('swap').addEventListener('click', ()=>{ const x=fromEl.value; fromEl.value=toEl.value; toEl.value=x; convert() })
