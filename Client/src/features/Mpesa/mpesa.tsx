import { useState } from "react";
import { useProcessPaymentMutation } from "./mpesaApi";
import { toast } from "react-toastify";
import { Toaster } from "sonner";

const MpesaPaymentButton: React.FC<{ booking: any; onClose: () => void }> = ({ booking, onClose }) => {
  const [processPayment] = useProcessPaymentMutation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  const handlePaymentWithMpesa = async () => {
    if (!booking) return;

    const buyer_id = localStorage.getItem("user_id");

    if (!buyer_id) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    if (!phoneNumber) {
      toast.error("Please enter your phone number.");
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      const result = await processPayment({
        bookingId: Number(booking.booking_id),
        amount: Number(booking.total_amount),
        buyerId: Number(buyer_id),
        phoneNumber,
        propertyType: booking.propertyType || "N/A",
        propertyName: booking.propertyName || "N/A",
        paymentMethod: "mpesa",
      }).unwrap();

      if (result?.transactionId) {
        localStorage.setItem("transactionId", result.transactionId);
      }

      if (result?.checkoutUrl) {
        toast.info("Redirecting to M-Pesa payment...");
        window.location.href = result.checkoutUrl;
      } else {
        toast.error("Checkout URL missing. Try again.");
      }

      toast.success("Payment successful!", { position: "top-left" }); // Show success toast
    } catch (error) {
      toast.error("Error processing payment. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <Toaster position="top-left" /> {/* Toast positioned at top-left */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-green-500 font-semibold mb-4">M-Pesa Payment</h2>
        <p className="text-gray-700">Proceed with your M-Pesa payment for:</p>
        <p className="font-semibold text-black text-lg">Ksh {booking.total_amount}</p>
        <p className="text-gray-700 ">Enter Mpesa Pin To Confirm Payment</p>

        <input
          type="tel"
          placeholder="Enter Phone Number e.g. 2547XXXXXXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-3 rounded-lg w-full max-w-md mt-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between mt-6">
          <button
            className={`py-2 px-4 rounded-lg text-white ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
            onClick={handlePaymentWithMpesa}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Payment"}
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MpesaPaymentButton;
