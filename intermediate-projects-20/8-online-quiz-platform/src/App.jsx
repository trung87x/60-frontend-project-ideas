import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API = 'https://opentdb.com/api.php?amount=10&type=multiple'

export default function App(){
  const { data, isLoading } = useQuery({ queryKey:['quiz'], queryFn: async()=> (await axios.get(API)).data.results })
  const [i,setI]=React.useState(0)
  const [score,setScore]=React.useState(0)

  if(isLoading) return <div className="container">Đang tải đề…</div>
  const q = data[i]

  const options = React.useMemo(()=>{
    const arr = [...q.incorrect_answers, q.correct_answer]
    return arr.sort(()=>Math.random()-0.5)
  },[i])

  const choose = (a)=>{
    if(a===q.correct_answer) setScore(s=>s+1)
    setI(x=> x+1 < data.length ? x+1 : x)
  }

  return (
    <div className="container">
      <h1>Online Quiz Platform</h1>
      <div className="card">
        <div dangerouslySetInnerHTML={{__html: q.question}} />
        <div className="grid" style={{marginTop:12}}>
          {options.map((o,idx)=>(
            <button className="btn" key={idx} onClick={()=>choose(o)} dangerouslySetInnerHTML={{__html:o}} />
          ))}
        </div>
        <div style={{marginTop:12}}><b>Điểm:</b> {score}/{data.length}</div>
      </div>
    </div>
  )
}
