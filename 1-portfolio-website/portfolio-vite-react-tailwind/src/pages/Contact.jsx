import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [ok, setOk] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  async function onSubmit(e) {
    e.preventDefault()
    // Demo: giả lập submit
    await new Promise(r => setTimeout(r, 400))
    setOk(true)
  }

  return (
    <section className="py-16 md:py-20 bg-white/50 dark:bg-slate-900/40">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Liên hệ</h2>
          {!ok ? (
            <form onSubmit={onSubmit} className="mt-4 grid gap-3 max-w-lg">
              <label className="grid gap-1">
                <span>Họ tên</span>
                <input className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" name="name" value={form.name} onChange={onChange} required />
              </label>
              <label className="grid gap-1">
                <span>Email</span>
                <input type="email" className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" name="email" value={form.email} onChange={onChange} required />
              </label>
              <label className="grid gap-1">
                <span>Nội dung</span>
                <textarea rows="5" className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" name="message" value={form.message} onChange={onChange} required />
              </label>
              <button className="btn btn-primary">Gửi</button>
            </form>
          ) : (
            <div className="mt-4 p-4 rounded-xl border border-green-700 bg-green-900/30 text-green-200">
              ✅ Cảm ơn {form.name}! Tin nhắn đã được gửi (demo).
            </div>
          )}
        </div>
        <div className="card">
          <img className="w-full h-auto" src="https://picsum.photos/seed/contact-vite/960/720" alt="Liên hệ" />
        </div>
      </div>
    </section>
  )
}
