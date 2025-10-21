
# Voice Assistant Interface — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /intents?limit=` → list
- `GET /intents/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/intents` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4110
```
