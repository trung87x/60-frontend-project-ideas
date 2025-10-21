import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RATE_API = "https://open.er-api.com/v6/latest/USD";

export default function App() {
  const { data } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => (await axios.get(RATE_API)).data,
    staleTime: 3600_000,
  });
  const [items, setItems] = React.useState([]);
  const [text, setText] = React.useState("");
  const [amt, setAmt] = React.useState("");
  const [currency, setCurrency] = React.useState("USD");

  const add = (e) => {
    e.preventDefault();
    if (!text || !amt) return;
    setItems((x) => [
      ...x,
      { id: Date.now(), text, amount: parseFloat(amt), currency },
    ]);
    setText("");
    setAmt("");
  };
  const totalUSD = items.reduce((s, i) => {
    const rate =
      i.currency === "USD"
        ? 1
        : data?.rates?.[i.currency]
        ? 1 / data.rates[i.currency]
        : 1;
    return s + i.amount * rate;
  }, 0);

  const curKeys = ["USD", "EUR", "VND", "JPY", "GBP"].filter(
    (k) => k in (data?.rates || {}) || k === "USD"
  );

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <form className="row" onSubmit={add}>
        <input
          className="input"
          placeholder="Nội dung"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Số tiền"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />
        <select
          className="input"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {curKeys.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <button className="btn">Thêm</button>
      </form>

      <div className="grid" style={{ marginTop: 12 }}>
        {items.map((i) => (
          <div
            className="card row"
            key={i.id}
            style={{ justifyContent: "space-between" }}
          >
            <div>{i.text}</div>
            <div>
              {i.amount} {i.currency}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <b>Tổng quy USD: ${totalUSD.toFixed(2)}</b>
        <br />
        <small>Tỷ giá từ open.er-api.com</small>
      </div>
    </div>
  );
}
