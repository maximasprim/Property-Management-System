import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUserWithBookingsQuery } from "../users/usersApi";
import { useDeleteBookingMutation } from "./BookingApi";
import { FaTrash } from "react-icons/fa";
import { useCreatePaymentsMutation } from "../Stripe/stripeApi";
import { Toaster, toast } from "sonner";
import PaymentModal from "../Payments/paymentModal";
import MpesaPaymentButton from "../Mpesa/mpesa";

const UserBookings: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const [deleteBooking] = useDeleteBookingMutation();
  const { data, isLoading, error, refetch } = useFetchUserWithBookingsQuery(Number(userId));
  const [createCheckout] = useCreatePaymentsMutation();
  const User = Array.isArray(data) && data.length > 0 ? data[0] : undefined;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);

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

  const handleCardPayment = async () => {
    if (!selectedBooking) return;

    const buyer_id = localStorage.getItem("user_id");
    if (!buyer_id) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    try {
      const { data } = await createCheckout({
        booking_id: selectedBooking.booking_id,
        amount: Number(selectedBooking.total_amount),
        buyer_id: Number(buyer_id),
      });

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.error("Provide checkout URL");
      }
    } catch (error) {
      toast.error("Error creating checkout session");
    }

    setIsModalOpen(false);
  };

  const handleMpesaPayment = () => {
    setIsModalOpen(false);
    setShowMpesaPayment(true);
  };

  if (isLoading) return <p className="text-center text-lg">Loading bookings...</p>;
  if (error || !User) return <p className="text-center text-red-500">Failed to load user bookings.</p>;

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-3xl font-bold mb-2">User Booking History</h1>
      </div>
      <Toaster toastOptions={{ classNames: { error: "bg-red-400", success: "text-green-400" } }} />

      <div className="bg-gray-800 shadow-md p-6 rounded-lg h-screen overflow-y-auto">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-xl font-semibold">{User.full_name}</h2>
          <p className="text-gray-500"><strong>Email:</strong> {User.email}</p>
          <p className="text-gray-500"><strong>Phone:</strong> {User.contact_phone || "N/A"}</p>
          <p className="text-gray-500"><strong>Address:</strong> {User.address || "N/A"}</p>
        </div>

        <div className="flex justify-center items-center w-full">
          <h3 className="text-[25px] font-semibold mt-4">My Bookings</h3>
        </div>

        {User.bookings && User.bookings.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 mt-2 w-full">
            {User.bookings.map((booking: any) => (
              <div key={booking.booking_id} className="border rounded-lg p-4 shadow-md">
                <p><strong>Property Name:</strong> {booking.property_name}</p>
                <p><strong>Property Type:</strong> {booking.property_type}</p>
                <p><strong>Amount To be Paid:</strong> ${booking.total_amount?.toLocaleString()}</p>
                <p><strong>Booking Status:</strong> {booking.status}</p>
                <p><strong>Date Booked:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p><strong>Location of Booking:</strong> {booking.location || "N/A"}</p>

                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsModalOpen(true);
                    }}
                    className="btn btn-primary mt-4 bg-blue-500 hover:bg-blue-600"
                  >
                    Proceed to Payment
                  </button>

                  <button onClick={() => handleDelete(booking.booking_id)} className="btn btn-primary mt-4 bg-red-500 hover:bg-red-600">
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMpesaPayment={handleMpesaPayment}
        onCardPayment={handleCardPayment}
      />

      {/* Mpesa Payment Form - Appears After Clicking M-Pesa Payment */}
      {showMpesaPayment && selectedBooking && (
  <MpesaPaymentButton 
    booking={selectedBooking} 
    onClose={() => setShowMpesaPayment(false)} // ✅ Pass onClose to close the modal
  />
)}
    </div>
  );
};

export default UserBookings;
