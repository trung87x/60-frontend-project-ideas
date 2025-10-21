import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = "https://fakestoreapi.com/products";

export default function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await axios.get(API)).data,
  });
  const [cart, setCart] = React.useState([]);

  if (isLoading) return <div className="container">Đang tải…</div>;
  if (error) return <div className="container">Lỗi tải sản phẩm</div>;

  const add = (p) =>
    setCart((c) => {
      const i = c.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const cp = [...c];
        cp[i].qty++;
        return cp;
      }
      return [...c, { ...p, qty: 1 }];
    });
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="container">
      <h1>E‑Commerce Product Catalog</h1>
      <div className="grid grid-3">
        {data?.map((p) => (
          <article className="card" key={p.id}>
            <img
              src={p.image}
              alt={p.title}
              style={{ height: 140, objectFit: "contain", width: "100%" }}
            />
            <h2>{p.title}</h2>
            <small>${p.price}</small>
            <div className="row">
              <button className="btn" onClick={() => add(p)}>
                Thêm giỏ
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Giỏ hàng</h2>
        {cart.length === 0 && <small>Chưa có sản phẩm.</small>}
        {cart.map((i) => (
          <div
            key={i.id}
            className="row"
            style={{ justifyContent: "space-between" }}
          >
            <div>
              {i.title} × {i.qty}
            </div>
            <div>${(i.qty * i.price).toFixed(2)}</div>
          </div>
        ))}
        <hr />
        <b>Tổng: ${total.toFixed(2)}</b>
      </div>
    </div>
  );
}
