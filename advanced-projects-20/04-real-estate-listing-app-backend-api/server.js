
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 4102
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

// ---- DEMO DATA ----
const items = [{"id": 1, "slug": "listings-one", "title": "Real Estate Listing App One", "summary": "Sample listings 1"}, {"id": 2, "slug": "listings-two", "title": "Real Estate Listing App Two", "summary": "Sample listings 2"}, {"id": 3, "slug": "listings-three", "title": "Real Estate Listing App Three", "summary": "Sample listings 3"}, {"id": 4, "slug": "listings-four", "title": "Real Estate Listing App Four", "summary": "Sample listings 4"}];

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
app.get('/listings', (req, res) => {
  const limit = Number(req.query.limit || 100)
  res.json(items.slice(0, limit))
})
app.get('/listings/:slug', (req, res) => {
  const item = items.find(p => String(p.slug) === String(req.params.slug) || String(p.id) === String(req.params.slug))
  if(!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

// ---- PRIVATE ----
app.get('/me', auth, (req, res) => res.json({ email: 'demo@local', name: 'Demo User' }))
app.get('/me/listings', auth, (req, res) => res.json(items))

app.listen(PORT, () => console.log(`Real Estate Listing App API running on http://localhost:${PORT}`))
