import SearchBar from '@/components/SearchBar'
import UnitToggle from '@/components/UnitToggle'
import CurrentCard from '@/components/CurrentCard'
import ForecastList from '@/components/ForecastList'
import { fetchCurrent, fetchForecast } from '@/lib/weather'

export default async function Home({ searchParams }: { searchParams: { units?: 'metric'|'imperial' } }) {
  const units = (searchParams?.units ?? process.env.DEFAULT_UNITS ?? 'metric') as 'metric'|'imperial'
  const city = process.env.DEFAULT_CITY ?? 'Ho Chi Minh'

  const [cur, list] = await Promise.all([
    fetchCurrent(city, units),
    fetchForecast(city, units),
  ])

  return (
    <>
      <header>
        <div className="container row header__row">
          <h1>Weather <span className="brand">App</span> — <span style={{opacity:.7}}>Level 6 (Next.js)</span></h1>
          <div className="row" style={{gridTemplateColumns:'1fr auto', alignItems:'center'}}>
            <SearchBar defaultCity={city} />
            {/* client toggle updates ?units param */}
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
