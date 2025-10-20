import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/App.jsx'
import User from './routes/User.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App/> },
  { path: '/user/:id', element: <User/> },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
