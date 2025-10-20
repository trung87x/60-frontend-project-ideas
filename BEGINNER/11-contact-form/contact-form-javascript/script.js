const form = document.getElementById('form')
const statusEl = document.getElementById('status')
const btn = document.getElementById('submitBtn')

function showError(input, msg){
  input.classList.add('error')
  let hint = input.nextElementSibling
  if(!hint || !hint.classList.contains('error-text')){
    hint = document.createElement('div')
    hint.className = 'error-text'
    input.insertAdjacentElement('afterend', hint)
  }
  hint.textContent = msg
}
function clearError(input){
  input.classList.remove('error')
  const hint = input.nextElementSibling
  if(hint && hint.classList.contains('error-text')) hint.remove()
}

form.addEventListener('submit', async (e)=>{
  e.preventDefault()
  statusEl.textContent = ''
  btn.disabled = true

  const name = form.name.value.trim()
  const email = form.email.value.trim()
  const message = form.message.value.trim()
  const agree = document.getElementById('agree').checked

  ;[form.name, form.email, form.message].forEach(clearError)
  let ok = true

  if(name.length < 2){ showError(form.name, 'Tên phải >= 2 ký tự'); ok = false }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError(form.email, 'Email không hợp lệ'); ok = false }
  if(message.length < 10){ showError(form.message, 'Nội dung phải >= 10 ký tự'); ok = false }
  if(!agree){ statusEl.textContent = 'Bạn cần đồng ý điều khoản'; ok = false }

  if(!ok){ btn.disabled = false; return }

  // mock submit
  await new Promise(r => setTimeout(r, 700))
  statusEl.textContent = '✅ Đã gửi thành công (mock)!'
  form.reset()
  btn.disabled = false
})
