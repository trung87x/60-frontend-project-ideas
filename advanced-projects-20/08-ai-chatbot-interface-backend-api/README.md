
# Ai Chatbot Interface — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /conversations?limit=` → list
- `GET /conversations/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/conversations` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4106
```
