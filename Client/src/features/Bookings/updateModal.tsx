import { useState } from "react";
import { useUpdateBookingMutation } from "./BookingApi"; // Ensure this mutation exists

interface UpdateBookingModalProps {
  booking: {
    booking_id: number;
    property_type: string;
    property_id: number;
    total_amount: number;
    user_id: number;
    booking_date: string;
    status: string;
    location: string | null;
  };
  onClose: () => void;
}

export default function UpdateBookingModal({ booking, onClose }: UpdateBookingModalProps) {
  const [updateBooking, {isLoading, error}] = useUpdateBookingMutation();
  const [formData, setFormData] = useState({ ...booking });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBooking({
        ...formData,
      }).unwrap();
      onClose();
      alert("Booking updated successfully!");
      // refetch();
    } catch (err) {
      alert("Failed to update booking.");
      console.error("Failed to update booking:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Booking</h2>
        {error && <p className="text-red-500">Error updating Booking</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Property Type</label>
          <input
            type="text"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="block mb-2">Total Amount</label>
          <input
            type="number"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="block mb-2">Booking Date</label>
          <input
            type="date"
            name="booking_date"
            value={formData.booking_date.split("T")[0]} // Format date
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="block mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <label className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <div className="flex justify-between mt-4">
          <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update booking"}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
