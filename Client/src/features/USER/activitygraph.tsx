import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { Clock } from "lucide-react";

const UserActivityGraph = () => {
  const [lastActive, setLastActive] = useState("2 hours ago");
  const [totalHours, setTotalHours] = useState(34);

  // Example data: User's active time per day
  const data = [
    { day: "Mon", hours: 3 },
    { day: "Tue", hours: 5 },
    { day: "Wed", hours: 4 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 2 },
    { day: "Sat", hours: 7 },
    { day: "Sun", hours: 4 },
  ];

  useEffect(() => {
    // Simulating fetching last active and total hours from API
    setLastActive("1 hour ago");
    setTotalHours(38);
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg  w-full ">
      <h2 className="text-xl font-semibold mb-4 text-gray-500">User Activity</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Last Active: <span className="font-semibold">{lastActive}</span></p>
        <p className="text-gray-600">Total Hours: <span className="font-semibold">{totalHours} hrs</span></p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="#4CAF50" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityGraph;
