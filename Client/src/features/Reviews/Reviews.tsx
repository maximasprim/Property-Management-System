import React from "react";
import { useGetReviewsQuery, useDeleteReviewMutation } from "./ReviewApi";

const CustomerReviews: React.FC = () => {
  const { data: reviews, error, isLoading, refetch } = useGetReviewsQuery();
  console.log(reviews);
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (review_id: number) => {
    await deleteReview(review_id);
    refetch(); // Refresh after delete
  };

  return (
    <div className="p-6 w-full bg-gray-900 min-h-screen">
      {isLoading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error fetching reviews</p>}
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Customer Reviews</h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviews?.map((review) => (
          <div
            key={review.review_id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-300 relative"
          >
            {/* Property Type */}
            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full absolute top-2 left-2">
              {review.property_type.toUpperCase()}
            </span>

            {/* Rating */}
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 text-lg font-bold">{`⭐ ${review.rating}/5`}</span>
            </div>

            {/* Comment */}
            <p className="text-gray-700 mt-3">"{review.comment || "No comment provided"}"</p>

            {/* Created At */}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(review.created_at).toLocaleDateString()}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(review.review_id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
