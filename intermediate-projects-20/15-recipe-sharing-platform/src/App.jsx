import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function App(){
  const [q,setQ]=React.useState('chicken')
  const { data, isLoading } = useQuery({
    queryKey:['recipes',q],
    queryFn: async()=> (await axios.get('https://www.themealdb.com/api/json/v1/1/search.php', { params:{ s:q } })).data
  })

  return (
    <div className="container">
      <h1>Recipe Sharing Platform</h1>
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Từ khóa…"/>
      <div className="grid grid-3" style={{marginTop:12}}>
        {isLoading? <small>Đang tải…</small> : (data?.meals||[]).map(m=>(
          <article className="card" key={m.idMeal}>
            <img src={m.strMealThumb} style={{width:'100%',borderRadius:12}}/>
            <h2>{m.strMeal}</h2>
            <small>{m.strArea} • {m.strCategory}</small>
          </article>
        ))}
      </div>
    </div>
  )
}
