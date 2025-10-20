# 🌦️ Weather App — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án mẫu giúp bạn học và áp dụng từ **HTML/CSS cơ bản → React hiện đại → Next.js production**. Kết nối **Weather API** (OpenWeatherMap/WeatherAPI), có caching, offline, và triển khai thực tế.

---

## 🎯 Mục tiêu tổng quát

- Nắm luồng dữ liệu **Client → Weather Service → UI** với trạng thái **loading / error / success**.
- Xây dựng kiến trúc tách lớp **UI / hooks / services** để thay API/CMS dễ dàng.
- Thành thạo **TanStack Query** (caching, staleTime, retry), **geolocation**, và **PWA** (offline cơ bản).
- Tối ưu **SEO/SSR** với **Next.js** và **deploy** (Vercel/Netlify).

---

## 🧩 6 Cấp Độ Weather App

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
|---|---|---|
| **1. HTML + CSS** | UI tĩnh | Layout cơ bản: **Search**, **Current Weather Card**, **Forecast List**. Responsive + typography. |
| **2. TailwindCSS** | UI hiện đại, responsive | Dùng **Tailwind** để tạo thẻ thời tiết (card), grid, dark mode cơ bản. |
| **3. React** | State & Props | Component hóa: `SearchBar`, `CurrentWeather`, `Forecast`, `UnitToggle`. Quản lý state (city, units). |
| **4. React + Weather API** | Data động | Gọi API (OpenWeatherMap/WeatherAPI). Hiển thị **nhiệt độ, mô tả, icon, độ ẩm, gió**. Xử lý **loading/error**. |
| **5. React + TanStack Query** | Caching, retry, prefetch | Tách `services/weather.ts` và `hooks/useWeatherQuery.ts`. Có **cache**, **staleTime**, **refetchOnWindowFocus**. |
| **6. Next.js + Production** | SEO/SSR + PWA + Deploy | Trang `/` (search + current), `/city/[slug]` (SSR/ISR). **Meta tags**, **Open Graph**, **PWA** cơ bản, deploy Vercel. |

---

## 🧠 Kiến thức rút ra

1. **UI cơ bản** (Cấp 1–2): layout, responsive, dark mode với Tailwind.
2. **React căn bản** (Cấp 3): chia nhỏ component, truyền dữ liệu qua props, kiểm soát render.
3. **Data fetching** (Cấp 4): fetch từ API thật, validate & map dữ liệu về **model nội bộ**.
4. **Hiện đại hóa** (Cấp 5): **TanStack Query** cho cache + prefetch, retry, network mode.
5. **Production** (Cấp 6): SEO, SSR/ISR, PWA, deploy & monitoring.

---

## ⚙️ Thiết lập & Chạy (tuỳ cấp)

### Yêu cầu
- **Node 18+**
- Có key từ một trong các dịch vụ: **OpenWeatherMap** hoặc **WeatherAPI**.

### Cấu hình `.env` (ví dụ)
```bash
# Nếu dùng Vite (Cấp 4–5)
VITE_WEATHER_API=openweathermap             # hoặc 'weatherapi'
VITE_WEATHER_API_KEY=<your_api_key>
VITE_DEFAULT_CITY=Ho Chi Minh
VITE_DEFAULT_UNITS=metric                   # 'metric' | 'imperial'

# Nếu dùng Next.js (Cấp 6)
NEXT_PUBLIC_WEATHER_API=openweathermap
NEXT_PUBLIC_WEATHER_API_KEY=<your_api_key>
NEXT_PUBLIC_DEFAULT_CITY=Ho Chi Minh
NEXT_PUBLIC_DEFAULT_UNITS=metric
```

### Chạy Dev
```bash
# Cấp 3–5 (Vite + React)
npm i
npm run dev

# Cấp 6 (Next.js)
npm i
npm run dev
```

---

## 🧱 Kiến trúc thư mục (đề xuất)

```
weather-app/
├─ public/                   # icons, manifest (PWA)
├─ src/
│  ├─ components/
│  │  ├─ SearchBar.tsx
│  │  ├─ CurrentWeather.tsx
│  │  ├─ ForecastList.tsx
│  │  └─ UnitToggle.tsx
│  ├─ hooks/
│  │  ├─ useWeatherQuery.ts   # TanStack Query (Cấp 5+)
│  │  └─ useGeolocation.ts
│  ├─ services/
│  │  ├─ weather.ts           # Gọi API, map về model nội bộ
│  │  └─ adapters/
│  │     ├─ openweathermap.ts # adapter A
│  │     └─ weatherapi.ts     # adapter B
│  ├─ pages/ or app/          # Next.js (Cấp 6)
│  ├─ lib/
│  │  └─ format.ts            # format nhiệt độ, gió, thời gian
│  └─ styles/
│     └─ globals.css
└─ .env(.local)
```

---

## 🔌 Weather Service (ý tưởng triển khai)

```ts
// services/weather.ts (pseudo)
export type Units = 'metric' | 'imperial';

export interface Current {
  city: string;
  country: string;
  temp: number;
  desc: string;
  icon: string;
  humidity: number;
  windKph: number;
  time: string;  // ISO
}

export interface ForecastItem {
  time: string;
  temp: number;
  icon: string;
  desc: string;
}

export interface WeatherBundle {
  current: Current;
  forecast: ForecastItem[];
}

export async function getWeatherByCity(city: string, units: Units): Promise<WeatherBundle> {
  // Gọi adapter theo env: openweathermap hoặc weatherapi
}
```

- **Adapter pattern**: Tách **provider** khỏi **model nội bộ** để đổi API không ảnh hưởng UI.
- **Validation**: Dùng Zod/Yup (tùy chọn) để validate response trước khi map.

---

## 🧵 Hooks — TanStack Query (Cấp 5+)

```ts
// hooks/useWeatherQuery.ts (pseudo)
import { useQuery, QueryClient } from '@tanstack/react-query';
import { getWeatherByCity } from '@/services/weather';

export function useWeatherQuery(city: string, units: 'metric'|'imperial') {
  return useQuery({
    queryKey: ['weather', city, units],
    queryFn: () => getWeatherByCity(city, units),
    staleTime: 1000 * 60 * 5,          // 5 phút
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

// Prefetch (VD: khi hover vào link /city/[slug])
export async function prefetchWeather(qc: QueryClient, city: string, units: 'metric'|'imperial') {
  await qc.prefetchQuery({
    queryKey: ['weather', city, units],
    queryFn: () => getWeatherByCity(city, units),
  });
}
```

---

## 📱 PWA cơ bản (Cấp 6)

- `manifest.webmanifest`, icon các kích thước.
- Service Worker cho:
  - Cache **static assets** (app shell).
  - Cache **API responses** ngắn hạn (stale-while-revalidate).  
- Fallback offline: hiển thị dữ liệu cache gần nhất + thông báo offline.

---

## 🧪 Testing (tùy chọn)

- **Unit**: test formatter (`format.ts`), adapter mapping (`openweathermap.ts`).
- **Integration**: mock API bằng MSW; test flow `Search → fetch → render`.
- **E2E**: Playwright/Cypress (smoke: search city, toggle units, route /city/[slug]).

---

## 🚀 Triển khai

- **Cấp 3–5**: Netlify/Vercel (Vite).  
- **Cấp 6**: Vercel (Next.js). Bật **ISR** cho `/city/[slug]` với revalidate 10–15 phút (tùy quota API).

---

## 🧭 Lựa chọn API

- **OpenWeatherMap**  
  - Endpoint phổ biến: `/data/2.5/weather`, `/data/2.5/forecast`.
  - Đơn vị: `units=metric|imperial`. Icon: `https://openweathermap.org/img/wn/{icon}@2x.png`.
- **WeatherAPI.com**  
  - Endpoint: `/v1/current.json`, `/v1/forecast.json`.
  - Nhiều trường phong phú (UV, AQI), free tier thân thiện.

> Gợi ý: Viết **2 adapter** và chọn bằng biến môi trường để luyện kiến trúc mở rộng.

---

## 🗂️ Kế hoạch file theo cấp (để commit vào repo)

- `level-1-html-css.md` — UI tĩnh + checklist responsive.
- `level-2-tailwind.md` — Thiết kế card + dark mode.
- `level-3-react.md` — State/props, cấu trúc component.
- `level-4-react-api.md` — Tích hợp API + xử lý lỗi.
- `level-5-react-query.md` — Caching, prefetch, retry.
- `level-6-next-pwa.md` — Next.js + SSR/ISR + PWA + deploy.

---

## ✅ Milestone checklist

- [ ] Tạo layout tĩnh (search, current, forecast).
- [ ] Tailwind + dark mode.
- [ ] Chuyển sang React component hóa.
- [ ] Tích hợp API (OpenWeather/WeatherAPI), xử lý loading/error.
- [ ] TanStack Query: cache, staleTime, prefetch.
- [ ] Next.js route `/city/[slug]`, SEO meta.
- [ ] PWA: manifest, SW, offline fallback.
- [ ] Deploy + đo hiệu năng (Lighthouse).

---

## ✨ Kết luận

Weather App theo 6 cấp độ sẽ giúp bạn:
- Ôn lại UI/React căn bản và nâng cấp lên **data fetching hiện đại**.
- Làm quen kiến trúc **adapter + hooks + services**.
- Sẵn sàng **deploy sản phẩm** có SEO, PWA, và trải nghiệm tốt cả khi mất mạng.

> _Tác giả: trung87.link — Lộ trình học React & Tailwind thực chiến._
