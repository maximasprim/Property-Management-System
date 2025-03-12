import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-2 bg-white shadow-lg rounded-lg w-full text-center">
      {/* Digital Clock */}
      <div className="text-3xl font-bold text-gray-900 mb-6">{time.toLocaleTimeString()}</div>

      {/* Calendar */}
      <div className="border rounded-lg p-6 bg-gray-100 shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Select a Date</h3>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="w-fit mx-auto font-semibold text-black text-lg"
         
        />
        {selectedDate && (
          <p className="mt-4 text-gray-700 text-lg">
            Selected Date: <span className="font-semibold text-blue-500">{selectedDate.toDateString()}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
