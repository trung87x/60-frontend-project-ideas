import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const DATA =
  "https://raw.githubusercontent.com/vega/vega-datasets/main/data/airports.csv";

function parseCSV(text) {
  const [header, ...rows] = text.trim().split("\n");
  const cols = header.split(",");
  return rows.slice(0, 50).map((r) => {
    const vals = r.split(",");
    const obj = {};
    cols.forEach((c, i) => (obj[c] = vals[i]));
    return obj;
  });
}

export default function App() {
  const { data } = useQuery({
    queryKey: ["airports"],
    queryFn: async () => parseCSV((await axios.get(DATA)).data),
  });

  return (
    <div className="container">
      <h1>Interactive Maps Data</h1>
      <div className="card">
        <MapContainer
          center={[20.98, 105.86]}
          zoom={3}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data?.map((a, i) => {
            const lat = parseFloat(a.latitude);
            const lon = parseFloat(a.longitude);
            if (!isFinite(lat) || !isFinite(lon)) return null;
            return (
              <Marker key={i} position={[lat, lon]}>
                <Popup>{a.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
