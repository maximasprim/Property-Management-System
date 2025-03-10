import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUserWithBookingsQuery } from "../users/usersApi"; // Import API hook
import { useDeleteBookingMutation } from "./BookingApi";
import {FaTrash} from "react-icons/fa";
import { useCreatePaymentsMutation } from '../Stripe/stripeApi';
import { Toaster, toast } from 'sonner';

const UserBookings: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id"); // Get user_id from localStorage

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect to login if user_id is missing
    }
  }, [userId, navigate]);

  const [deleteBooking] = useDeleteBookingMutation();
  const { data, isLoading, error,refetch } = useFetchUserWithBookingsQuery(Number(userId));
  const [createCheckout] = useCreatePaymentsMutation();
  const User = data?.[0];
//   const User = Users?.[0]; // Get the first user object
  console.log("Fetched User Bookings:", User); // Debugging output
  const handleDelete = async (bookingId: number) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(bookingId);
        alert("Booking deleted successfully!");
        refetch();
      } catch (err) {
        alert("Failed to delete booking.");
      }
    }
  };

  const handleUpdatePay = async (booking: any) => {
    if (!booking) return;

    // Retrieve buyer_id from localStorage
    const buyer_id = localStorage.getItem("user_id");

    if (!buyer_id) {
        console.error("User ID not found in localStorage");
        toast.error("User ID not found. Please log in.");
        return;
    }

    try {
        const { data } = await createCheckout({
            booking_id: booking.booking_id,
            amount: Number(booking.total_amount),
            buyer_id: Number(buyer_id), // Ensure it's sent as a number
        });

        console.log("Checkout session:", data);

        if (data?.checkoutUrl) {
            window.location.href = data.checkoutUrl; // Redirect to checkout page
        } else {
            console.error("Checkout URL is not provided");
            toast.error("Provide checkout URL");
        }
    } catch (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Error creating checkout session");
    }
};


  if (isLoading) return <p className="text-center text-lg">Loading bookings...</p>;
  if (error || !User) return <p className="text-center text-red-500">Failed to load user bookings.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">User Booking History</h1>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />

      <div className="bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold">{User.full_name}</h2>
        <p className="text-gray-500"><strong>Email:</strong> {User.email}</p>
        <p className="text-gray-500"><strong>Phone:</strong> {User.contact_phone || "N/A"}</p>
        <p className="text-gray-500"><strong>Address:</strong> {User.address || "N/A"}</p>

        <h3 className="text-lg font-semibold mt-4">Bookings</h3>
        {User.bookings && User.bookings.length > 0 ? (
  <div className="grid gap-4 mt-2 ">
  {User.bookings.map((booking: any) => (
    <div key={booking.booking_id} className="border rounded-lg p-4 shadow-md">
      <p><strong>Property Name:</strong> {booking.property_name}</p>
      <p><strong>Property Type:</strong> {booking.property_type}</p>
      <p><strong>Amount To be Paid:</strong> ${booking.total_amount?.toLocaleString()}</p>
      <p><strong>Booking Status:</strong> {booking.status}</p>
      <p><strong>Date Booked:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
      <p><strong>Location of Booking:</strong> {booking.location || "N/A"}</p>
      <div className="flex justify-between">
      <button className="btn btn-primary mt-4 bg-blue-500 hover:bg-blue-600" onClick={() => handleUpdatePay(booking)}>Complete Payment</button>
        <button
                            onClick={() => handleDelete(booking.booking_id)}
                            className="btn btn-primary mt-4 bg-red-500 hover:bg-red-600"
                          >
                            <FaTrash className="mr-1" /> Cancel Booking
                          </button>
      </div>
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
