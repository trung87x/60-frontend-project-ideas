// Quiz data (demo)
const QUESTIONS = [
  { id:1, text:'Thủ đô của Việt Nam là?', options:['Hà Nội','TP.HCM','Đà Nẵng','Huế'], answer:0 },
  { id:2, text:'2 + 2 = ?', options:['3','4','5','22'], answer:1 },
  { id:3, text:'Ngôn ngữ dùng cho style web?', options:['HTML','CSS','SQL','Python'], answer:1 }
]

let idx = 0
const picks = new Array(QUESTIONS.length).fill(null)

const qText = document.getElementById('qText')
const opts = document.getElementById('opts')
const meta = document.getElementById('meta')
const bar = document.getElementById('bar')
const statusEl = document.getElementById('status')

function render(){
  const q = QUESTIONS[idx]
  qText.textContent = q.text
  opts.innerHTML = ''
  q.options.forEach((opt, i) => {
    const li = document.createElement('li')
    li.className = 'opt' + (picks[idx]===i ? ' selected' : '')
    li.textContent = String.fromCharCode(65+i)+'. '+opt
    li.onclick = () => { picks[idx] = i; render() }
    opts.appendChild(li)
  })
  meta.textContent = `Câu ${idx+1} / ${QUESTIONS.length}`
  bar.style.width = ( (idx)/(QUESTIONS.length-1) * 100 ) + '%'
  statusEl.textContent = ''
}

document.getElementById('prev').onclick = () => { idx = Math.max(0, idx-1); render() }
document.getElementById('next').onclick = () => { idx = Math.min(QUESTIONS.length-1, idx+1); render() }
document.getElementById('submit').onclick = () => {
  if(picks.includes(null)){ statusEl.textContent = '⚠️ Vui lòng trả lời tất cả câu hỏi.'; return }
  const score = QUESTIONS.reduce((acc,q,i)=> acc + (q.answer===picks[i]?1:0), 0)
  statusEl.textContent = `✅ Điểm: ${score}/${QUESTIONS.length}`
}

render()
