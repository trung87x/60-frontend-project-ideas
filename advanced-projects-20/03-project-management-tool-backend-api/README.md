
# Project Management Tool — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /projects?limit=` → list
- `GET /projects/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/projects` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4101
```
