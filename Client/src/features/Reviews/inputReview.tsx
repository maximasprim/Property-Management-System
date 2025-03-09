import { useState, useEffect } from "react";
import { useAddReviewMutation } from "./ReviewApi"; // Adjust path as needed

interface Review {
  review_id: number;
  property_type: string; // 'house', 'land', or 'vehicle'
  property_name: string;
  user_name: string;
  user_id: number;
  rating: number;
  comment?: string;
  created_at?: Date;
}

export default function ReviewForm() {
  const [formData, setFormData] = useState<Omit<Review, "review_id">>({
    property_type: "house",
    property_name: "",
    user_name: "",
    user_id: 0,
    rating: 5,
    comment: "",
    // created_at: new Date(),
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
      console.log(formData)
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-8 gap-8 mb-4">
      {/* <h2 className="text-xl font-semibold mb-4">Submit a Review</h2> */}
      {error && <p className="text-red-500">Error submitting review.</p>}
      <label className="block mb-2">
        Property Type:
        <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="house">House</option>
          <option value="land">Land</option>
          <option value="vehicle">Vehicle</option>
        </select>
      </label>
      <label className="block mb-2">
        Property Name:
        <input type="text" name="property_name" value={formData.property_name} onChange={handleChange} required className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">
        Your Name:
        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">
        User ID:
        <input type="number" name="user_id" value={formData.user_id} disabled className="w-full p-2 border rounded bg-gray-200" />
      </label>
      <label className="block mb-2">
        Rating (1-5):
        <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} required className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">
        Comment:
        <textarea name="comment" value={formData.comment} onChange={handleChange} className="w-full p-2 border rounded" />
      </label>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4 h-[50px] mb-5" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
