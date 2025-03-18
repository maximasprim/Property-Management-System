import { useGetBookingsQuery, useDeleteBookingMutation } from "./BookingApi";
import { FaCheckCircle, FaTimesCircle, FaClock, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import UpdateBookingModal from "./updateModal";
import BookingDetails from "./SingleBookingDetails"; // Import View Modal
import { PropagateLoader } from "react-spinners";

interface Booking {
  booking_id: number;
  property_type: string;
  property_name: string;
  property_id: number;
  total_amount: number;
  user_id: number;
  booking_date: string;
  status: string;
  location: string | null;
}

const Bookings: React.FC = () => {
  const { data: bookings, error, isLoading, refetch } = useGetBookingsQuery({});
  const [deleteBooking] = useDeleteBookingMutation();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewBookingId, setViewBookingId] = useState<number | null>(null);

  useEffect(() => {
    refetch();
  }, [bookings]);

  // Handle Delete
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

  // Handle Update
  const handleUpdate = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Handle View Details
  const handleView = (bookingId: number) => {
    setViewBookingId(bookingId);
  };

  {isLoading && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <PropagateLoader color="#ffffff" />
    </div>
  )}
  if (error) return <p className="text-center text-red-500">Failed to load bookings.</p>;

  return (
    <div className="p-6 bg-gray-800 shadow-md rounded-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-white">Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="border p-2">Booking ID</th>
              <th className="border p-2">Property Type</th>
              <th className="border p-2">Property ID</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Booking Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking: Booking) => (
              <tr key={booking.booking_id} className="text-center border-t">
                <td className="border p-2">{booking.booking_id}</td>
                <td className="border p-2 capitalize">{booking.property_type}</td>
                <td className="border p-2">{booking.property_id}</td>
                <td className="border p-2">${booking.total_amount}</td>
                <td className="border p-2">{booking.user_id}</td>
                <td className="border p-2">{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td className="border p-2 flex justify-center items-center">
                  {booking.status === "confirmed" && <FaCheckCircle className="text-green-500" />}
                  {booking.status === "pending" && <FaClock className="text-yellow-500" />}
                  {booking.status === "cancelled" && <FaTimesCircle className="text-red-500" />}
                  <span className="ml-2 capitalize">{booking.status}</span>
                </td>
                <td className="border p-2">{booking.location || "N/A"}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleView(booking.booking_id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:bg-blue-600"
                  >
                    <FaEye className="mr-1" /> View More Details
                  </button>
                  <button
                    onClick={() => handleUpdate(booking)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center hover:bg-yellow-600"
                  >
                    <FaEdit className="mr-1" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(booking.booking_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Modal */}
        {isModalOpen && selectedBooking && (
          <UpdateBookingModal
            booking={selectedBooking}
            onClose={() => {
              setIsModalOpen(false);
              refetch();
            }}
          />
        )}

        {/* View Modal */}
        {viewBookingId !== null && (
          <BookingDetails bookingId={viewBookingId} onClose={() => setViewBookingId(null)} />
        )}
      </div>
    </div>
  );
};

export default Bookings;
