// ⏳ Countdown cơ bản — Cấp 2
let intervalId = null;
const targetInput = document.getElementById('target');
const dEl = document.getElementById('d');
const hEl = document.getElementById('h');
const mEl = document.getElementById('m');
const sEl = document.getElementById('s');
const timerEl = document.getElementById('timer');

function pad(n){return String(n).padStart(2,'0');}

function tick(){
  const value = targetInput.value;
  if(!value){return;}
  const target = new Date(value).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / (24*60*60*1000));
  diff -= days * 24*60*60*1000;
  const hours = Math.floor(diff / (60*60*1000));
  diff -= hours * 60*60*1000;
  const mins = Math.floor(diff / (60*1000));
  diff -= mins * 60*1000;
  const secs = Math.floor(diff / 1000);

  dEl.textContent = pad(days);
  hEl.textContent = pad(hours);
  mEl.textContent = pad(mins);
  sEl.textContent = pad(secs);

  // cảnh báo khi còn < 10s
  if(target - now <= 10_000 && target - now > 0){
    timerEl.classList.add('expiring');
  }else{
    timerEl.classList.remove('expiring');
  }

  if(target - now <= 0){
    clearInterval(intervalId);
    intervalId = null;
    // Kết thúc
    alert('⏰ Hết giờ!');
  }
}

document.getElementById('start').addEventListener('click', () => {
  if(intervalId) return;
  tick();
  intervalId = setInterval(tick, 1000);
});

document.getElementById('stop').addEventListener('click', () => {
  if(intervalId){ clearInterval(intervalId); intervalId = null; }
});

document.getElementById('reset').addEventListener('click', () => {
  if(intervalId){ clearInterval(intervalId); intervalId = null; }
  targetInput.value = '';
  dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
  timerEl.classList.remove('expiring');
});
