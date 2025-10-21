import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret' // HS256 for demo

// Demo data
const projects = [
  { id: 1, slug: 'nextjs-portfolio', title: 'Next.js Portfolio', summary: 'Personal site with projects', repo: 'https://github.com/you/portfolio', demo: 'https://you.dev' },
  { id: 2, slug: 'blog-platform', title: 'Blog Platform', summary: 'Posts, tags, comments', repo: '', demo: '' },
  { id: 3, slug: 'task-manager', title: 'Task Manager', summary: 'Team tasks with realtime', repo: '', demo: '' },
  { id: 4, slug: 'ecommerce', title: 'E-Commerce', summary: 'Cart + Stripe + Admin', repo: '', demo: '' },
]
const posts = [
  { id: 1, slug: 'getting-started', title: 'Getting Started', excerpt: 'Hello world', publishedAt: new Date().toISOString(), bodyHtml: '<p>Welcome to the blog.</p>' },
  { id: 2, slug: 'next-ssr-isr', title: 'Next.js SSR/ISR', excerpt: 'How and why', publishedAt: new Date().toISOString(), bodyHtml: '<p>SSR vs ISR explained.</p>' },
]

// -------- Auth --------
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if(!email || !password) return res.status(400).json({ error: 'Missing credentials' })
  // any email/password ok in demo
  const token = jwt.sign({ sub: email, email }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ access_token: token, expires_in: 3600 })
})

function auth(req, res, next){
  const auth = req.headers.authorization || ''
  const token = auth.replace('Bearer ', '')
  if(!token) return res.status(401).json({ error: 'Unauthorized' })
  try{ jwt.verify(token, JWT_SECRET); next() }catch(e){ return res.status(401).json({ error: 'Invalid token' }) }
}

// -------- Public --------
app.get('/projects', (req, res) => {
  const limit = Number(req.query.limit || 100)
  res.json(projects.slice(0, limit))
})

app.get('/projects/:slug', (req, res) => {
  const item = projects.find(p => p.slug === req.params.slug)
  if(!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

app.get('/posts', (req, res) => res.json(posts))
app.get('/posts/:slug', (req, res) => {
  const item = posts.find(p => p.slug === req.params.slug)
  if(!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

// -------- Private --------
app.get('/me', auth, (req, res) => {
  // decoded already, but for demo just echo a user
  res.json({ email: 'demo@local', name: 'Demo User', roles: ['user'] })
})

app.get('/me/projects', auth, (req, res) => res.json(projects))

app.listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}`))