import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const API = "https://www.alphavantage.co/query";

export default function App() {
  const [symbol, setSymbol] = React.useState("AAPL");
  const key = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
  const { data, isLoading, error } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: async () => {
      const res = await axios.get(API, {
        params: { function: "TIME_SERIES_DAILY", symbol, apikey: key },
      });
      return res.data["Time Series (Daily)"];
    },
    enabled: !!key,
  });
  const labels = data ? Object.keys(data).slice(0, 30).reverse() : [];
  const prices = data ? labels.map((d) => parseFloat(data[d]["4. close"])) : [];

  return (
    <div className="container">
      <h1>Stock Market Tracker</h1>
      <div className="row">
        <input
          className="input"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Mã cổ phiếu (ví dụ AAPL)"
        />
      </div>
      {!key && (
        <small>Điền API key AlphaVantage trong .env để tải dữ liệu.</small>
      )}
      {isLoading ? (
        <div>Đang tải…</div>
      ) : (
        data && (
          <div className="card" style={{ marginTop: 12 }}>
            <Line
              data={{ labels, datasets: [{ label: symbol, data: prices }] }}
            />
          </div>
        )
      )}
    </div>
  );
}
