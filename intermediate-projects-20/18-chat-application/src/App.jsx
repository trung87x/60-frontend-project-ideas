export default function App(){
  const [msgs,setMsgs]=React.useState([])
  const [text,setText]=React.useState('')
  const bc = React.useMemo(()=> new BroadcastChannel('chat'),[])

  React.useEffect(()=>{
    bc.onmessage = (e)=> setMsgs(m=>[...m, e.data])
    return ()=> bc.close()
  },[])

  const send = (e)=>{
    e.preventDefault()
    const m = { id:Date.now(), user:'Me', text }
    setMsgs(x=>[...x, m]); setText('')
    bc.postMessage({ ...m, user:'Peer' })
  }

  return (
    <div className="container">
      <h1>Chat Application (Realtime Mock)</h1>
      <div className="card" style={{height:300,overflow:'auto'}}>
        {msgs.map(m=>(<div key={m.id}><b>{m.user}:</b> {m.text}</div>))}
      </div>
      <form className="row" onSubmit={send}>
        <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="Nhập tin nhắn…"/>
        <button className="btn">Gửi</button>
      </form>
      <small>Realtime mock: BroadcastChannel (mở 2 tab để test).</small>
    </div>
  )
}
