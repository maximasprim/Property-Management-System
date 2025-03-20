import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import UserPaymentsChart from "../users/singleUserPaymentCharts"; // Import your chart or other components here
import PaymentsReport from "./paymetsReports";

const DownloadableComponent: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!componentRef.current) return;

    // ✅ Convert OKLCH colors to HEX
    document.querySelectorAll("*").forEach((element) => {
      const computedStyle = getComputedStyle(element);
      if (computedStyle.backgroundColor.includes("oklch")) {
        (element as HTMLElement).style.backgroundColor = "#ffffff"; // Change unsupported colors
      }
    });

    try {
      const canvas = await html2canvas(componentRef.current, {
        backgroundColor: "#ffffff", // White background to avoid transparency
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("User_Payments_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <div ref={componentRef} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <PaymentsReport />
        {/* <UserPaymentsChart /> */}
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default DownloadableComponent;
