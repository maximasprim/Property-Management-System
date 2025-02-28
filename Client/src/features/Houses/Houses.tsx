import {
  useFetchHousesWithHistoryQuery,
  useDeleteHouseMutation,
  HouseHistory,
  House,
} from "./HousesApi";
import UpdateHouseModal from "./houseModal";

import { useState,useEffect } from "react";
import { debounce } from "lodash";

const Houses = () => {
  const {
    data: houses,
    isLoading,
    isError,refetch
  } = useFetchHousesWithHistoryQuery();
  console.log(houses);
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [deleteHouse] = useDeleteHouseMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const debouncedRefetch = debounce(refetch, 100); // Adjust delay as needed
    debouncedRefetch();
    return () => debouncedRefetch.cancel();
  }, [houses]);

  const handleCardClick = (house: any) => {
    console.log("Selected House:", house);
    setSelectedHouse(house); // Set the selected house when clicked
  };

  const handleUpdateClick = (house: House) => {
    setSelectedHouse(house);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = async (houseId: number) => {
    if (window.confirm("Are you sure you want to delete this house?")) {
      await deleteHouse(houseId);
    }
  };

  const handleBack = () => {
    setSelectedHouse(null); // Clear the selected house to go back to the list
  };

  if (isLoading) {
    return <div className="text-center">Loading houses...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Failed to load houses. Please try again later.
      </div>
    );
  }

  return (
    <section className="bg-gray-800 flex flex-col min-h-screen w-full">
      {selectedHouse ? (
        (console.log(
          "Selected House History:",
          selectedHouse?.houses_history
        ),
        (
          // Detailed View for Selected House
          <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md p-6 ">
            <button
              onClick={handleBack}
              className="text-blue-600 font-semibold mb-4"
            >
              &larr; Back to houses
            </button>
            <div className="flex flex-col md:flex-col gap-4">
              {/* House Images */}
              <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                {selectedHouse.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image || "https://via.placeholder.com/300"}
                    alt={`House Image ${index + 1}`}
                    className="w-64 h-48 object-cover rounded-md"
                  />
                ))}
              </div>
              {/* House Details */}
              <div>
                <div className="flex flex-row gap-32">
                  <div>
                    <h3 className="text-2xl font-semibold "><span className="text-orange-500">Property Name:</span>{" "} <span className="text-green-500">{selectedHouse.name}</span>{" "}
                      
                    </h3>
                    <p className="text-lg text-gray-600"><span className="font-bold">Type of House:</span>{" "}
                      {selectedHouse.house_type || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600"><span className="font-bold">Size in Square Feet:</span>{" "}
                      {selectedHouse.size || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600"><span className="font-bold">Number of Rooms:</span>{" "}
                      {selectedHouse.number_of_rooms || "N/A"}
                    </p>
                    
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      Location: {selectedHouse.location || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600">
                      Size Of Property: {selectedHouse.size || "N/A"}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-blue-300">
                      Price :Ksh {selectedHouse.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      Year Built: {selectedHouse.year_built || "N/A"}
                    </p>
                    <p
                      className={`mt-1 font-semibold ${
                        selectedHouse.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {" "}
                      Status:
                      {selectedHouse.status}
                    </p>

                  </div>
                </div>

                {/* House History */}
                <div className="grid gap-6 -screen overflow-y-auto">
                  {selectedHouse.history.map(
                    (historyItem: HouseHistory, index: number) => (
                      <div
                        key={index}
                        className="p-6 border rounded-lg shadow-lg bg-gray-100 h"
                      >
                        <h5 className="font-bold text-xl text-blue-700 mb-4">
                          History Record {index + 1}
                        </h5>

                        <div className="grid grid-cols-3 gap-4">
                          {/* Column 1 */}
                          <div>
                            <h6 className="font-bold text-gray-700">
                              Ownership
                            </h6>
                            <p>
                              <span className="font-bold">Previous Owner:</span>{" "}
                              {historyItem.previous_owner || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Transfer Date:</span>{" "}
                              {historyItem.transfer_date || "N/A"}
                            </p>


                            <h6 className="font-bold text-gray-700 mt-4">
                              Leasing
                            </h6>
                            <p>
                              <span className="font-bold">Tenant Information:</span>{" "}
                              {historyItem.tenant_name || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Lease Start:</span>{" "}
                              {historyItem.lease_start || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Lease End:</span>{" "}
                              {historyItem.lease_end || "N/A"}
                            </p>
                            <h6 className="font-bold text-gray-700 mt-4">
                              Dispute History
                            </h6>
                            <p>
                              <span className="font-bold">Type of Dispute:</span>{" "}
                              {historyItem.dispute_type || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Dispute Status:</span>{" "}
                              {historyItem.dispute_status || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Dispute Resolution Date:</span>{" "}
                              {historyItem.dispute_resolution_date || "N/A"}
                            </p>

                          </div>

                          {/* Column 2 */}
                          <div>
                            <h6 className="font-bold text-gray-700">
                              Legal Infomation
                            </h6>
                            <p>
                              <span className="font-bold">Issue:</span>{" "}
                              {historyItem.legal_issue || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">
                                Resolution Date:
                              </span>{" "}
                              {historyItem.resolution_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Permit Approval Date:</span>{" "}
                              {historyItem.permit_approval_date || "N/A"}
                            </p>
                            

                            <h6 className="font-bold text-gray-700 mt-4">
                              Disaster History
                            </h6>
                            <p>
                              <span className="font-bold">Type of Disaster:</span>{" "}
                              {historyItem.disaster_type || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Description Of Disaster:</span>{" "}
                              {historyItem.disaster_description || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Date of Disaster:</span>{" "}
                              {historyItem.disaster_date || "N/A"}
                            </p>
                            <p>
                            <span className="font-bold">Disaster Assessmet Report :</span>{" "}
                              {historyItem.environmental_assessment_date ||
                                "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Status After Disaster:</span>{" "}
                              {historyItem.status_after_disaster || "N/A"}
                            </p>
                          </div>
                          <div>
                            {/* Column 3 */}


                            <h6 className="font-bold text-gray-700 mt-4">
                              Crime Reports
                            </h6>
                            <p>
                              <span className="font-bold">Crime Type:</span>{" "}
                              {historyItem.crime_type || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Crime Date:</span>{" "}
                              {historyItem.crime_date || "N/A"}
                            </p>

                            <h6 className="font-bold text-gray-700 mt-4">
                              Valuation
                            </h6>
                            <p>
                              <span className="font-bold">Valuation Date:</span>{" "}
                              {historyItem.valuation_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Property Value:</span>{" "}
                              $
                              {historyItem.property_value?.toLocaleString() ||
                                "N/A"}
                            </p>
                            <h6 className="font-bold text-gray-700 mt-4">
                              Feedback Information
                            </h6>
                            <p>
                              <span className="font-bold">Tenant Feedback:</span>{" "}
                              {historyItem.tenant_feedback || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Feedback Date:</span>{" "}
                              {historyItem.feedback_date || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // House Cards List
        <div className="h-screen overflow-y-auto">
          <h2 className="text-center text-blue-600 font-semibold uppercase">
            Featured Houses
          </h2>
          <h1 className="text-center text-3xl font-bold mb-6">Our Houses</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
            {houses &&
              houses.map(
                (house) =>
                  house &&
                  house.images &&
                  house.images.length > 0 && (
                    <div
                      key={house.property_id}
                      onClick={(e) => {
                        // Prevent selecting house if a button was clicked
                        if ((e.target as HTMLElement).tagName !== "BUTTON") {
                          handleCardClick(house);
                        }
                      }}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        {/* Horizontal Scrollable Images */}
                        <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                          {house.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || "https://via.placeholder.com/300"}
                              alt={`House Image ${index + 1}`}
                              className="w-64 h-48 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-4">
                        {/* House Info */}
                        <h3 className="text-3xl
font-size: var(--text-3xl) font-bold "><span className="text-orange-500">Property Name:</span>{" "} <span className="text-green-500">{house.name}</span>{" "}
                           
                        </h3>
                        <p className="text-lg text-gray-600"><span className="font-bold">Type of House:</span>{" "}
                           {house.house_type}
                        </p>
                        <p className="text-lg text-gray-600"><span className="font-bold">Size in Square Feet:</span>{" "}
                           {house.size}
                        </p>
                        <p className="text-lg text-gray-600"><span className="font-bold">Number of Rooms:</span>{" "}
                        {house.number_of_rooms}
                        </p>
                        <p className="text-lg text-gray-600"><span className="font-bold">Location:</span>{" "}
                           {house.address}
                        </p>                        
                       
                        <p className="mt-2 text-xl font-semibold text-blue-600">
                          Ksh {house.price}
                        </p>
                        <p
                          className={`mt-1 font-semibold ${
                            house.status === "Available"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {house.status}
                        </p>
                        <div className="flex justify-between mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent the card click from triggering
                              console.log("Update button clicked:", house); // Debugging log
                              handleUpdateClick(house);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Update
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick(house.property_id)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
      {isUpdateModalOpen && (
        <UpdateHouseModal
          house={selectedHouse}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updatedHouse) => setSelectedHouse(updatedHouse)}
        />
      )}
    </section>
  );
};

export default Houses;
