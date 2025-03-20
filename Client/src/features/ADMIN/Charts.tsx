import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
} from "recharts";

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

const Charts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-300 text-white">
      {/* Sales Overview */}
      <div className="bg-blue-950 rounded-xl p-6">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <p className="text-sm text-green-400">(+5%) more in 2021</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#1e3a8a"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
          <StatCard label="Users" value="32,984" />
          <StatCard label="Clicks" value="2.42m" />
          <StatCard label="Sales" value="2,400$" />
          <StatCard label="Items" value="320" />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center">
    <p className="text-blue-400 text-xl font-bold">{value}</p>
    <p className="text-sm opacity-80">{label}</p>
  </div>
);

export default Charts;
