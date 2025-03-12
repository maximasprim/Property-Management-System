import { useState } from "react";
import ReviewModal from "../../features/Reviews/inputReview";

export default function Comment() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-2">
        <p className="text-3xl font-bold mb-2 text-red-300">Happy with our services ? <span className="text-green-400">Make a comment</span></p>
      <button onClick={() => setModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Write a Review
      </button>

      <ReviewModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
