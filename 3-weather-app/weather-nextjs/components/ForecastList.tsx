export default function ForecastList({ items }: { items: {time:string, temp:number, icon:string, desc:string}[] }){
  return (
    <section className="card forecast" aria-labelledby="forecast-title">
      <h2 id="forecast-title" className="section-title">Dự báo 5 phiên</h2>
      <ul className="forecast__list">
        {items.map((it, idx)=>(
          <li className="forecast__item" key={idx}>
            <img className="forecast__icon" src={`https://openweathermap.org/img/wn/${it.icon}@2x.png`} alt={it.desc} />
            <div className="forecast__time">{it.time}</div>
            <div className="forecast__temp">{it.temp}°</div>
            <div className="forecast__desc" style={{textTransform:'capitalize'}}>{it.desc}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
