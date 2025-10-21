
# Language Learning App — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /decks?limit=` → list
- `GET /decks/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/decks` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4116
```
