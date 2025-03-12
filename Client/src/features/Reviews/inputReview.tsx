import { useState, useEffect } from "react";
import { useAddReviewMutation } from "./ReviewApi"; // Adjust path as needed

interface Review {
  review_id: number;
  property_type: string;
  property_name: string;
  user_name: string;
  user_id: number;
  rating: number;
  comment?: string;
  created_at?: Date;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [formData, setFormData] = useState<Omit<Review, "review_id">>({
    property_type: "house",
    property_name: "",
    user_name: "",
    user_id: 0,
    rating: 5,
    comment: "",
  });

  const [addReview, { isLoading, error }] = useAddReviewMutation();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prev) => ({ ...prev, user_id: Number(storedUserId) }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview(formData).unwrap();
      alert("Review submitted successfully!");
      onClose(); // Close modal after submission
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Submit a Review</h2>
        {error && <p className="text-red-500 text-sm">Error submitting review.</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Property Type:
            <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="vehicle">Vehicle</option>
            </select>
          </label>
          <label className="block">
            Property Name:
            <input type="text" name="property_name" value={formData.property_name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Your Name:
            <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            User ID:
            <input type="number" name="user_id" value={formData.user_id} disabled className="w-full p-2 border rounded bg-gray-200" />
          </label>
          <label className="block">
            Rating (1-5):
            <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} required className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Comment:
            <textarea name="comment" value={formData.comment} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
