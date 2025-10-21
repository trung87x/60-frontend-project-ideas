
# Financial Planning Tool — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /plans?limit=` → list
- `GET /plans/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/plans` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4117
```
