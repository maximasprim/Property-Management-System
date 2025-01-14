// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import About from './components/About' 
import AboutPage from './pages/AboutPage'
import Testimonials from './components/Testimonials'
import Contact from './pages/Contact'

// import './App.css'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: 'about',
      element: <About />,
      errorElement: <Error />
    },
    {
      path: 'aboutUs',
      element: <AboutPage />,
      errorElement: <Error />
    },
    {
      path: 'testimonials',
      element: <Testimonials />,
      errorElement: <Error />
    },
    {
      path: 'contact',
      element: <Contact />,
      errorElement: <Error />
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
