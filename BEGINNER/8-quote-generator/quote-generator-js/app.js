/* Quote Generator — Level 2 (JavaScript)
 * - Random quote
 * - Copy to clipboard
 * - Tweet link
 * - Keyboard: Space = new quote
 */

(function(){
  const textEl = document.getElementById('text');
  const authorEl = document.getElementById('author').querySelector('span');
  const btnNew = document.getElementById('btn-new');
  const btnCopy = document.getElementById('btn-copy');
  const btnTweet = document.getElementById('btn-tweet');

  let lastIndex = -1;

  function getRandomIndex(max){
    if (max <= 1) return 0;
    let idx;
    do { idx = Math.floor(Math.random() * max); } while (idx === lastIndex);
    lastIndex = idx;
    return idx;
  }

  function getRandomQuote(){
    const idx = getRandomIndex(quotes.length);
    return quotes[idx];
  }

  function renderQuote(q){
    // small fade
    textEl.classList.remove('fade-in');
    textEl.classList.add('fade-out');
    setTimeout(() => {
      textEl.textContent = `“${q.text}”`;
      authorEl.textContent = q.author || 'Unknown';

      const tweetUrl = new URL('https://twitter.com/intent/tweet');
      tweetUrl.searchParams.set('text', `“${q.text}” — ${q.author || 'Unknown'}`);
      btnTweet.href = tweetUrl.toString();

      textEl.classList.remove('fade-out');
      textEl.classList.add('fade-in');
    }, 180);
  }

  function copyCurrent(){
    const content = `${textEl.textContent} — ${authorEl.textContent}`;
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(content).then(() => {
        btnCopy.textContent = 'Copied!';
        setTimeout(() => btnCopy.textContent = 'Copy', 900);
      }).catch(() => fallbackCopy(content));
    } else {
      fallbackCopy(content);
    }
  }

  function fallbackCopy(text){
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try{
      document.execCommand('copy');
      btnCopy.textContent = 'Copied!';
    }catch(e){
      alert('Không thể copy tự động. Hãy bôi đen và sao chép thủ công.');
    }
    document.body.removeChild(ta);
    setTimeout(() => btnCopy.textContent = 'Copy', 900);
  }

  function newQuote(){
    const q = getRandomQuote();
    renderQuote(q);
  }

  // init: show one
  newQuote();

  btnNew.addEventListener('click', newQuote);
  btnCopy.addEventListener('click', copyCurrent);

  window.addEventListener('keydown', (e) => {
    // avoid when typing in inputs (not present here but safe)
    const active = document.activeElement;
    const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    if (typing) return;
    if (e.code === 'Space'){
      e.preventDefault();
      newQuote();
    }
  });
})();
