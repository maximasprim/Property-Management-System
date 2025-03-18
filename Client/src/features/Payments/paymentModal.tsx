import React from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMpesaPayment: () => void;
  onCardPayment: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onMpesaPayment,
  onCardPayment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Payment Method</h2>

        <div className="flex flex-col space-y-4">
          <button
            onClick={onMpesaPayment}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
          >
            M-Pesa Payment
          </button>

          <button
            onClick={onCardPayment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
          >
            Card Payment
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
