// import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Settings, Plus, Download } from "lucide-react";
import { Link } from "react-router-dom";

const data = [
  { day: "Sat", sales: 32000, rent: 25000 },
  { day: "Sun", sales: 41000, rent: 28000 },
  { day: "Mon", sales: 38000, rent: 26000 },
  { day: "Tue", sales: 42000, rent: 27000 },
  { day: "Wed", sales: 39000, rent: 26500 },
];

const AdminDashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 via-black to-gray-100 p-6 w-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-200
color: var(--color-red-200)">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Sales", value: "$89,747", change: "Up 6%"},
          { title: "List Properties", value: "836", change: "Up 4%"},
          { title: "New Leads", value: "362", change: "Up 2%"},
          { title: "Total Revenue", value: "$8,632", change: "Up 3%"},
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-gray-600">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-green-500">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Charts & Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Analytics */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Sales Analytics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="rent" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Available Listings */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Available Listings</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">72%</p>
            <p className="text-gray-600">Total Sales</p>
          </div>
          <div className="flex justify-between text-gray-600 mt-4">
            <p>United States</p>
            <p>Canada</p>
            <p>Others</p>
          </div>
        </div>
      </div>

      {/* Expenses & Top Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Expenses */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Expenses</h3>
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            <div>
              <p className="font-bold">Evergreen Villas</p>
              <p className="text-gray-600">Stockton, New Hampshire</p>
            </div>
            <p className="font-bold">$7,148</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            <div>
              <p className="font-bold">The Grand Horizon</p>
              <p className="text-gray-600">Stockton, New Hampshire</p>
            </div>
            <p className="font-bold">$7,148</p>
          </div>
        </div>

        {/* Top Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Top Performance</h3>
          <div className="space-y-2">
            {[
              { name: "The Haven Residences", value: "$8,632" },
              { name: "Golden Ridge Estates", value: "$7,450" },
              { name: "Mountainview Haven", value: "$7,200" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <p>{item.name}</p>
                <p className="font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
