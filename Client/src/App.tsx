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
import Team from './components/Team'
import OurServices from './components/Services'
import Location from './features/Location/location'
// import Reviews from './features/Reviews/Review'
// import Houses from './features/Houses/Houses'
import FeaturedVehicles from './features/Vehicles/FeaturedVehicle'
import LandsList from './features/Lands/FeaturedLands'
import HousesList from './features/Houses/FeaturedHouses'
import UsersList from './features/users/users'
// import ReusableForm from './components/inputForm'
import UserDetails from './features/users/singleUserComponent'
import AdminDashboard from './features/ADMIN/Dashboardlayout'
import Vehicles from './features/Vehicles/Vehicles'
import AddForm from './pages/AddComponent'
import Houses from './features/Houses/Houses'
import Lands from './features/Lands/Lands'
// import Locations from './features/Location/Locations'
import PropertiesList from './features/All_PropertyTypes/Property'
import PropertyDetails from './features/All_PropertyTypes/PropertyDetails'
import CustomerReviews from './features/Reviews/Reviews'
import Bookings from './features/Bookings/Bookings'
import AllBookings from './features/Bookings/Summary'
import UserDashboard from './features/USER/dashboardLayout'
import UserProfile from './features/users/UserProfile'
import UserBookings from './features/Bookings/BookingsWithUser'
import UserPayments from './features/Payments/Userpayments'
import PaymentSuccess from './features/Stripe/success'
import PaymentCancel from './features/Stripe/cancel'
import AvailableProperties from './features/All_PropertyTypes/Availableproperties'
import Branches from './features/Location/Branches'
import SalesChart from './features/Payments/Payments'
import CustomerReview from './features/Reviews/Review'
// import MpesaPaymentButton from './features/Mpesa/mpesa'
import PaymentCallback from './features/Mpesa/callback'
// import BookingDetails from './features/Bookings/SingleBookingDetails'
// import ImageUploadWidget from './components/CloudinaryUploadForm'
// import VehicleHistoryForm from './features/VehiclesHistory/inputhistoryform'



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
      path: 'properties',
      element: <PropertiesList />,
      errorElement: <Error />
    },
    {
      path: 'paymentsuccess',
      element: <PaymentSuccess />,
      errorElement: <Error />
    },
    {
      path: 'paymentcancel',
      element: <  PaymentCancel />,
      errorElement:<Error/>,
    },
    {
      path: 'properties/:id',
      element: <PropertyDetails />,
      errorElement: <Error />
    },
    // {
    //   path: 'imageUpload',
    //   element: <ImageUploadWidget />,
    //   errorElement: <Error />
    // },
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
      path: 'services',
      element: <OurServices />,
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
    {
      path: 'ourTeam',
      element: <Team/>,
      errorElement: <Error />
    },
    {
      path: 'locations',
      element: <Location/>,
      errorElement: <Error />
    },
    {
      path: 'reviews',
      element: <CustomerReview />,
      errorElement: <Error />
    },
    // {
    //   path: 'houses',
    //   element: <Houses/>,
    //   errorElement: <Error />
    // },
    {
      path: 'vehicleshistory',
      element: <FeaturedVehicles/>,
      errorElement: <Error />
    },
    
    {
      path: 'lands',
      element: <LandsList/>,
      errorElement: <Error />
    },
    {
      path: 'houses',
      element: <HousesList/>,
      errorElement: <Error />
    },
    // {
    //   path:'vehicle_history_input',
    //   element: <VehicleHistoryForm/>,
    //   errorElement: <Error />,
    // },
    {
      path:'users/:user_id',
      element: <UserDetails/>,
      errorElement: <Error />,
    },

    //ADMIN DASHBOARD
    {
      path:'admin',
      element: <Appi />,
      errorElement: <Error />,
      children:[
        {
          index: true,
          element: <AdminDashboard />,
          errorElement:<Error/>,
        },
        {
          path:'users',
          element: <UsersList/>,
          errorElement: <Error />,
        },
        {
          path:'dashboardpage',
          element: <AdminDashboard/>,
          errorElement: <Error />,
        },
        
        {
          path:'vehicles_details',
          element: <Vehicles/>,
          errorElement: <Error />,
        },
        
        {
          path:'houses_details',
          element: <Houses/>,
          errorElement: <Error />,
        },
        {
          path:'lands_details',
          element: <Lands/>,
          errorElement: <Error />,
        },
        {
          path: 'our_locations',
          element: <Branches/>,
          errorElement: <Error />
        },
        
        {
          path:'add_property',
          element: <AddForm/>,
          errorElement: <Error />,
          children:[
            
          ]
        },
                
        {
          path:'customer_reviews',
          element: <CustomerReviews/>,
          errorElement: <Error />,
        },
        {
          path:'bookings',
          element: <Bookings/>,
          errorElement: <Error />,
        },
        {
          path:'bookingsSummary',
          element: <AllBookings/>,
          errorElement: <Error />,
        },
        {
          path:'sales_chart',
          element: <SalesChart/>,
          errorElement: <Error />,
        },
        // {
        //   path:'booking_details/:id',
        //   element: <BookingDetails/>,
        //   errorElement: <Error />,
        // },
        
      ]
    },

    //USER DASHBOARD
    {
      path:'dashboard',
      element: <Dashboard/>,
      errorElement: <Error />,
      children:[
        
        {
          index: true,
          element: <UserDashboard />,
          errorElement:<Error/>,
        },
        {
          path:'my_profile',
          element: < UserProfile/>,
          errorElement: <Error />,
        },
        {
          path:'mybookings',
          element: <UserBookings/>,
          errorElement: <Error />,
        },
        {
          path:'mytransactions',
          element: <UserPayments/>,
          errorElement: <Error />,
        },
        {
          path: 'available_properties',
          element: <AvailableProperties />,
          errorElement: <Error />
        },
        {
          path: 'callback',
          element: <PaymentCallback />,
          errorElement: <Error />
        },
        // {
        //   path: 'mpesa_payment',
        //   element: <MpesaPaymentButton booking={{}} />,
        //   errorElement: <Error />
        // },
        
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
