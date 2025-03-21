import { Users, SquareUserRound, LogOut, Car,LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../features/Login/loginSlice";

function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user_id = localStorage.getItem("user_id"); // Replace with actual user ID logic

  // const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  const handleLogOut = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  // Get the first booking of the logged-in user

  return (
    <ul className="p-0 menu bg-base-200 w-[150px] gap-10 text-base-content h-full">
      
      <li>
        <Link to={``}>
        <LayoutDashboard />
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="available_properties">
          <Car />
          Available Properties
        </Link>
      </li>
      <li>
        <details>
          <summary>
            <Users />
            Transactions
             History{" "}
          </summary>
          <ul>
            {/* <li><Link to="/payments"> My Payments</Link></li> */}
            <li>
              <Link to="mybookings">My Bookings</Link>
            </li>
            <li>
              <Link to="mytransactions">My Transactions</Link>
            </li>
          </ul>
        </details>
      </li>
      {/* <li>
        <Link to="singleUserWithTickets">
          <Ticket />
          My Tickets
        </Link>
      </li> */}
      <li>
        <Link to="my_profile">
          <SquareUserRound />
          My Profile
        </Link>
      </li>
      <li>
        <button onClick={handleLogOut} className="btn-link hover:font-semibold hover:text-lg">
          <LogOut />
          Logout
        </button>
      </li>
      {/* <li>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Home
        </Link>
      </li> */}
    </ul>
  );
}

export default SideNav;