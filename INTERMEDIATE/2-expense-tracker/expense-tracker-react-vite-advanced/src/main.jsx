import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './routes/Home.jsx'
import Stats from './routes/Stats.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Home/> },
  { path: '/stats', element: <Stats/> },
])

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
)
