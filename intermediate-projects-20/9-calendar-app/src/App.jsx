import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const year = new Date().getFullYear()
const API = `https://date.nager.at/api/v3/PublicHolidays/${year}/VN`

export default function App(){
  const { data } = useQuery({ queryKey:['holidays',year], queryFn: async()=> (await axios.get(API)).data })
  const [date,setDate]=React.useState(new Date().toISOString().slice(0,10))

  return (
    <div className="container">
      <h1>Calendar App</h1>
      <input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} />
      <div className="grid" style={{marginTop:12}}>
        {(data||[]).map(h=>(
          <div key={h.date} className="card">
            <b>{h.date}</b> — {h.localName}
          </div>
        ))}
      </div>
      <small>Holidays API: date.nager.at</small>
    </div>
  )
}
