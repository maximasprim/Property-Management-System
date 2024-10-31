// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'

// import './App.css'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
