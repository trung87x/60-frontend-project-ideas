import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import * as d3 from 'd3'

export default function App(){
  const { data } = useQuery({ queryKey:['covid'], queryFn: async()=> (await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')).data })
  const ref = React.useRef(null)

  React.useEffect(()=>{
    if(!data) return
    const el = ref.current
    el.innerHTML = ''
    const svg = d3.select(el).append('svg').attr('width', 700).attr('height', 300)
    const dates = Object.keys(data.cases)
    const vals = dates.map(d=> data.cases[d])
    const x = d3.scaleLinear().domain([0, dates.length-1]).range([40, 680])
    const y = d3.scaleLinear().domain([0, d3.max(vals)]).range([260, 20])
    const line = d3.line().x((_,i)=>x(i)).y(d=>y(d))
    svg.append('path').attr('d', line(vals)).attr('fill','none').attr('stroke','#2563eb').attr('stroke-width',2)
    svg.append('g').attr('transform','translate(0,260)').call(d3.axisBottom(x).ticks(6))
    svg.append('g').attr('transform','translate(40,0)').call(d3.axisLeft(y).ticks(6))
  },[data])

  return (
    <div className="container">
      <h1>Interactive Data Visualization</h1>
      <div className="card" ref={ref}></div>
      <small>Data: disease.sh • Chart: D3</small>
    </div>
  )
}
