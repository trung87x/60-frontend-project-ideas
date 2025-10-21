
# Expense Report Generator — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /reports?limit=` → list
- `GET /reports/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/reports` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4111
```
