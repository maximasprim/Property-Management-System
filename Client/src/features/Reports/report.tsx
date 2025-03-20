import React, { useRef } from "react";
import { useBookingStatistics } from "../Bookings/Summary";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import SalesChart from "../Payments/Payments";
import Charts from "../ADMIN/Charts";
import { getTotalVehicles } from "../Vehicles/Vehicles";
import { getTotalHouses } from "../Houses/Houses";
import { getTotalLands } from "../Lands/Lands";
import { useUserCount } from "../users/users";
import { useTotalReviews } from "../Reviews/Reviews";

const AnalyticsReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const {
    totalBookings,
    totalConfirmed,
    totalPending,
    totalCancelled,
    totalAmount,
    totalAmountTwoHoursAgo,
    percentageChange,
    totalProfit,
  } = useBookingStatistics();
const totalVehicles = getTotalVehicles();
  const totalHouses = getTotalHouses();
  const totalLands = getTotalLands();
   const totalUsers = useUserCount();
    const totalReviews = useTotalReviews();

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
  
    // ✅ Convert OKLCH colors to HEX
    document.querySelectorAll("*").forEach((element) => {
      const computedStyle = getComputedStyle(element);
      if (computedStyle.backgroundColor.includes("oklch")) {
        (element as HTMLElement).style.backgroundColor = "#ffffff"; // Change unsupported colors
      }
    });
  
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#ffffff", // White background to avoid transparency
        scale: 2,
      });
  
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Booking_Analytics_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  return (
    <div className="p-2 bg-gray-800 text-white shadow-md rounded-lg w-full h-screen overflow-y-auto">
      <div ref={reportRef} className="bg-gray-300 text-black p-2 rounded-lg w-full ">
        <h2 className="text-2xl font-semibold mb-4 text-center">📊 Analytics Report</h2>

        <div className="flex justify-between items-center mb-6">
        <p className="mb-2 font-semibold">📅 Date: {new Date().toLocaleDateString()}</p>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <FaDownload className="mr-2" /> Download Report
      </button>
      </div>
        {/* ✅ Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 w-full">
          <div className="p-4 bg-gray-200 rounded-lg text-center">
            <p className="text-lg font-bold">Total Bookings</p>
            <p className="text-2xl">{totalBookings}</p>
          </div>
          <div className="p-4 bg-green-300 rounded-lg text-center">
            <p className="text-lg font-bold">Confirmed</p>
            <p className="text-2xl">{totalConfirmed}</p>
          </div>
          <div className="p-4 bg-yellow-300 rounded-lg text-center">
            <p className="text-lg font-bold">Pending</p>
            <p className="text-2xl">{totalPending}</p>
          </div>
          <div className="p-4 bg-red-300 rounded-lg text-center">
            <p className="text-lg font-bold">Cancelled</p>
            <p className="text-2xl">{totalCancelled}</p>
          </div>
          <div className="p-4 bg-blue-300 rounded-lg text-center">
            <p className="text-lg font-bold">Total Amount (Ksh)</p>
            <p className="text-2xl">Ksh {totalAmount.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-purple-300 rounded-lg text-center">
            <p className="text-lg font-bold">Previous Amount (Ksh)</p>
            <p className="text-2xl">Ksh {totalAmountTwoHoursAgo.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-indigo-300 rounded-lg text-center">
            <p className="text-lg font-bold">Profit Made</p>
            <p className="text-2xl">Ksh {totalProfit}</p>
          </div>
          <div className="p-4 bg-pink-300 rounded-lg text-center">
            <p className="text-lg font-bold">Percentage Change</p>
            <p className="text-2xl">{percentageChange}%</p>
          </div>
          <div className="p-4 bg-purple-300 rounded-lg text-center">
            <p className="text-lg font-bold">Total Vehicle</p>
            <p className="text-2xl">{totalVehicles}</p>
          </div>
          <div className="p-4 bg-green-300 rounded-lg text-center">
            <p className="text-lg font-bold">Total Houses</p>
            <p className="text-2xl">{totalHouses}</p>
          </div>
          <div className="p-4 bg-orange-300 rounded-lg text-center">
            <p className="text-lg font-bold">Total Lands</p>
            <p className="text-2xl">{totalLands}</p>
          </div>
          <div className="p-4 bg-emerald-300 rounded-lg text-center">
            <p className="text-lg font-bold">Total Comments</p>
            <p className="text-2xl">{totalReviews}</p>
          </div>
          <div className="p-4 bg-lime-300 rounded-lg text-center">
            <p className="text-lg font-bold">Total Users</p>
            <p className="text-2xl">{totalUsers}</p>
          </div>
        </div>
          <div>
          <Charts/>
          </div>
      </div>

      {/* ✅ Download Button */}
      
    </div>
  );
};

export default AnalyticsReport;
