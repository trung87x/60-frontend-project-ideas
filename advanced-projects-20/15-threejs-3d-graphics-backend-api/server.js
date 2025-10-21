
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 4113
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

// ---- DEMO DATA ----
const items = [{"id": 1, "slug": "scenes-one", "title": "Threejs 3D Graphics One", "summary": "Sample scenes 1"}, {"id": 2, "slug": "scenes-two", "title": "Threejs 3D Graphics Two", "summary": "Sample scenes 2"}, {"id": 3, "slug": "scenes-three", "title": "Threejs 3D Graphics Three", "summary": "Sample scenes 3"}, {"id": 4, "slug": "scenes-four", "title": "Threejs 3D Graphics Four", "summary": "Sample scenes 4"}];

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
app.get('/scenes', (req, res) => {
  const limit = Number(req.query.limit || 100)
  res.json(items.slice(0, limit))
})
app.get('/scenes/:slug', (req, res) => {
  const item = items.find(p => String(p.slug) === String(req.params.slug) || String(p.id) === String(req.params.slug))
  if(!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

// ---- PRIVATE ----
app.get('/me', auth, (req, res) => res.json({ email: 'demo@local', name: 'Demo User' }))
app.get('/me/scenes', auth, (req, res) => res.json(items))

app.listen(PORT, () => console.log(`Threejs 3D Graphics API running on http://localhost:${PORT}`))
