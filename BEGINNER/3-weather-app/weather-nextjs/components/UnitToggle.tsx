'use client'
import React from 'react'

export default function UnitToggle({ units }: { units: 'metric'|'imperial' }) {
  const [u, setU] = React.useState(units)
  function set(un: 'metric'|'imperial'){
    setU(un)
    const url = new URL(window.location.href)
    url.searchParams.set('units', un)
    window.location.assign(url.toString())
  }
  return (
    <div className="unit-toggle" role="group" aria-label="Đổi đơn vị nhiệt độ">
      <button className={'btn ' + (u==='metric'?'active':'')} onClick={()=>set('metric')}>°C</button>
      <button className={'btn ' + (u==='imperial'?'active':'')} onClick={()=>set('imperial')}>°F</button>
    </div>
  )
}
