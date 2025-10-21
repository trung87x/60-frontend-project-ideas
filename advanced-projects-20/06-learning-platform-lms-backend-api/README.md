
# Learning Platform Lms — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /courses?limit=` → list
- `GET /courses/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/courses` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4104
```
