import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useGetLandsQuery } from "./LandsApi";
import {  useState } from "react";

const LandsList = () => {
  const { data: lands, isLoading, isError } = useGetLandsQuery();
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedLand, setSelectedLand] = useState<any>(null);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleCardClick = (land: any) => {
    setSelectedLand(land);
  };

  const handleBack = () => {
    setSelectedLand(null);
  };

  if (isLoading) {
    return <div className="text-center">Loading lands...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">Failed to load lands. Please try again later.</div>;
  }

  if (!lands || lands.length === 0) {
    return <div className="text-center">No lands found.</div>;
  }

  return (
     <div className="bg-gray-100 h-screen">
        <Navbar />
    <section className="py-10 bg-gray-100">
      {selectedLand ? (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          <button onClick={handleBack} className="text-blue-600 font-semibold mb-4">
            &larr; Back to Lands
          </button>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Horizontal Scrollable Images */}
            <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
              {selectedLand.images && selectedLand.images.length > 0 ? (
                selectedLand.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image || "https://via.placeholder.com/300"}
                    alt={`Land Image ${index + 1}`}
                    className="w-64 h-48 object-cover rounded-md"
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No images available.</p>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{selectedLand.land_type}</h3>
              <p className="text-sm text-gray-600">Location: {selectedLand.location || "N/A"}</p>
              <p className="text-sm text-gray-600">Size: {selectedLand.size} sqm</p>
              <p className="mt-2 text-xl font-semibold text-blue-600">${selectedLand.price}</p>
              <p
                className={`mt-1 font-semibold ${
                  selectedLand.status === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {selectedLand.status}
              </p>

              {/* Land History */}
              {selectedLand.history && selectedLand.history.length > 0 ? (
                <div className="mt-4">
                  <h4 className="text-gray-700 font-semibold">Land History:</h4>
                  <ul className="text-gray-600 text-sm mt-2">
                    {selectedLand.history.map((history:any) => (
                      <li key={history.history_id} className="mb-2">
                        {history.previous_owner && (
                          <>
                            <span className="font-bold">Previous Owner:</span> {history.previous_owner} <br />
                          </>
                        )}
                        {history.sale_date && (
                          <>
                            <span className="font-bold">Sale Date:</span> {history.sale_date} <br />
                          </>
                        )}
                        {history.tax_payment_date && (
                          <>
                            <span className="font-bold">Tax Paid:</span> {history.tax_amount} on{" "}
                            {history.tax_payment_date} <br />
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No history available.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center text-blue-600 font-semibold uppercase">Featured Lands</h2>
          <h1 className="text-center text-3xl font-bold mb-6">Our Lands</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
            {lands.slice(0, visibleCount).map((land) => (
              <div
                key={land.property_id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(land)}
              >
                {/* Horizontal Scrollable Images */}
                <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                  {land.images && land.images.length > 0 ? (
                    land.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "https://via.placeholder.com/300"}
                        alt={`Land Image ${index + 1}`}
                        className="w-64 h-48 object-cover rounded-md"
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No images available.</p>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{land.land_type}</h3>
                  <p className="text-sm text-gray-600">Location: {land.location || "N/A"}</p>
                  <p className="text-sm text-gray-600">Size: {land.size} sqm</p>
                  <p className="mt-2 text-xl font-semibold text-blue-600">${land.price}</p>
                  <p
                    className={`mt-1 font-semibold ${
                      land.status === "Available" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {land.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < lands.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleViewMore}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}
    </section>
    <Footer/>
    </div>
  );
};

export default LandsList;
