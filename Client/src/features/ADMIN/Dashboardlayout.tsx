// import jelly from "../../assets/jelly fish.jpg";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bell, Settings, Plus, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookingStatistics } from "../Bookings/Summary"
import { getTotalVehicles } from "../Vehicles/Vehicles";
import { getTotalHouses } from "../Houses/Houses";
import { getTotalLands } from "../Lands/Lands";
import { useUserCount } from "../users/users";
import {useTotalReviews} from "../Reviews/Reviews";
import { useState } from "react";
import CalendarModal from "../../components/PopCalender";

const salesData = [
  { month: "Jan", sales: 200, trend: 100 },
  { month: "Feb", sales: 300, trend: 150 },
  { month: "Mar", sales: 250, trend: 130 },
  { month: "Apr", sales: 400, trend: 200 },
  { month: "May", sales: 450, trend: 230 },
  { month: "Jun", sales: 600, trend: 350 },
  { month: "Jul", sales: 500, trend: 300 },
  { month: "Aug", sales: 480, trend: 270 },
  { month: "Sep", sales: 350, trend: 190 },
  { month: "Oct", sales: 300, trend: 160 },
  { month: "Nov", sales: 250, trend: 140 },
  { month: "Dec", sales: 200, trend: 120 },
];

const barData = [
  { name: "Jan", users: 100 },
  { name: "Feb", users: 250 },
  { name: "Mar", users: 150 },
  { name: "Apr", users: 300 },
  { name: "May", users: 450 },
  { name: "Jun", users: 500 },
  { name: "Jul", users: 420 },
  { name: "Aug", users: 400 },
  { name: "Sep", users: 320 },
  { name: "Oct", users: 280 },
  { name: "Nov", users: 260 },
  { name: "Dec", users: 220 },
];

// useEffect(() => {
//     const timer = setInterval(() => {
//       setTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);


const AdminDashboard = () => {
  const { totalAmount } = useBookingStatistics();
  const { percentageChange } = useBookingStatistics();
  const { totalProfit } = useBookingStatistics();
  const totalVehicles = getTotalVehicles();
  const totalHouses = getTotalHouses();
  const totalLands = getTotalLands();
  const { totalConfirmed } = useBookingStatistics();
  // const [userId, setUserId] = useState<number | null>(null);

  const totalProperties = totalVehicles + totalHouses + totalLands;
  const totalUsers = useUserCount();
  const totalReviews = useTotalReviews();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);



  return (
    <div className="h-screen bg-gradient-to-br from-black via-blue-600 to-black p-6 w-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
      {/* <div className="text-3xl font-bold text-gray-900 mb-6">{time.toLocaleTimeString()}</div> */}
        <h1 className="text-2xl font-bold text-red-200
color: var(--color-red-200)">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link to="reports">
          <button className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg">
            <Download className="w-5 h-5" />
            <span className="text-white">Download Reports</span>
          </button>
          </Link>
          <Link to="add_property">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Plus className="w-5 h-5" />
            <span>Add New Property</span>
          </button>
          </Link>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <Settings className="w-6 h-6 text-gray-600" />
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4  text-white mb-6">
      {[
          { title: "Total Sales", value: `Ksh ${totalAmount.toFixed(2)}`, change: `${percentageChange}%` },
          { title: "All Properties", value: totalProperties, change: "Updated" },
          { title: "Sold Properties", value: `${totalConfirmed}`, change: "Up 2%" },
          { title: "Total Profit", value: `Ksh ${totalProfit}`, change: `${percentageChange}%`},
        ].map((card, idx) => (
          <div key={idx} className="bg-gradient-to-tl from-gray-700 to-blue-800 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-400">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-green-500">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Charts & Listings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-900 text-white">
      {/* Welcome Card */}
      <div className="relative bg-blue-950 rounded-xl p-6 flex flex-col justify-between h-52">
        <div>
          <h2 className="text-lg">Welcome back,</h2>
          <h1 className="text-2xl font-bold">ADMIN</h1>
          <p className="text-sm opacity-80">Glad to see you again! View your stats and reports.</p>
        </div>
        <button
        onClick={() => setIsCalendarOpen(true)}
        className="mt-4 text-blue-400 hover:underline">View Calender →
      </button>

      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      </div>

      {/* Satisfaction Rate Card */}
      <div className="bg-blue-950 rounded-xl p-6 flex flex-col items-center justify-center h-52">
        <h2 className="text-sm opacity-80">Satisfaction Rate</h2>
        <p className="text-xs opacity-60">From all coments</p>
        <Link to="customer_reviews">
        <div className="w-24 mt-4">
  <CircularProgressbar
    value={(totalReviews % 10) * 10} // Dynamically set percentage
    text={`${(totalReviews % 10) * 10}%`}
    styles={buildStyles({
      textColor: "#fff",
      pathColor: "#3b82f6",
      trailColor: "#1e3a8a",
    })}
  />
</div>
</Link>
        <p className="text-xs opacity-60 mt-2">Based On Customer Rating</p>
      </div>

      {/* Referral Tracking Card */}
      <div className="bg-blue-950 rounded-xl p-6 h-52 flex flex-col justify-between">
        <h2 className="text-sm opacity-80">Users Tracking</h2>
        <div className="flex flex-col gap-2">
          <Link to = "users">
          <p className="bg-blue-800 p-2 rounded-md">Total Users: <span className="font-bold">{totalUsers}</span></p>
          </Link>
          <Link to = "customer_reviews">
          <p className="bg-blue-800 p-2 rounded-md">Total comments <span className="font-bold">{totalReviews}</span></p>
          </Link>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="w-14">
            <CircularProgressbar
              value={93}
              text="9.3"
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#22c55e",
                trailColor: "#1e3a8a",
              })}
            />
          </div>
          {/* <p className="text-sm">Total Score</p> */}
        </div>
      </div>
    </div>

      {/* Expenses & Top Performance */}
      {/* <Link to="reports"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-900 text-white">
      {/* Sales Overview */}
      <div className="bg-blue-950 rounded-xl p-6">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <p className="text-sm text-green-400">(+5%) more in 2021</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="trend" stroke="#1e3a8a" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* </Link> */}

      {/* Active Users + Bar Chart */}
      <div className="bg-blue-950 rounded-xl p-6">
        <h2 className="text-lg font-semibold">Active Users</h2>
        <p className="text-sm text-green-400">(+23) than last week</p>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Bar dataKey="users" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-blue-400 text-xl font-bold">32,984</p>
            <p className="text-sm opacity-80">Users</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 text-xl font-bold">2.42m</p>
            <p className="text-sm opacity-80">Clicks</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 text-xl font-bold">2,400$</p>
            <p className="text-sm opacity-80">Sales</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 text-xl font-bold">320</p>
            <p className="text-sm opacity-80">Items</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
