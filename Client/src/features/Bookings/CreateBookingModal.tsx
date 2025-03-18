import React, { useState, useEffect } from "react";
import { useCreateBookingMutation } from "./BookingApi"; // Import mutation hook
import { X } from "lucide-react"; // Close icon

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHouse?: any | null;
  selectedLand?: any | null;
  selectedVehicle?: any | null;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedHouse,
  selectedLand,
  selectedVehicle,
}) => {
  const [createBooking, { isLoading, error }] = useCreateBookingMutation();

  const selectedProperty = selectedHouse || selectedLand || selectedVehicle;

  const [bookingData, setBookingData] = useState<any>({
    property_type: "",
    property_name: "",
    total_amount: "",
    user_id: localStorage.getItem("user_id") || "",
    location: "",
    transaction_id: "",
    status: "Pending",
  });

  useEffect(() => {
    if (selectedProperty) {
      setBookingData((prev:any) => ({
        ...prev,
        property_name:
          selectedProperty.name ||
          selectedProperty.make ||
          selectedProperty.model ||
          selectedProperty.property_name ||
          selectedProperty.title || // Check alternative property keys
          selectedProperty.propertyName ||
          "Unknown",
        total_amount: Math.round(selectedProperty.price).toString(), 
        location: selectedProperty.location || selectedProperty.address || "Unknown",
        user_id: localStorage.getItem("user_id") || "",
        transaction_id: "", // This can be set after payment
        status: "Pending",
      }));
    }
  }, [selectedHouse, selectedLand, selectedVehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingData({ ...bookingData, property_type: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.property_type) {
      alert("Please select a property type.");
      return;
    }

    try {
      await createBooking(bookingData).unwrap();
      alert("Booking created successfully!");
      onClose();
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  if (!isOpen || !selectedProperty) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-green-500 text-lg font-semibold">New Booking</h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">Error: {JSON.stringify(error)}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dropdown for selecting property type */}
          <select
            name="property_type"
            value={bookingData.property_type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Property Type</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
            <option value="Vehicle">Vehicle</option>
          </select>
<div className="text-black">
          <p><strong>Property Name:</strong> {bookingData.property_name}</p>
          <p><strong>Amount:</strong> {bookingData.total_amount}</p>
          <p><strong>Location:</strong> {bookingData.location}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
