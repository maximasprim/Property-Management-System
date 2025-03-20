import { useState } from "react";
import ReviewModal from "../../features/Reviews/inputReview";
import { Link } from "react-router-dom";

export default function Comment() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-2">
        <p className="text-3xl font-bold mb-2 text-red-300">Wish To Download Payment Statements ? <span className="text-green-400">Download Report</span></p>
        <div className="flex items-center justify-between">
      
      <Link to ="my_reports">
    <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Download Reports</button>
    </Link>
      <Link to ="chat">
    <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Community Chat</button>
    </Link>
    </div>
      <ReviewModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
