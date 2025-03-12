import { useEffect, useState } from "react";
import { useGetBookingsSummaryQuery } from "./BookingApi";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { RingLoader } from "react-spinners";

interface Booking {
  booking_id: number;
  property_type: string;
  property_name: string;
  total_amount: number;
  booking_date: string;
  status: string;
  location: string | null;
  users: {
    full_name: string;
    email: string;
  } | null;
  payments: {
    amount: number;
    status: string;
    payment_method: string;
    transaction_id: string;
  } | null;
}

export const useBookingStatistics = () => {
  const { data: bookings } = useGetBookingsSummaryQuery({});
  const [totalAmountTwoHoursAgo, setTotalAmountTwoHoursAgo] = useState<number>(0);

  // Compute the current total amount
  const totalAmount = bookings?.reduce((sum: number, booking: Booking) => sum + (booking.payments?.amount || 0), 0) || 0;

  useEffect(() => {
    const previousAmount = localStorage.getItem("totalAmountBeforeUpdate");
    if (previousAmount) {
      setTotalAmountTwoHoursAgo(parseFloat(previousAmount));
    }

    // Update stored amount before a booking addition or deletion
    if (totalAmount !== totalAmountTwoHoursAgo) {
      localStorage.setItem("totalAmountBeforeUpdate", totalAmount.toString());
      setTotalAmountTwoHoursAgo(totalAmount);
    }
  }, [totalAmount]);

  const totalBookings = bookings?.length || 0;
  const totalConfirmed = bookings?.filter((booking: Booking) => booking.status === "confirmed").length || 0;
  const totalPending = bookings?.filter((booking: Booking) => booking.status === "pending").length || 0;
  const totalCancelled = bookings?.filter((booking: Booking) => booking.status === "cancelled").length || 0;
  const totalProfit = totalAmount - totalAmountTwoHoursAgo;
  const percentageChange = totalAmountTwoHoursAgo
    ? (((totalAmount - totalAmountTwoHoursAgo) / totalAmountTwoHoursAgo) * 100).toFixed(1)
    : "0";

  return { totalBookings, totalConfirmed, totalPending, totalCancelled, totalAmount, totalAmountTwoHoursAgo, percentageChange, totalProfit };
};

const AllBookings: React.FC = () => {
  const { data: bookings, error, isLoading } = useGetBookingsSummaryQuery({});
  const { totalBookings, totalConfirmed, totalPending, totalCancelled, totalAmount, totalAmountTwoHoursAgo, percentageChange,totalProfit } = useBookingStatistics();

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  if (error)
    return <p className="text-center text-red-500">Failed to load bookings.</p>;

  return (
    <div className="p-6 bg-gray-800 shadow-md rounded-lg w-full">
      <h2 className="text-2xl font-semibold text-white mb-4">All Bookings</h2>
      
      {/* Statistics Section */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-8 gap-4 text-white">
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <p className="text-lg font-bold">Total Bookings</p>
          <p className="text-2xl">{totalBookings}</p>
        </div>
        <div className="p-4 bg-green-700 rounded-lg text-center">
          <p className="text-lg font-bold">Confirmed</p>
          <p className="text-2xl">{totalConfirmed}</p>
        </div>
        <div className="p-4 bg-yellow-700 rounded-lg text-center">
          <p className="text-lg font-bold">Pending</p>
          <p className="text-2xl">{totalPending}</p>
        </div>
        <div className="p-4 bg-red-700 rounded-lg text-center">
          <p className="text-lg font-bold">Cancelled</p>
          <p className="text-2xl">{totalCancelled}</p>
        </div>
        <div className="p-4 bg-blue-700 rounded-lg text-center">
          <p className="text-lg font-bold">Total Amount (Ksh)</p>
          <p className="text-2xl">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-purple-700 rounded-lg text-center">
          <p className="text-lg font-bold">Total Amount Before Update (Ksh)</p>
          <p className="text-2xl">${totalAmountTwoHoursAgo.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-indigo-700 rounded-lg text-center">
          <p className="text-lg font-bold">Profit Made </p>
          <p className="text-2xl">Ksh {totalProfit}</p>
        </div>
        <div className="p-4 bg-indigo-700 rounded-lg text-center">
          <p className="text-lg font-bold">% Change</p>
          <p className="text-2xl">{percentageChange}%</p>
        </div>
      </div>
      
      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="border p-2">Booking ID</th>
              <th className="border p-2">Property Type</th>
              <th className="border p-2">Property Name</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Booking Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">User Name</th>
              <th className="border p-2">User Email</th>
              <th className="border p-2">Payment Amount</th>
              <th className="border p-2">Payment Status</th>
              <th className="border p-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking: Booking) => (
              <tr key={booking.booking_id} className="text-center border-t border-gray-500">
                <td className="border p-2">{booking.booking_id}</td>
                <td className="border p-2 capitalize">{booking.property_type}</td>
                <td className="border p-2">{booking.property_name}</td>
                <td className="border p-2">Ksh {booking.total_amount}</td>
                <td className="border p-2">{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td className="border p-2 flex justify-center items-center">
                  {booking.status === "confirmed" && <FaCheckCircle className="text-green-500" />}
                  {booking.status === "pending" && <FaClock className="text-yellow-500" />}
                  {booking.status === "cancelled" && <FaTimesCircle className="text-red-500" />}
                  <span className="ml-2 capitalize">{booking.status}</span>
                </td>
                <td className="border p-2">{booking.location || "N/A"}</td>
                <td className="border p-2">{booking.users?.full_name || "N/A"}</td>
                <td className="border p-2">{booking.users?.email || "N/A"}</td>
                <td className="border p-2">Ksh {booking.payments?.amount || "N/A"}</td>
                <td className="border p-2">{booking.payments?.status || "N/A"}</td>
                <td className="border p-2">{booking.payments?.payment_method || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
