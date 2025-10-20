import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function App(){
  return (
    <HelmetProvider>
      <Helmet>
        <title>Social Profile — Home</title>
        <meta name="description" content="Trang hồ sơ mạng xã hội demo với Router và SEO." />
      </Helmet>
      <main style={{maxWidth:960,margin:'0 auto',padding:16}}>
        <h1>Social Profile</h1>
        <p>Đi đến hồ sơ: <Link to="/user/1">/user/1</Link></p>
      </main>
    </HelmetProvider>
  )
}
