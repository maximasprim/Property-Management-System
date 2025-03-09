import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUserWithBookingsQuery } from "../users/usersApi"; // Import API hook

const UserBookings: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id"); // Get user_id from localStorage

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect to login if user_id is missing
    }
  }, [userId, navigate]);

  const { data, isLoading, error } = useFetchUserWithBookingsQuery(Number(userId));
  const User = data?.[0];
//   const User = Users?.[0]; // Get the first user object


  console.log("Fetched User Bookings:", User); // Debugging output

  if (isLoading) return <p className="text-center text-lg">Loading bookings...</p>;
  if (error || !User) return <p className="text-center text-red-500">Failed to load user bookings.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Booking History</h1>

      <div className="bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold">{User.full_name}</h2>
        <p className="text-gray-600"><strong>Email:</strong> {User.email}</p>
        <p className="text-gray-600"><strong>Phone:</strong> {User.contact_phone || "N/A"}</p>
        <p className="text-gray-600"><strong>Address:</strong> {User.address || "N/A"}</p>

        <h3 className="text-lg font-semibold mt-4">Bookings</h3>
        {User.bookings && User.bookings.length > 0 ? (
  <div className="grid gap-4 mt-2">
    {User.bookings.map((booking: any) => (
      <div key={booking.booking_id} className="border rounded-lg p-4 shadow-md">
        <p><strong>Property Name:</strong> {booking.property_name}</p>
        <p><strong>Type:</strong> {booking.property_type}</p>
        <p><strong>Amount:</strong> ${booking.total_amount?.toLocaleString()}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {booking.location || "N/A"}</p>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-600 text-center">No bookings found.</p>
)}
      </div>
    </div>
  );
};

export default UserBookings;
