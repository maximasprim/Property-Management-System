import React, { useState } from "react";
import { useCreateBookingMutation } from "./BookingApi"; // Import mutation hook
import { X } from "lucide-react"; // Close icon

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [createBooking, { isLoading, error }] = useCreateBookingMutation();

  const [bookingData, setBookingData] = useState({
    property_type: "",
    property_name: "",
    total_amount: "",
    user_id: localStorage.getItem("user_id") || "", // Fetch user ID from localStorage
    // booking_date: new Date(),
    location: "",
    transaction_id: "",
    status: "Pending", // Default status
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking(bookingData).unwrap(); // Make API request
      alert("Booking created successfully!");
      onClose(); // Close modal after success
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">New Booking</h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">Error: {JSON.stringify(error)}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="property_type"
            placeholder="Property Type"
            value={bookingData.property_type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="property_name"
            placeholder="Property Name"
            value={bookingData.property_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="total_amount"
            placeholder="Amount"
            value={bookingData.total_amount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* <select
            name="Property Location"
            value={bookingData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select> */}

          {/* <input
            type="text"
            name="booking_date"
            placeholder="Booking Date"
            value={bookingData.booking_date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          /> */}
          <input
            type="text"
            name="location"
            placeholder="Booking Location"
            value={bookingData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="text"
            name="transaction_id"
            placeholder="Transaction ID"
            value={bookingData.transaction_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          /> */}

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
