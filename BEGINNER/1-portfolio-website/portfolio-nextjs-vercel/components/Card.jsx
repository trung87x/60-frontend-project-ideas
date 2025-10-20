export default function Card({ title, children, actions }) {
  return (
    <article className="card p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{children}</div>
      {actions && <div className="mt-3 flex gap-3">{actions}</div>}
    </article>
  )
}
