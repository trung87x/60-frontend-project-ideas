// Basic Leaflet map with simple search presets and geolocation
const map = L.map('map').setView([21.028511, 105.804817], 12) // Hanoi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map)

let markers = []

function addMarker(lat, lng, label){
  const m = L.marker([lat, lng]).addTo(map).bindPopup(label || `${lat.toFixed(4)}, ${lng.toFixed(4)}`)
  markers.push(m)
  return m
}

document.getElementById('clear').onclick = () => { markers.forEach(m => map.removeLayer(m)); markers = [] }

// simple preset search (no external API)
const PRESETS = {
  'hà nội': [21.028511, 105.804817],
  'ha noi': [21.028511, 105.804817],
  'hanoi': [21.028511, 105.804817],
  'sài gòn': [10.77653, 106.700981],
  'ho chi minh': [10.77653, 106.700981],
  'da nang': [16.0544, 108.2022]
}
const statusEl = document.getElementById('status')
document.getElementById('search').onclick = () => {
  const q = (document.getElementById('q').value || '').toLowerCase().trim()
  const hit = PRESETS[q]
  if(hit){
    map.setView(hit, 12)
    addMarker(hit[0], hit[1], `📍 ${q}`)
    statusEl.textContent = ''
  }else{
    statusEl.textContent = 'Không tìm thấy (demo chỉ hỗ trợ vài địa danh mẫu)'
  }
}

// geolocation
document.getElementById('locate').onclick = () => {
  if(!navigator.geolocation){ statusEl.textContent = 'Trình duyệt không hỗ trợ Geolocation'; return }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords
    map.setView([latitude, longitude], 14)
    addMarker(latitude, longitude, '📍 Vị trí của tôi')
    statusEl.textContent = ''
  }, err => {
    statusEl.textContent = 'Không lấy được vị trí'
  })
}

// add marker on click
map.on('click', e => {
  addMarker(e.latlng.lat, e.latlng.lng)
})
