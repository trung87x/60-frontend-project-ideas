import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CITIES = [
  { name: "Hanoi", lat: 21.0245, lon: 105.8412 },
  { name: "Ho Chi Minh City", lat: 10.8231, lon: 106.6297 },
  { name: "Da Nang", lat: 16.0471, lon: 108.2068 },
];

const fetchWeather = async ({ queryKey }) => {
  const { lat, lon } = queryKey[1];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await axios.get(url);
  return res.data.current_weather;
};

export default function App() {
  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <div className="grid grid-3">
        {CITIES.map((c) => (
          <CityCard key={c.name} city={c} />
        ))}
      </div>
    </div>
  );
}

function CityCard({ city }) {
  const { data, isLoading } = useQuery({
    queryKey: ["w", city],
    queryFn: fetchWeather,
  });
  return (
    <article className="card">
      <h2>{city.name}</h2>
      {isLoading ? (
        <small>Đang tải…</small>
      ) : (
        <div>
          <div>Nhiệt độ: {data?.temperature}°C</div>
          <div>Gió: {data?.windspeed} km/h</div>
        </div>
      )}
    </article>
  );
}
