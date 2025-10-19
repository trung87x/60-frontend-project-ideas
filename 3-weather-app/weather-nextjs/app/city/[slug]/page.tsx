import SearchBar from '@/components/SearchBar'
import UnitToggle from '@/components/UnitToggle'
import CurrentCard from '@/components/CurrentCard'
import ForecastList from '@/components/ForecastList'
import { fetchCurrent, fetchForecast } from '@/lib/weather'

interface Props { params: { slug: string }, searchParams: { units?: 'metric'|'imperial' } }

export default async function CityPage({ params, searchParams }: Props) {
  const city = decodeURIComponent(params.slug)
  const units = (searchParams?.units ?? process.env.DEFAULT_UNITS ?? 'metric') as 'metric'|'imperial'

  const [cur, list] = await Promise.all([
    fetchCurrent(city, units),
    fetchForecast(city, units),
  ])

  return (
    <>
      <header>
        <div className="container row header__row">
          <h1>Weather <span className="brand">App</span> — <span style={{opacity:.7}}>{city}</span></h1>
          <div className="row" style={{gridTemplateColumns:'1fr auto', alignItems:'center'}}>
            <SearchBar defaultCity={city} />
            <UnitToggle units={units} />
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container grid">
          <CurrentCard {...cur} />
          <ForecastList items={list} />
        </div>
      </main>

      <footer>
        <div className="container footer__row">
          <p>© 2025 Weather App — Next.js</p>
          <UnitToggle units={units} />
        </div>
      </footer>
    </>
  )
}
