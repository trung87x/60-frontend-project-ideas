
# Blog Platform — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /posts?limit=` → list
- `GET /posts/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/posts` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4100
```
