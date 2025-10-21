
# Machine Learning Dashboard — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /models?limit=` → list
- `GET /models/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/models` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4115
```
