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
          // className="
          //   root: "w-cover mx-auto", // Center the calendar
          //   months: "flex flex-col justify-center w-full", // Ensures full width
          //   caption: "text-lg font-bold text-gray-800 mb-4", // Calendar header
          //   table: "w-full border-collapse", // Makes the table full width
          //   head: "w-full text-gray-800 font-semibold",
          //   head_row: "flex w-full justify-between text-center",
          //   row: "flex justify-between w-full",
          //   cell: "w-[50%] text-center py-2 cursor-pointer hover:bg-blue-100 rounded-md transition-all", // Each day cell
          //   day_selected: "bg-blue-500 text-white font-bold rounded-md", // Selected day style
          //   day_today: "border-b-4 border-blue-500 font-bold text-blue-600", // Highlights today's date
          // "
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
