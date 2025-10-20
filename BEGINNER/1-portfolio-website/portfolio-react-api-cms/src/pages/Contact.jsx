import React from 'react'

export default function Contact() {
  return (
    <section className="py-16 md:py-20 bg-white/50 dark:bg-slate-900/40">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Liên hệ</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Tích hợp form thực tế ở cấp này tuỳ bạn chọn: Formspree, Web3Forms, hoặc API riêng.
          </p>
          <ul className="mt-3 list-disc ml-5 text-slate-700 dark:text-slate-200">
            <li>Đổi `VITE_GITHUB_USER` trong `.env` để lấy dự án của bạn.</li>
            <li>Thiết lập proxy local bằng `VITE_PROXY_TARGET` nếu CMS chặn CORS.</li>
          </ul>
        </div>
        <div className="card">
          <img className="w-full h-auto" src="https://picsum.photos/seed/contact-api/960/720" alt="Liên hệ" />
        </div>
      </div>
    </section>
  )
}
