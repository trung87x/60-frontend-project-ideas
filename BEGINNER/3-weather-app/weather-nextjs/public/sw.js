const CACHE = 'wx-v1'
const STATIC_ASSETS = ['/', '/manifest.webmanifest']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC_ASSETS)))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  // Cache First for static same-origin
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(res => res || fetch(e.request).then(resp => {
        const copy = resp.clone()
        caches.open(CACHE).then(c => c.put(e.request, copy))
        return resp
      }))
    )
    return
  }
  // Stale-While-Revalidate for OpenWeather
  if (url.hostname.includes('openweathermap.org')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(resp => {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()))
          return resp
        }).catch(()=>cached)
        return cached || fetchPromise
      })
    )
  }
})
