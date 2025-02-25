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
    <div className="w-64 bg-gray-300 shadow-md h-full overflow-y-auto ">
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
      <ul className="menu font-semibold	font-weight: 600 text-lg	font-size: 0.875rem w-[200px] gap-5  min-h-screen text-black	color: rgb(255 255 255)">
               
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
          <details>
          <summary>
            
            Bookings History{" "}
          </summary>
          <ul>
          <li>
              <Link to="bookings">Bookings</Link>
          </li>
            <li>
              <Link to="bookingByUserId">Bookings History</Link>
            </li>
          </ul>
        </details>
          </li>
          <li>
              <Link to="payments">Houses</Link>
          </li>
          <li>
              <Link to="fleetManagement">Lands</Link>
          </li>
          <li>
              <Link to="ticket">Customer Tickets</Link>
          </li>
          <li>
              <Link to="locations">Locations & Branches</Link>
          </li>
          <li>
              <Link to="locations">Customer Reviews</Link>
          </li>
          <li>
              <Link to="add_property">Add Property </Link>
          </li>
          
          <li>
              <Link to="cloudinary">My Gallery</Link>
          </li>
        
        </ul>
      </nav>
      <div className="p-4">
        <button onClick={handleLogOut} className="text-red-700 hover:text-blue-600">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;