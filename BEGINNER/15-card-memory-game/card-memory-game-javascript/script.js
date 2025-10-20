const EMOJIS = ['🍎','🐶','🌟','🎈','🚗','🍩','🎮','🎵']
let first=null, second=null, lock=false, moves=0, start=0, timer=null, matched=0
const board=document.getElementById('board'), movesEl=document.getElementById('moves'), timeEl=document.getElementById('time'), statusEl=document.getElementById('status')

function pad(n){ return String(n).padStart(2,'0') }
function fmt(t){ const s=Math.floor(t/1000); return pad(Math.floor(s/60))+':'+pad(s%60) }

function render(){
  const deck=[...EMOJIS, ...EMOJIS].sort(()=>Math.random()-0.5)
  board.innerHTML=''
  deck.forEach((emoji,i)=>{
    const card=document.createElement('div'); card.className='card'; card.dataset.v=emoji; card.dataset.i=i
    card.innerHTML=`<div class="front"></div><div class="back">${emoji}</div>`
    card.onclick=()=>flip(card)
    board.appendChild(card)
  })
  first=second=null; lock=false; moves=0; matched=0; start=Date.now(); movesEl.textContent=0; statusEl.textContent=''
  if(timer) clearInterval(timer)
  timer=setInterval(()=>{ timeEl.textContent=fmt(Date.now()-start) }, 250)
}
function flip(card){
  if(lock || card.classList.contains('flipped') || card.classList.contains('matched')) return
  card.classList.add('flipped')
  if(!first){ first=card; return }
  second=card; lock=true; moves++; movesEl.textContent=moves
  if(first.dataset.v===second.dataset.v){
    first.classList.add('matched'); second.classList.add('matched'); matched+=2; lock=false; first=second=null
    if(matched === EMOJIS.length*2){ clearInterval(timer); statusEl.textContent=`✅ Hoàn thành trong ${moves} lần lật, thời gian ${timeEl.textContent}` }
  }else{
    setTimeout(()=>{ first.classList.remove('flipped'); second.classList.remove('flipped'); first=second=null; lock=false }, 700)
  }
}
document.getElementById('restart').onclick=render
render()
