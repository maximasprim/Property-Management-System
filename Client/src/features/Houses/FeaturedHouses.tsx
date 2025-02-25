import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { House, useFetchHousesQuery } from "./HousesApi"; // Adjust based on your API slice
import { useState } from "react";

const HousesList = () => {
  const { data: houses, isLoading, isError } = useFetchHousesQuery();
  // const [visibleCount, setVisibleCount] = useState(3);
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [showGallery, setShowGallery] = useState(false); // New state for gallery view

  // const handleViewMore = () => {
  //   setVisibleCount((prevCount) => prevCount + 6);
  // };

  const handleCardClick = (house: any) => {
    setSelectedHouse(house);
  };

  const handleBack = () => {
    setSelectedHouse(null);
    setShowGallery(false); // Reset gallery view when going back
  };

  const toggleGallery = () => {
    setShowGallery((prev) => !prev); // Toggle gallery view
  };

  if (isLoading) {
    return <div className="text-center">Loading houses...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">Failed to load houses. Please try again later.</div>;
  }

  if (!houses || houses.length === 0) {
    return <div className="text-center">No houses found.</div>;
  }

  return (
    <div className="bg-gray-100 h-screen">
    <Navbar />
    <h2 className="text-center text-blue-600 font-semibold uppercase">Featured Houses</h2>
    <h1 className="text-center text-3xl font-bold mb-6">Our Houses</h1>
    <section className=" flex flex-col bg-gray-100">
      
      <div className="h-full mb-10">    {/*flex-grow overflow-y-auto*/}
        {selectedHouse ? (
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-10 h-full flex flex-col">
            <button onClick={handleBack} className="text-blue-600 font-semibold mb-4">
              &larr; Back to Houses
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Scrollable Images with Pop-out Effect */}
              <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                {selectedHouse.images && selectedHouse.images.length > 0 ? (
                  selectedHouse.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`relative flex-shrink-0 ${
                        index === Math.floor(selectedHouse.images.length / 2)
                          ? "scale-105 z-10" // Pop-out effect for the middle image
                          : "scale-100"
                      } transform transition-transform duration-300`}
                    >
                      <img
                        src={image || "https://via.placeholder.com/300"}
                        alt={`House Image ${index + 1}`}
                        className="w-64 h-48 object-cover rounded-md shadow-md"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No images available.</p>
                )}
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold">{selectedHouse.name}</h3>
                <p className="text-sm text-gray-600">Address: {selectedHouse.address || "N/A"}</p>
                <p className="text-sm text-gray-600">Rooms: {selectedHouse.number_of_rooms}</p>
                <p className="text-sm text-gray-600">Size: {selectedHouse.size} sqm</p>
                <p className="text-sm text-gray-600">Year Built: {selectedHouse.year_built || "Unknown"}</p>
                <p className="mt-2 text-xl font-semibold text-blue-600">${selectedHouse.price}</p>
                <p
                  className={`mt-1 font-semibold ${
                    selectedHouse.status === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedHouse.status}
                </p>
                <button
                  onClick={toggleGallery}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  {showGallery ? "Close Gallery" : "Gallery"}
                </button>
              </div>
            </div>

            {/* Gallery Section */}
            {showGallery && (
              <div className="grid grid-cols-1 l:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 overflow-y-auto">
                {selectedHouse.images && selectedHouse.images.length > 0 ? (
                  selectedHouse.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative w-full h-[300px] transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={image || "https://via.placeholder.com/300"}
                        alt={`Gallery Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No images available.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
           

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4  ">
              {houses.slice().map((house: House) => (
                <div
                  key={house.property_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleCardClick(house)}
                >
                  {/* Updated Scrollable Images */}
                  <div className="relative overflow-hidden">
                    <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                      {house.images && house.images.length > 0 ? (
                        house.images.map((image, index) => (
                          <div
                            key={index}
                            className={`relative flex-shrink-0 ${
                              index === Math.floor(house.images.length / 2)
                                ? "scale-105 z-10" // Pop-out effect for the middle image
                                : "scale-100"
                            } transform transition-transform duration-300`}
                          >
                            <img
                              src={image || "https://via.placeholder.com/300"}
                              alt={`House Image ${index + 1}`}
                              className="w-64 h-48 object-cover rounded-md shadow-md"
                            />
                          </div>
                        ))
                      ) : (
                        <img
                          src="https://via.placeholder.com/300"
                          alt="Placeholder"
                          className="w-full h-56 object-cover"
                        />
                      )}
                    </div>
                  </div>
                  {/* Card Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{house.name}</h3>
                    <div className="flex items-center space-x-4 text-gray-600 mt-2">
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-bed"></i>
                        <span>{house.number_of_rooms} Rooms</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-ruler-combined"></i>
                        <span>{house.size} sqm</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border-t">
                    <span className="text-gray-700 text-sm">Year Built: {house.year_built || "Unknown"}</span>
                    <span className="text-blue-600 font-bold">${house.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* {visibleCount < houses.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleViewMore}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  View More
                </button>
              </div>
            )} */}
          </>
        )}
      </div>
      {/* <Footer /> */}
    </section>
    <Footer />
    </div>
  );
};

export default HousesList;
