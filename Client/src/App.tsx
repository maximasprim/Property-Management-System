// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import About from './components/About' 
import AboutPage from './pages/AboutPage'
import Testimonials from './components/Testimonials'
import Contact from './pages/Contact'
import LoginUser from './features/Login/login'
import RegisterUser from './features/Register/Register'
import Appi from './features/ADMIN/Dashboard'
// import Layout from './features/USER/layout'
import Dashboard from './features/USER/dashboard'
import ManagementServices from './components/ManagementServices'
import VehiclesServ from './components/VehiclesSev'
import HousesServ from './components/HousesServ'
import LandServ from './components/LandServ'

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
    },
    {
      path: 'register',
      element: <RegisterUser />,
      errorElement: <Error />
    },
    {
      path: 'login',
      element: <LoginUser />,
      errorElement: <Error />
    },
    {
      path: 'managementServices',
      element: <ManagementServices />,
      errorElement: <Error />
    },
    {
      path: 'vehiclesServices',
      element: <VehiclesServ/>,
      errorElement: <Error />
    },
    {
      path: 'landServices',
      element: <LandServ/>,
      errorElement: <Error />
    },
    {
      path: 'housesServices',
      element: <HousesServ/>,
      errorElement: <Error />
    },

    //ADMIN DASHBOARD
    {
      path:'admin',
      element: <Appi />,
      errorElement: <Error />,
      children:[

      ]
    },

    //USER DASHBOARD
    {
      path:'dashboard',
      element: <Dashboard/>,
      errorElement: <Error />,
      children:[

      ]
    }
   

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
