// import { Book } from "lucide-react";
import { useGetSingleBookingDetailsQuery } from "./BookingApi";

interface ViewBookingModalProps {
  bookingId: number;
  onClose: () => void;
}

const BookingDetails: React.FC<ViewBookingModalProps> = ({ bookingId, onClose }) => {
  const { data: booking, error, isLoading } = useGetSingleBookingDetailsQuery(bookingId);
  console.log(booking);

  if (isLoading) return <p className="text-center text-gray-500">Loading booking details...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load booking details.</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white p-6 rounded-lg w-[1000px] shadow-lg ">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <div className="flex flex-row justify-between">
      
        {booking ? (
          <>
            <div className="">
                <h3 className="text-2xl font-bold mt-4 text-purple-400">
                    Booking Details
                </h3>
            <p><strong>Property Type:</strong> {booking.property_type}</p>
            <p><strong>Property Name:</strong> {booking.property_name}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
            </div>
            
        {booking.users? (
           
            <div className="">
              <h3 className="text-2xl font-bold mt-4 text-green-400">User Details</h3>
            <p><strong>Name:</strong> {booking.users.full_name}</p>
            <p><strong>Email:</strong> {booking.users.email}</p>
            <p><strong>Contact_phone:</strong>{booking.users.contact_phone}</p>
            <p><strong>User Address:</strong>{booking.users.address}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">User details are not available.</p>
        )}
        {booking.payments ? (
          <div className="">
            <h3 className="text-3xl text-red-300 font-bold mt-4">Payment Details</h3>
           
            <p><strong>Amount:</strong> ${booking.payments?.amount || "N/A"}</p>
            <p><strong>Payment Method:</strong> {booking.payments?.payment_method}</p>
            <p><strong>Transaction ID:</strong> {booking.payments?.transaction_id}</p>
            <p><strong>Transaction Date:</strong> {new Date(booking.payments?.transaction_date).toLocaleDateString
            ()}</p>
            <p><strong>Buyer ID:</strong> {booking.payments?.buyer_id}</p>
            <p><strong>Status:</strong> {booking.payments?.status}</p>
          </div>
        ):(
            <p className="text-center text-red-500">Payment details are not available.</p>
        )}
          </>
        ) : (
          <p className="text-center text-red-500">Booking details are not available.</p>
        )}

      </div>
        <button onClick={onClose} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default BookingDetails;
