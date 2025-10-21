import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function App(){
  const [q,setQ]=React.useState('spider')
  const key = import.meta.env.VITE_TMDB_KEY
  const { data, isLoading } = useQuery({
    queryKey:['movies',q],
    queryFn: async()=> (await axios.get('https://api.themoviedb.org/3/search/movie',{
      params:{ api_key:key, query:q, language:'vi-VN' }
    })).data,
    enabled: !!key
  })

  return (
    <div className="container">
      <h1>Movie Database</h1>
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Từ khóa…"/>
      {!key && <small>Điền TMDB API key trong .env</small>}
      <div className="grid grid-3" style={{marginTop:12}}>
        {isLoading? <small>Đang tải…</small> : data?.results?.map(m=>(
          <article className="card" key={m.id}>
            {m.poster_path && <img src={`https://image.tmdb.org/t/p/w342${m.poster_path}`} style={{width:'100%',borderRadius:12}}/>}
            <h2>{m.title}</h2>
            <small>⭐ {m.vote_average}</small>
          </article>
        ))}
      </div>
    </div>
  )
}
