import Image from 'next/image'

export default function CurrentCard(props: {
  city: string
  country: string
  temp: number
  desc: string
  icon: string
  humidity: number
  windStr: string
  time: string
}) {
  const { city, country, temp, desc, icon, humidity, windStr, time } = props
  return (
    <section className="card current" aria-labelledby="current-title">
      <h2 id="current-title" className="section-title">Thời tiết hiện tại</h2>
      <div className="current__top">
        <div>
          <div className="current__location"><span className="current__city">{city}</span> <span className="current__country">{country}</span></div>
          <div className="current__temp"><span className="current__value">{temp}</span><span className="unit">°</span></div>
          <p className="current__desc" style={{textTransform:'capitalize'}}>{desc}</p>
        </div>
        <div>
          {/* Next/Image needs absolute or allowed remote patterns; use standard img to avoid extra config */}
          <img className="current__icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} />
        </div>
      </div>
      <div className="current__meta">
        <div className="meta__item"><span>Độ ẩm:</span> <strong>{humidity}%</strong></div>
        <div className="meta__item"><span>Gió:</span> <strong>{windStr}</strong></div>
        <div className="meta__item"><span>Cập nhật:</span> <strong>{time}</strong></div>
      </div>
    </section>
  )
}
