const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Mock "database" in memory
const db = { users: [{ name:'Demo', email:'demo@example.com', password:'123456' }] }

function $(s){ return document.querySelector(s) }
function validateLogin(email, pass){
  let ok = true
  $('#loginEmailErr').textContent = ''
  $('#loginPassErr').textContent = ''
  if(!emailRe.test(email)){ $('#loginEmailErr').textContent = 'Email không hợp lệ'; ok = false }
  if((pass||'').length < 6){ $('#loginPassErr').textContent = 'Mật khẩu >= 6 ký tự'; ok = false }
  return ok
}
function validateRegister(name, email, pass){
  let ok = true
  $('#regNameErr').textContent = ''
  $('#regEmailErr').textContent = ''
  $('#regPassErr').textContent = ''
  if((name||'').trim().length < 2){ $('#regNameErr').textContent = 'Tên >= 2 ký tự'; ok = false }
  if(!emailRe.test(email)){ $('#regEmailErr').textContent = 'Email không hợp lệ'; ok = false }
  if((pass||'').length < 6){ $('#regPassErr').textContent = 'Mật khẩu >= 6 ký tự'; ok = false }
  return ok
}

$('#loginForm').addEventListener('submit', async (e)=>{
  e.preventDefault(); $('#loginStatus').textContent = ''; $('#loginBtn').disabled = true
  const email = e.target.email.value.trim(), password = e.target.password.value
  if(!validateLogin(email, password)){ $('#loginBtn').disabled = false; return }
  await new Promise(r=>setTimeout(r, 500))
  const user = db.users.find(u=>u.email===email && u.password===password)
  $('#loginStatus').textContent = user ? '✅ Đăng nhập thành công (mock)' : '❌ Sai email hoặc mật khẩu'
  $('#loginBtn').disabled = false
})

$('#registerForm').addEventListener('submit', async (e)=>{
  e.preventDefault(); $('#registerStatus').textContent = ''; $('#registerBtn').disabled = true
  const name = e.target.name.value.trim(), email = e.target.email.value.trim(), password = e.target.password.value
  if(!validateRegister(name, email, password)){ $('#registerBtn').disabled = false; return }
  await new Promise(r=>setTimeout(r, 500))
  if(db.users.some(u=>u.email===email)){ $('#registerStatus').textContent = '❌ Email đã tồn tại'; $('#registerBtn').disabled = false; return }
  db.users.push({ name, email, password })
  $('#registerStatus').textContent = '✅ Tạo tài khoản thành công (mock)'
  e.target.reset(); $('#registerBtn').disabled = false
})
