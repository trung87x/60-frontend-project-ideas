
# Blockchain Explorer — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /blocks?limit=` → list
- `GET /blocks/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/blocks` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4114
```
