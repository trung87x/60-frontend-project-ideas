
# Weather Forecast With Ai — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /locations?limit=` → list
- `GET /locations/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/locations` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4107
```
