import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function App(){
  const { data:users } = useQuery({ queryKey:['users'], queryFn: async()=> (await axios.get('https://jsonplaceholder.typicode.com/users')).data })
  const { data:posts } = useQuery({ queryKey:['posts'], queryFn: async()=> (await axios.get('https://jsonplaceholder.typicode.com/posts')).data })

  const stats = React.useMemo(()=>{
    if(!users||!posts) return []
    return users.map(u=>({ user:u, count: posts.filter(p=>p.userId===u.id).length }))
  },[users,posts])

  return (
    <div className="container">
      <h1>Social Media Dashboard</h1>
      <div className="grid grid-3">
        {stats.map(s=>(
          <div className="card" key={s.user.id}>
            <h2>{s.user.name}</h2>
            <div>Bài đăng: <b>{s.count}</b></div>
            <small>@{s.user.username}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
