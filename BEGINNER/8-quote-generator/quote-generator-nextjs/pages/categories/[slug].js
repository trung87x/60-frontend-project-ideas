import Head from 'next/head'
import Link from 'next/link'
import quotes from '../../data/quotes.json'

export async function getStaticPaths(){
  const categories = [...new Set(quotes.map(q => q.category))]
  const paths = categories.map(slug => ({ params: { slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const { slug } = params
  const list = quotes.filter(q => q.category === slug)
  return { props: { slug, list } }
}

export default function CategoryPage({ slug, list }){
  return (
    <div className="min-h-screen bg-[#0b1020] text-[#e6e9f5] flex flex-col items-center justify-center p-6 font-[Inter]">
      <Head>
        <title>{slug} Quotes — Quote Generator</title>
        <meta name="description" content={`Các câu trích dẫn thuộc chủ đề ${slug}.`} />
      </Head>
      <main className="w-full max-w-2xl">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-extrabold capitalize">{slug} Quotes</h1>
          <Link href="/" className="text-slate-400 underline">← Back</Link>
        </header>
        <ul className="space-y-4">
          {list.map((q, i) => (
            <li key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <blockquote className="text-lg font-medium mb-1">“{q.text}”</blockquote>
              <p className="text-slate-400 text-sm">— {q.author}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
