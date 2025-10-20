// Utils
function clamp(n, min, max){ return Math.min(max, Math.max(min, n)); }

function formatTime(ms) {
  const sign = ms < 0 ? '-' : '';
  ms = Math.abs(ms);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const ms3 = Math.floor(ms % 1000);
  const pad = (n, w=2) => String(n).padStart(w, '0');
  return `${sign}${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms3,3)}`;
}

function formatHMS(ms) {
  const sign = ms < 0 ? '-' : '';
  ms = Math.abs(ms);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const pad = (n, w=2) => String(n).padStart(w, '0');
  return `${sign}${pad(h)}:${pad(m)}:${pad(s)}`;
}

// Stopwatch — high accuracy via rAF + Date.now()
class Stopwatch {
  constructor(displayEl, lapsEl, controls) {
    this.displayEl = displayEl;
    this.lapsEl = lapsEl;
    this.btnStart = controls.start;
    this.btnPause = controls.pause;
    this.btnReset = controls.reset;
    this.btnLap = controls.lap;

    this._elapsed = 0; // accumulated ms when paused
    this._startAt = null; // Date.now() when running
    this._rAF = null;
    this._running = false;

    this._bind();
    this._render(0);
  }

  _bind() {
    this.btnStart.addEventListener('click', () => this.start());
    this.btnPause.addEventListener('click', () => this.pause());
    this.btnReset.addEventListener('click', () => this.reset());
    this.btnLap.addEventListener('click', () => this.lap());
  }

  _tick = () => {
    if (!this._running) return;
    const now = Date.now();
    const ms = this._elapsed + (now - this._startAt);
    this._render(ms);
    this._rAF = requestAnimationFrame(this._tick);
  }

  _render(ms) {
    this.displayEl.textContent = formatTime(ms);
  }

  _setState({ running }) {
    this._running = running;
    this.btnStart.disabled = running;
    this.btnPause.disabled = !running;
    this.btnReset.disabled = running && this._elapsed === 0;
    this.btnLap.disabled = !running;
  }

  start() {
    if (this._running) return;
    this._startAt = Date.now();
    this._setState({ running: true });
    this._rAF = requestAnimationFrame(this._tick);
  }

  pause() {
    if (!this._running) return;
    cancelAnimationFrame(this._rAF);
    const now = Date.now();
    this._elapsed += now - this._startAt;
    this._setState({ running: false });
    this._render(this._elapsed);
  }

  reset() {
    cancelAnimationFrame(this._rAF);
    this._elapsed = 0;
    this._startAt = null;
    this._setState({ running: false });
    this._render(0);
    this.lapsEl.innerHTML = '';
  }

  lap() {
    const ms = this._running ? (this._elapsed + (Date.now() - this._startAt)) : this._elapsed;
    const li = document.createElement('li');
    const index = this.lapsEl.children.length + 1;
    li.innerHTML = `<span>Lap ${index}</span><strong>${formatTime(ms)}</strong>`;
    this.lapsEl.prepend(li);
  }
}

// Timer — countdown with drift correction
class Timer {
  constructor(displayEl, inputs, controls) {
    this.displayEl = displayEl;
    this.minEl = inputs.min;
    this.secEl = inputs.sec;
    this.btnStart = controls.start;
    this.btnPause = controls.pause;
    this.btnReset = controls.reset;

    this._total = 90_000; // default 1:30
    this._endAt = null;
    this._left = this._total;
    this._running = false;
    this._rAF = null;

    this._bind();
    this._render(this._left);
  }

  _bind() {
    const syncFromInputs = () => {
      const m = clamp(parseInt(this.minEl.value || '0', 10), 0, 99);
      const s = clamp(parseInt(this.secEl.value || '0', 10), 0, 59);
      this._total = (m * 60 + s) * 1000;
      if (!this._running) {
        this._left = this._total;
        this._render(this._left);
      }
    };
    this.minEl.addEventListener('input', syncFromInputs);
    this.secEl.addEventListener('input', syncFromInputs);

    this.btnStart.addEventListener('click', () => this.start());
    this.btnPause.addEventListener('click', () => this.pause());
    this.btnReset.addEventListener('click', () => this.reset());
  }

  _tick = () => {
    if (!this._running) return;
    const left = this._endAt - Date.now();
    this._left = Math.max(0, left);
    this._render(this._left);
    if (left <= 0) {
      this._done();
      return;
    }
    this._rAF = requestAnimationFrame(this._tick);
  }

  _render(ms) {
    this.displayEl.textContent = formatHMS(ms);
  }

  _setState({ running }) {
    this._running = running;
    this.btnStart.disabled = running;
    this.btnPause.disabled = !running;
    this.btnReset.disabled = running;
    this.minEl.disabled = running;
    this.secEl.disabled = running;
  }

  start() {
    if (this._running) return;
    // If inputs changed to 0, block start
    if (this._total <= 0 && this._left <= 0) {
      alert('Vui lòng nhập thời gian lớn hơn 0');
      return;
    }
    // continue from paused
    const base = this._left > 0 ? this._left : this._total;
    this._endAt = Date.now() + base;
    this._setState({ running: true });
    this._rAF = requestAnimationFrame(this._tick);
  }

  pause() {
    if (!this._running) return;
    cancelAnimationFrame(this._rAF);
    this._left = Math.max(0, this._endAt - Date.now());
    this._setState({ running: false });
  }

  reset() {
    cancelAnimationFrame(this._rAF);
    this._left = this._total;
    this._setState({ running: false });
    this._render(this._left);
  }

  _done() {
    cancelAnimationFrame(this._rAF);
    this._setState({ running: false });
    this._render(0);
    try {
      const old = document.title;
      document.title = '⏰ Hết giờ!';
      setTimeout(() => { document.title = old; }, 1500);
    } catch {}
    alert('⏰ Hết giờ!');
  }
}

// Wire up
window.addEventListener('DOMContentLoaded', () => {
  // Stopwatch
  const sw = new Stopwatch(
    document.getElementById('sw-display'),
    document.getElementById('sw-laps'),
    {
      start: document.getElementById('sw-start'),
      pause: document.getElementById('sw-pause'),
      reset: document.getElementById('sw-reset'),
      lap: document.getElementById('sw-lap'),
    }
  );

  // Enable Reset once some time has passed
  const enableResetIfNeeded = () => {
    const text = document.getElementById('sw-display').textContent;
    if (text !== '00:00:00.000') document.getElementById('sw-reset').disabled = false;
  };
  document.getElementById('sw-start').addEventListener('click', enableResetIfNeeded);
  document.getElementById('sw-pause').addEventListener('click', enableResetIfNeeded);
  document.getElementById('sw-lap').addEventListener('click', enableResetIfNeeded);

  // Timer
  const tm = new Timer(
    document.getElementById('tm-display'),
    { min: document.getElementById('tm-min'), sec: document.getElementById('tm-sec') },
    { start: document.getElementById('tm-start'), pause: document.getElementById('tm-pause'), reset: document.getElementById('tm-reset') }
  );
});
