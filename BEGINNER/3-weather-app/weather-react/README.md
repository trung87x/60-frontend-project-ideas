# weather-level4-vite
Vite + React template .

## Chạy tại local
```bash
npm i
cp .env.example .env.local   # điền API key OpenWeatherMap
npm run dev
```
Mở URL Vite in ra (thường là http://localhost:5173).

## Biến môi trường (.env.local)
- `VITE_WEATHER_API_KEY` — API key từ https://openweathermap.org/api
- `VITE_DEFAULT_CITY` — ví dụ: Ho Chi Minh
- `VITE_DEFAULT_UNITS` — `metric` | `imperial`
- `VITE_APP_LABEL` — nhãn hiển thị trên header

## Ghi chú
- Fetch `weather` & `forecast` (lấy 5 mốc gần nhất).
- Có skeleton, error state.
