
# Real Estate Listing App — Mock Backend API

Endpoints (HS256 JWT demo):
- `POST /auth/login` → `{ access_token, expires_in }`
- `GET /listings?limit=` → list
- `GET /listings/:slug` → detail (by `slug` or `id`)
- `GET /me` (Bearer)
- `GET /me/listings` (Bearer)

## Run
```bash
npm i
npm run dev
# -> http://localhost:4102
```
