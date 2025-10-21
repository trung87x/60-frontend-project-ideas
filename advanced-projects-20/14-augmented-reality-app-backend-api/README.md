
# Augmented Reality App — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /scenes?limit=` → list
- `GET /scenes/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/scenes` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4112
```
