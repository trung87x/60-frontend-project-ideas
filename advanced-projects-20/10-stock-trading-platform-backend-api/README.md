
# Stock Trading Platform — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /symbols?limit=` → list
- `GET /symbols/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/symbols` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4108
```
