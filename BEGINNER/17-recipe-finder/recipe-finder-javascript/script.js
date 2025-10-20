const list = document.getElementById('list')
const dlg = document.getElementById('dlg')
const detail = document.getElementById('detail')

function render(items){
  list.innerHTML = ''
  if(!items.length){ list.innerHTML = '<p>Không có kết quả.</p>'; return }
  items.forEach(r => {
    const el = document.createElement('article')
    el.className = 'card'
    el.innerHTML = `<h3>${r.title}</h3>
      <p>⏱️ ${r.time} phút • 👥 ${r.servings} khẩu phần</p>
      <div class="badges">${r.tags.map(t=>`<span class="badge">#${t}</span>`).join(' ')}</div>
      <button data-id="${r.id}">Xem chi tiết</button>`
    el.querySelector('button').onclick = () => openDetail(r.id)
    list.appendChild(el)
  })
}
function search(){
  const q = (document.getElementById('q').value || '').toLowerCase().trim()
  const tag = document.getElementById('tag').value
  const items = MOCK.filter(r => {
    const hitQ = !q || r.title.toLowerCase().includes(q) || r.ingredients.join(' ').toLowerCase().includes(q)
    const hitT = !tag || r.tags.includes(tag)
    return hitQ && hitT
  })
  render(items)
}
function openDetail(id){
  const r = MOCK.find(x => x.id===id)
  if(!r) return
  detail.innerHTML = `<h2 style="margin:0 0 8px">${r.title}</h2>
    <p>⏱️ ${r.time} phút • 👥 ${r.servings} khẩu phần</p>
    <h4>Nguyên liệu</h4>
    <ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul>
    <h4>Các bước</h4>
    <ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`
  dlg.showModal()
}
document.getElementById('btnSearch').onclick = search
document.getElementById('tag').onchange = search
search()
