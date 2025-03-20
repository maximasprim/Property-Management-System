// src/components/UserPaymentsChart.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useFetchUserWithPaymentsQuery } from "../users/usersApi";

const UserPaymentsChart: React.FC = () => {
  const userId = localStorage.getItem("user_id");
  const { data, isLoading, error } = useFetchUserWithPaymentsQuery(Number(userId));
  const user = Array.isArray(data) && data.length > 0 ? data[0] : undefined;

  if (isLoading) return <p className="text-center text-lg">Loading payment data...</p>;
  if (error || !user) return <p className="text-center text-red-500">Failed to load user payments.</p>;

  const paymentData = user.payments?.map((payment: any, index: number) => ({
    name: payment.property_name || `Payment ${index + 1}`,
    amount: payment.amount,
  })) || [];

  return (
    <div className="w-full h-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-black mb-4">Payment Amounts Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={paymentData}>
          <XAxis dataKey="name" stroke="#000" tick={{ fontWeight: 'bold', fill: '#333' }} />
          <YAxis stroke="#000" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', fontWeight: 'bold' }} />
          <Bar dataKey="amount" fill="#1E3A8A" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPaymentsChart;
