const hamburger = document.getElementById('hamburger')
const menu = document.getElementById('menu')
const dropbtn = document.querySelector('.dropbtn')
const dropdown = document.querySelector('.dropdown-menu')

hamburger.addEventListener('click', () => {
  const open = menu.hasAttribute('hidden')
  if(open){ menu.removeAttribute('hidden') } else { menu.setAttribute('hidden','') }
  hamburger.setAttribute('aria-expanded', String(open))
})

dropbtn.addEventListener('click', () => {
  const open = dropdown.hasAttribute('hidden')
  if(open){ dropdown.removeAttribute('hidden') } else { dropdown.setAttribute('hidden','') }
  dropbtn.setAttribute('aria-expanded', String(open))
})

window.addEventListener('scroll', () => {
  if(window.scrollY > 8){ document.body.classList.add('scrolled') }
  else{ document.body.classList.remove('scrolled') }
})