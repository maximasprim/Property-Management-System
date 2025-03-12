import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../Login/loginSlice';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router-dom';
// import AdminDashboard from '../../Components/Admin dashboard/AdminDashboard';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearCredentials());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="w-64 bg-blue-950 shadow-md h-screen overflow-y-auto ">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold ">Admin Dashboard</h2>
      </div>
      <nav className="p-4 " >
      <ul className="menu font-semibold	font-weight: 600 text-lg	font-size: 0.875rem w-[200px] gap-5  min-h-screen text-white	color: rgb(255 255 255)">
               
          <li>
              <Link to="">Dashboard</Link>
          </li>
          <li>
              <Link to="users">Users</Link>
          </li>
          <li>
              <Link to="vehicles_details">Vehicles</Link>
          </li>
          <li>
              <Link to="houses_details">Houses</Link>
          </li>
          <li>
              <Link to="lands_details">Lands</Link>
          </li>
          <li>
          <details>
          <summary>
            
            Bookings History{" "}
          </summary>
          <ul>
          <li>
              <Link to="bookings">Bookings</Link>
          </li>
            <li>
              <Link to="bookingsSummary">Bookings History</Link>
            </li>
            <li>
              <Link to="sales_chart">Sales Analytics</Link>
            </li>
          </ul>
        </details>
          </li>
          
          
          <li>
              <Link to="our_locations">Locations & Branches</Link>
          </li>
          <li>
              <Link to="customer_reviews">Customer Reviews</Link>
          </li>
          <li>
              <Link to="add_property">Add Property </Link>
          </li>
          
         
        </ul>
      </nav>
      <div className="p-2 mb-10 ml-10">
        <button onClick={handleLogOut} className="text-red-500 hover:text-red-700">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;