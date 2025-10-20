export default function ContactPage() {
  return (
    <section className="py-16 md:py-20 bg-white/50 dark:bg-slate-900/40">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Liên hệ</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Tích hợp form thực bằng API Route, Formspree, hoặc serverless function trên Vercel.</p>
          <ul className="mt-3 list-disc ml-5 text-slate-700 dark:text-slate-200">
            <li>Thiết lập <code>NEXT_PUBLIC_GITHUB_USER</code> & <code>NEXT_PUBLIC_SITE_URL</code>.</li>
            <li>ISR: các trang động revalidate 5 phút.</li>
          </ul>
        </div>
        <div className="card">
          <img className="w-full h-auto" src="https://picsum.photos/seed/next-contact/960/720" alt="Liên hệ" />
        </div>
      </div>
    </section>
  )
}
