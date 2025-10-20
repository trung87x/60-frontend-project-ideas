(() => {
  const exprEl = document.getElementById('expr');
  const resultEl = document.getElementById('result');
  const keypad = document.querySelector('.keypad');

  /** State cho chế độ immediate execution */
  let current = '0';
  let previous = null;
  let operator = null;
  let overwrite = true; // sau khi nhấn = hoặc toán tử, số mới sẽ ghi đè
  let error = null;

  function format(nStr) {
    if (nStr === 'Error') return 'Error';
    if (nStr === '-') return '-';
    const n = Number(nStr);
    if (!Number.isFinite(n)) return 'Error';
    // Giữ nguyên phần thập phân nếu có
    const [int, frac] = nStr.split('.');
    const intFmt = Number(int).toLocaleString('en-US');
    return frac !== undefined ? `${intFmt}.${frac.slice(0, 12)}` : intFmt;
  }

  function updateDisplay() {
    const exprText = [previous, operator && mapOp(operator), current]
      .filter(Boolean).join(' ');
    exprEl.textContent = error ? 'Lỗi phép tính' : (exprText || '0');
    resultEl.textContent = error ? 'Error' : format(current);
  }

  function mapOp(op) {
    return op === '/' ? '÷' : op === '*' ? '×' : op;
  }

  function inputDigit(d) {
    if (error) return;
    if (overwrite) {
      current = d === '.' ? '0.' : d;
      overwrite = false;
      return;
    }
    if (d === '.') {
      if (!current.includes('.')) current += '.';
    } else {
      current = current === '0' ? d : current + d;
    }
  }

  function setOperator(nextOp) {
    if (error) return;
    if (operator && !overwrite) {
      // Tính ngay nếu người dùng đang nối chuỗi toán tử
      compute();
    }
    previous = current;
    operator = nextOp;
    overwrite = true;
  }

  function compute() {
    if (error) return;
    if (previous === null || operator === null) return;
    const a = Number(previous);
    const b = Number(current);

    let res;
    switch (operator) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/':
        if (b === 0) {
          error = 'DIV_ZERO';
          current = 'Error';
          updateDisplay();
          return;
        }
        res = a / b; 
        break;
      default: return;
    }
    current = String(res);
    previous = null;
    operator = null;
    overwrite = true;
  }

  function clearAll() {
    current = '0';
    previous = null;
    operator = null;
    overwrite = true;
    error = null;
  }

  function backspace() {
    if (error) return;
    if (overwrite) return; // không xóa khi vừa tính xong
    if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) {
      current = '0';
      overwrite = true;
    } else {
      current = current.slice(0, -1);
    }
  }

  function toggleSign() {
    if (error) return;
    if (current === '0') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
  }

  // Click bằng chuột
  keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-key]');
    if (!btn) return;
    handleKey(btn.dataset.key);
  });

  // Bàn phím vật lý
  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if ((/^[0-9]$/).test(k)) return handleKey(k);
    if (k === '.' || k === '+' || k === '-' || k === '*' || k === '/' || k === 'Enter' || k === 'Backspace' || k === 'Escape') {
      e.preventDefault();
      return handleKey(k);
    }
  });

  function handleKey(k) {
    if (k === 'Escape') { clearAll(); return updateDisplay(); }
    if (k === 'Backspace') { backspace(); return updateDisplay(); }
    if (k === 'Enter') { compute(); return updateDisplay(); }
    if (k === '±') { toggleSign(); return updateDisplay(); }

    if (/^[0-9]$/.test(k) || k === '.') {
      inputDigit(k);
      return updateDisplay();
    }
    if (['+', '-', '*', '/'].includes(k)) {
      setOperator(k);
      return updateDisplay();
    }
  }

  updateDisplay();
})();