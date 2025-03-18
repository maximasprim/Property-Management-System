import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initiateCallback = async () => {
      const transactionId = localStorage.getItem("transactionId");
      if (!transactionId) {
        toast.error("Transaction ID not found.");
        return;
      }

      try {
        const response = await axios.post(
          "https://property-management-system-api.onrender.com/callback",
          { transactionId } // 🔹 This sends the transaction ID to backend
        );

        if (response.data.status === "Completed") {
          toast.success("Payment successful! Booking confirmed.");
          setTimeout(() => {
            navigate("/dashboard"); // ✅ Redirect after 3 seconds
          }, 3000);
        } else {
          toast.error("Payment failed. Please try again.");
        }
      } catch (error) {
        toast.error("Error updating payment status.");
      }
    };

    initiateCallback();
  }, [navigate]);

  return (
    <div className="container">
      <h1>Processing Payment...</h1>
    </div>
  );
};

export default PaymentCallback;
