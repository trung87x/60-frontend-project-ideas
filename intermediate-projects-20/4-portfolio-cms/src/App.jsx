import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const qc = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => (await axios.get(API + "?_limit=6")).data,
  });
  const addMut = useMutation({
    mutationFn: async (payload) => (await axios.post(API, payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });

  const onAdd = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const body = e.target.body.value.trim();
    if (!title || !body) return;
    addMut.mutate({ title, body });
    e.target.reset();
  };

  return (
    <div className="container">
      <h1>Portfolio CMS (Demo API)</h1>
      <form className="card grid" onSubmit={onAdd}>
        <input name="title" className="input" placeholder="Tên dự án" />
        <textarea
          name="body"
          className="input"
          placeholder="Mô tả ngắn"
        ></textarea>
        <button className="btn">Thêm dự án</button>
        <small>Dùng jsonplaceholder để demo CRUD.</small>
      </form>
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        {isLoading ? (
          <small>Đang tải…</small>
        ) : (
          posts?.map((p) => (
            <article className="card" key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
