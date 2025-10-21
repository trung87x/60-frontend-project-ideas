
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 4105
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

// ---- DEMO DATA ----
const items = [{"id": 1, "slug": "feed-one", "title": "Social Network App One", "summary": "Sample feed 1"}, {"id": 2, "slug": "feed-two", "title": "Social Network App Two", "summary": "Sample feed 2"}, {"id": 3, "slug": "feed-three", "title": "Social Network App Three", "summary": "Sample feed 3"}, {"id": 4, "slug": "feed-four", "title": "Social Network App Four", "summary": "Sample feed 4"}];

// ---- AUTH ----
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if(!email || !password) return res.status(400).json({ error: 'Missing credentials' })
  const token = jwt.sign({ sub: email, email }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ access_token: token, expires_in: 3600 })
})

function auth(req, res, next){
  const auth = req.headers.authorization || ''
  const token = auth.replace('Bearer ', '')
  if(!token) return res.status(401).json({ error: 'Unauthorized' })
  try{ jwt.verify(token, JWT_SECRET); next() }catch(e){ return res.status(401).json({ error: 'Invalid token' }) }
}

// ---- PUBLIC ----
app.get('/feed', (req, res) => {
  const limit = Number(req.query.limit || 100)
  res.json(items.slice(0, limit))
})
app.get('/feed/:slug', (req, res) => {
  const item = items.find(p => String(p.slug) === String(req.params.slug) || String(p.id) === String(req.params.slug))
  if(!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

// ---- PRIVATE ----
app.get('/me', auth, (req, res) => res.json({ email: 'demo@local', name: 'Demo User' }))
app.get('/me/feed', auth, (req, res) => res.json(items))

app.listen(PORT, () => console.log(`Social Network App API running on http://localhost:${PORT}`))
