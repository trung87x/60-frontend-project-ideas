
# Astronomy Viewer — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /apods?limit=` → list
- `GET /apods/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/apods` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4118
```
