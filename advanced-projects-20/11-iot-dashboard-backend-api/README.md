
# Iot Dashboard — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /devices?limit=` → list
- `GET /devices/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/devices` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4109
```
