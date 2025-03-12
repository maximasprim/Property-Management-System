import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        {/* Digital Clock */}
        <div className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {time.toLocaleTimeString()}
        </div>

        {/* Calendar */}
        <div className="border rounded-lg p-6 bg-gray-100 shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Select a Date
          </h3>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-fit mx-auto font-semibold text-black text-lg"
          />
          {selectedDate && (
            <p className="mt-4 text-gray-700 text-lg text-center">
              Selected Date:{" "}
              <span className="font-semibold text-blue-500">
                {selectedDate.toDateString()}
              </span>
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
