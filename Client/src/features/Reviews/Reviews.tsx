import React, { useEffect } from "react";
import { useGetReviewsQuery, useDeleteReviewMutation } from "./ReviewApi";
import ReviewForm from "./inputReview";
import { FaStar } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

const CustomerReviews: React.FC = () => {
  const { data: reviews, error, isLoading, refetch } = useGetReviewsQuery();
  console.log(reviews);
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (review_id: number) => {
    await deleteReview(review_id);
    refetch(); // Refresh after delete
  };

  useEffect(() => {
    const debouncedRefetch = setTimeout(() => {
      refetch();
    }, 1000);

    return () => clearTimeout(debouncedRefetch);
  }, [refetch]);
    

  return (
    <div className="p-6 w-full bg-gray-800 min-h-screen">

      <h2 className="text-3xl font-bold mb-6 text-white text-center">Customer Reviews</h2>
      <ReviewForm/>
      {isLoading && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
    <PropagateLoader color="#ffffff" />
  </div>
)}
      {error && <p className="text-red-500 text-center">Error fetching reviews</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviews?.map((review) => (
          <div
            key={review.review_id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-300 relative"
          >
            {/* Property Type */}
            
            <div className="flex flex-row justify-between align-center">
            <p className="text-blue-700 text-2xl font-bold mt-2">{review.user_name}</p>


            <p className="text-gray-700 text-lg font-bold mt-2">{review.property_type}</p>

            </div>
            
                       {/* Rating */}
            <div className="flex items-center mt-2">
  {[...Array(5)].map((_, index) => (
    <FaStar
      key={index}
      className={index < review.rating ? "text-yellow-400" : "text-gray-300"}
      size={20}
    />
  ))}
  <span className="ml-2 font-bold text-lg">{review.rating}/5</span>
</div>
            {/* Comment */}
            <p className="text-gray-700 mt-3"><span className="text-gray-900 font-semibold">Description:</span> {review.comment || "No comment provided"}</p>
            {/* <p className="text-gray-700 mt-3">{review.user_id || "No user_id"}</p> */}
            <p className="text-gray-700 mt-3"><span className="text-green-500 font-semibold">Property Name:</span> {review.property_name || "No available property name"}</p>
            <p className="text-gray-700 mt-3"><span className="text-amber-900 font-semibold">Name of User:</span> {review.user_name || "No available property name"}</p>

            {/* Created At */}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(review.created_at).toLocaleDateString()}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(review.review_id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-800"
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
