import { Link } from "react-router-dom";
import logo from "../assets/Business_logo-removebg-preview.png";
const Topbanner = () => {

return(
<div className="flex items-center justify-between bg-gray-400 p-4 h-[60px] shadow-md">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="TrueEstae Property Management" className="h-12" />
          <div className="text-green-800 text-sm font-medium">
            <p>"We are your local resource and caring professional serving You From Wherever You Are"</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-gray-800 font-medium">Welcome!</p>
          <Link to="/register">
  <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
    Join Us !
  </button>
</Link>
<p className="text-gray-600">
      <Link to="/login" className="text-blue-700 hover:underline">
        User Login
      </Link>{" "}
      |{" "}
      <Link to="/login" className="text-blue-700 hover:underline">
        Admin Login
      </Link>
    </p>
        </div>
      </div>
)
}

export default Topbanner;