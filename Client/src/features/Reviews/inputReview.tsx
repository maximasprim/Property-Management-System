import { useState, useEffect } from "react";
import { useAddReviewMutation } from "./ReviewApi"; // Adjust path as needed
import { X } from "lucide-react"; // Close icon

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHouse?: any | null;
  selectedLand?: any | null;
  selectedVehicle?: any | null;
}

export default function ReviewModal({
  isOpen,
  onClose,
  selectedHouse,
  selectedLand,
  selectedVehicle,
}: ReviewModalProps) {
  const [addReview, { isLoading, error }] = useAddReviewMutation();

  // Get selected property (House, Land, or Vehicle)
  const selectedProperty = selectedHouse || selectedLand || selectedVehicle;

  const [reviewData, setReviewData] = useState<any>({
    property_type: "",
    property_name: "",
    user_name: "",
    user_id: localStorage.getItem("user_id") || "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (selectedProperty) {
      setReviewData((prev: any) => ({
        ...prev,
        property_type: selectedHouse
          ? "House"
          : selectedLand
          ? "Land"
          : selectedVehicle
          ? "Vehicle"
          : "",
        property_name:
          selectedProperty.name ||
          selectedProperty.make ||
          selectedProperty.model ||
          selectedProperty.property_name ||
          selectedProperty.title || // Check alternative property keys
          selectedProperty.propertyName ||
          "Unknown",
        user_id: localStorage.getItem("user_id") || "",
      }));
    }
  }, [selectedHouse, selectedLand, selectedVehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReviewData((prev: any) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview(reviewData).unwrap();
      alert("Review submitted successfully!");
      onClose(); // Close modal after submission
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (!isOpen || !selectedProperty) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-blue-500 text-lg font-semibold">Submit a Review</h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">Error: {JSON.stringify(error)}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display property details */}
          <div className="text-green-500">
            <p><strong>Property Type: </strong><span className="text-white">{reviewData.property_type}</span></p>
            <p><strong>Property Name:</strong><span className="text-white"> {reviewData.property_name}</span></p>
          </div>

          <label className="block">
            Your Name:
            <input
              type="text"
              name="user_name"
              value={reviewData.user_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Rating (1-5):
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={reviewData.rating}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            Comment:
            <textarea
              name="comment"
              value={reviewData.comment}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
