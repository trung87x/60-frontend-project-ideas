
# Ecommerce Fullstack — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /products?limit=` → list
- `GET /products/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/products` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4103
```
