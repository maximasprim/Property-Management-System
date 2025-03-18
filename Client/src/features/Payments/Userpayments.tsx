// src/components/UserPayments.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUserWithPaymentsQuery } from "../users/usersApi";

const UserPayments: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");


  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const { data, isLoading, error } = useFetchUserWithPaymentsQuery(Number(userId));
  const user = Array.isArray(data) && data.length > 0 ? data[0] : undefined;

  console.log("Fetched User Payments:", user);

  if (isLoading) return <p className="text-center text-lg">Loading payments...</p>;
  if (error || !user) return <p className="text-center text-red-500">Failed to load user payments.</p>;

  return (
    <div className="max-w-8xl mx-auto p-6 ">
      <div className="flex justify-center items-center w-full">

      <h1 className="text-3xl font-bold mb-6 ">User Payment History</h1>
      </div>

      <div className="bg-gray-800 shadow-md p-6 rounded-lg h-screen overflow-y-auto ">
        <div className="flex flex-col justify-center items-center ">
          <div>

        <h2 className="text-xl font-semibold">{user.full_name}</h2>
        <p className="text-gray-400"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-400"><strong>Phone:</strong> {user.contact_phone || "N/A"}</p>
        <p className="text-gray-400"><strong>Address:</strong> {user.address || "N/A"}</p>
          </div>
          <div>

        <h3 className="text-[30px] font-semibold mt-4">My Payments</h3>
          </div>
        </div>
        {user.payments && user.payments.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 mt-2 w-full ">
            {user.payments.map((payment: any) => (
              <div key={payment.payment_id} className="border rounded-lg p-4 shadow-md ">
                <p><strong>Transaction ID:</strong> {payment.transaction_id}</p>
                <p><strong>Property Name:</strong> {payment.property_name}</p>
                <p><strong>Property Type:</strong> {payment.property_type}</p>
                <p><strong>Amount Paid:</strong> ${payment.amount?.toLocaleString()}</p>
                <p><strong>Payment Method:</strong> {payment.payment_method}</p>
                <p><strong>Status:</strong> {payment.status}</p>
                <p><strong>Transaction Date:</strong> {payment.transaction_date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPayments;
