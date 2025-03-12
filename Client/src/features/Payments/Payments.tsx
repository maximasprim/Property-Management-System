import { useFetchPaymentsQuery } from "./PaymentsApi";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { PropagateLoader } from "react-spinners";

// Function to process payments into monthly totals
const processPayments = (payments: any[]) => {
  const groupedData: { [key: string]: number } = {};

  payments.forEach((payment) => {
    const month = new Date(payment.transaction_date).toISOString().slice(0, 7); // YYYY-MM format
    if (!groupedData[month]) {
      groupedData[month] = 0;
    }
    groupedData[month] += payment.amount; // Sum total amount per month
  });

  // Convert object into array for Recharts
  return Object.entries(groupedData).map(([month, total]) => ({ month, total }));
};

const SalesChart: React.FC = () => {
  const { data: rawPayments = [], isLoading, error } = useFetchPaymentsQuery();

  // Process raw payments into monthly totals
  const salesData = processPayments(rawPayments);

  if (isLoading)
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-950 text-white">
        <PropagateLoader color="#3b82f6" size={15} />
        
      </div>
    );
  if (error) return <p className="text-red-500 text-center mt-10">Error loading sales data</p>;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-[90%] h-[90%] p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={salesData}>
            <XAxis dataKey="month" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
