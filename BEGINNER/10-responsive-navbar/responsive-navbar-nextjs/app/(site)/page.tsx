import Nav from './Nav'
export default function Page(){
  return (
    <main style={{maxWidth:960,margin:'0 auto'}}>
      <Nav />
      <section style={{padding:20}}>
        <h1>🧭 Responsive Navbar — Next.js (Home)</h1>
        <p>Active link sẽ highlight theo route hiện tại.</p>
        <div style={{height:800}} />
      </section>
    </main>
  )
}
