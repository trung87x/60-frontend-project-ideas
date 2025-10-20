import Nav from '../Nav'
export default function Page(){
  return (
    <main style={maxWidth:960,margin:'0 auto'}>
      <Nav />
      <section style={padding:20}>
        <h1>SEO</h1>
        <p>Trang SEO.</p>
        <div style={height:800} />
      </section>
    </main>
  )
}
