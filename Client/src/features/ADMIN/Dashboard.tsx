import React from 'react';
import Sidebar from './Sidebar'
// import Dashboard from '../../Components/Admin dashboard/AdminDashboard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
// import AdminDashboard from './Dashboardlayout';

const Appi: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />
      {/* <AdminDashboard/> */}
      <Outlet />
    </div>
    <Footer />
    </>
  );
};

export default Appi;