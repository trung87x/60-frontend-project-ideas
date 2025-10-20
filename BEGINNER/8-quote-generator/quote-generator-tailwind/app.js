// Quote Generator — Level 3 (TailwindCSS UI, giữ logic level 2)
(function(){
  const textEl = document.getElementById('text');
  const authorEl = document.getElementById('author');
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

  function animateText(){
    textEl.classList.add('fade-enter');
    requestAnimationFrame(() => {
      textEl.classList.add('fade-enter-active');
      textEl.classList.remove('fade-enter');
      setTimeout(() => textEl.classList.remove('fade-enter-active'), 260);
    });
  }

  function renderQuote(q){
    animateText();
    textEl.textContent = `“${q.text}”`;
    authorEl.textContent = q.author || 'Unknown';

    const tweetUrl = new URL('https://twitter.com/intent/tweet');
    tweetUrl.searchParams.set('text', `“${q.text}” — ${q.author || 'Unknown'}`);
    btnTweet.href = tweetUrl.toString();
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
      alert('Không thể copy tự động. Hãy sao chép thủ công.');
    }
    document.body.removeChild(ta);
    setTimeout(() => btnCopy.textContent = 'Copy', 900);
  }

  function newQuote(){ renderQuote(getRandomQuote()); }

  // init
  newQuote();
  btnNew.addEventListener('click', newQuote);
  btnCopy.addEventListener('click', copyCurrent);
  window.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    if (typing) return;
    if (e.code === 'Space'){ e.preventDefault(); newQuote(); }
  });
})();
