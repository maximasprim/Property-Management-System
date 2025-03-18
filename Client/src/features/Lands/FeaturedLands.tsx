import {
  useFetchLandsWithHistoryQuery,
  LandHistory,
} from "./LandsApi";

import { RingLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingModal from "../Bookings/CreateBookingModal";



let totalLands = 0;
export const setTotalLands = (count: number) => {
  totalLands = count;
};
export const getTotalLands = () => totalLands;

const Lands = () => {
  const {
    data: lands,
    isLoading,
    isError,
    refetch,
  } = useFetchLandsWithHistoryQuery();

  const [selectedLand, setSelectedLand] = useState<any>(null);
  // const [deleteLand] = useDeleteLandMutation();
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  useEffect(() => {
      setTotalLands(lands?.length || 0); // Update the exported total
    }, [lands]);

  useEffect(() => {
    const debouncedRefetch = debounce(refetch, 300);
    debouncedRefetch();
    return () => debouncedRefetch.cancel();
  }, [lands]);

  const handleCardClick = (land: any) => {
    setSelectedLand(land);
  };
 
  const navigate =useNavigate ();
  const [isModalOpen, setModalOpen] = useState(false);
  const handlePurchaseClick = () => {
    const userId = localStorage.getItem("user_id"); // Check localStorage for user_id

    if (userId) {
      setModalOpen(true); // Open the modal if user is logged in
    } else {
      if (lands) {
        toast.error("You must be logged in first to purchase this property");
        setTimeout(
          () =>
            navigate("/login", {
              state: { redirectTo: `/properties/${selectedLand.property_id}` },
            }),
          2000
        ); // Redirect to login first
        navigate("/login", { state: { redirectTo: `/properties/${selectedLand.property_id}` } }); // Redirect to login first
      }
    }
  };

  const handleBack = () => {
    setSelectedLand(null);
  };

  if (isLoading) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <RingLoader color="#2563eb" size={80} />
    </div>
  );
  if (isError)
    return (
      <div className="text-center text-red-600">
        Failed to load lands. Please try again later.
      </div>
    );

  return (
    <section className="bg-gray-800 flex flex-col min-h-screen w-full">
      {selectedLand ? (
        (console.log("Selected Land History:", selectedLand?.lands_history),
        (
          // Detailed View for Selected Land
          <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md p-6 ">
            <button
              onClick={handleBack}
              className="text-blue-600 font-semibold mb-4"
            >
              &larr; Back to lands
            </button>
            <div className="flex flex-col md:flex-col gap-4">
              {/* Land Images */}
              <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                {selectedLand.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image || "https://via.placeholder.com/300"}
                    alt={`Land Image ${index + 1}`}
                    className="w-64 h-48 object-cover rounded-md"
                  />
                ))}
              </div>
              {/* Land Details */}
              <div>
                <div className="flex flex-row gap-32">
                  <div>
                    {/* Land Info */}
                    <h3 className="text-2xl font-semibold">
                      <span className="text-orange-500">Property Name:</span>{" "}
                      <span className="text-green-500">
                        {selectedLand.property_name || "N/A"}
                      </span>
                    </h3>

                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Size in Acres:</span>{" "}
                      {selectedLand.size || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Location:</span>{" "}
                      {selectedLand.location || "N/A"}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-blue-300">
                      <span className="font-bold">Price:</span> Ksh{" "}
                      {selectedLand.price || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Year Acquired:</span>{" "}
                      {selectedLand.year_acquired || "N/A"}
                    </p>
                    <p
                      className={`mt-1 font-semibold ${
                        selectedLand.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="font-bold">Status:</span>{" "}
                      {selectedLand.status}
                    </p>
                  </div>
                </div>

                {/* Land History */}
                <div className="grid gap-6 -screen overflow-y-auto">
                  {selectedLand.history.map(
                    (historyItem: LandHistory, index: number) => (
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
                            <h6 className="font-extrabold text-black">
                              Ownership
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Previous Owner:</span>{" "}
                              {historyItem.previous_owner || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Transfer Date:</span>{" "}
                              {historyItem.transfer_date || "N/A"}
                            </p>

                            <h6 className="font-extrabold text-black mt-4">
                              Leasing
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Tenant:</span>{" "}
                              {historyItem.tenant_name || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Lease Start:</span>{" "}
                              {historyItem.lease_start || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Lease End:</span>{" "}
                              {historyItem.lease_end || "N/A"}
                            </p>

                            <h6 className="font-extrabold text-black mt-4">
                              Legal Information
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Legal issues:</span>{" "}
                              {historyItem.legal_issue || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Resolution Date:
                              </span>{" "}
                              {historyItem.resolution_date || "N/A"}
                            </p>
                          </div>
                          {/* Column 2 */}
                          <div>
                            <h6 className="font-extrabold text-black">
                              Dispute Information
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Dispute Type:</span>{" "}
                              {historyItem.dispute_type || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Resolution Date:
                              </span>{" "}
                              {historyItem.dispute_resolution_date || "N/A"}
                            </p>

                            <p className="text-gray-700">
                              <span className="font-bold">Status:</span>{" "}
                              {historyItem.dispute_status || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Permit Approval:
                              </span>{" "}
                              {historyItem.permit_approval_date || "N/A"}
                            </p>

                            <h6 className="font-extrabold text-black mt-4">
                              Disaster History
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Type of History:
                              </span>{" "}
                              {historyItem.disaster_type || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Description of Disaster:
                              </span>{" "}
                              {historyItem.disaster_description || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Date of Disaster:
                              </span>{" "}
                              {historyItem.disaster_date || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Status After Disaster:
                              </span>{" "}
                              {historyItem.status_after_disaster || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Environmental Assessment Date:
                              </span>{" "}
                              {historyItem.environmental_assessment_date ||
                                "N/A"}
                            </p>
                          </div>

                          <div>
                            {/* Column 3 */}

                            <h6 className="font-extrabold text-black mt-4">
                              Crime Reports
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Crime Type:</span>{" "}
                              {historyItem.crime_type || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Crime Date:</span>{" "}
                              {historyItem.crime_date || "N/A"}
                            </p>

                            <h6 className="font-extrabold text-black mt-4">
                              Valuation
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Valuation Date:</span>{" "}
                              {historyItem.valuation_date || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Property Value:</span>{" "}
                              Ksh
                              {historyItem.property_value?.toLocaleString() ||
                                "N/A"}
                            </p>
                            <h6 className="font-extrabold text-black mt-4">
                              Feedback Information
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Tenant's Feedback:
                              </span>{" "}
                              {historyItem.tenant_feedback || "N/A"}
                            </p>
                            <p className="text-gray-700">
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
            <div className="mt-10">
            <button
              onClick={handlePurchaseClick}
              className="btn btn-primary mt-4 w-full"
            >
              Purchase Property
            </button>
          </div>
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            selectedHouse={selectedLand}
          />
          </div>
        ))
      ) : (
        // Land Cards List
        <div className="">
          
          
          <div className="flex justify-center">
          
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-2 md:px-2">
            {lands &&
              lands.map(
                (land) =>
                  land &&
                  land.images &&
                  land.images.length > 0 && (
                    <div
                      key={land.property_id}
                      onClick={(e) => {
                        // Prevent selecting land if a button was clicked
                        if ((e.target as HTMLElement).tagName !== "BUTTON") {
                          handleCardClick(land);
                        }
                      }}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        {/* Horizontal Scrollable Images */}
                        <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                          {land.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || "https://via.placeholder.com/300"}
                              alt={`Land Image ${index + 1}`}
                              className="w-64 h-48 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-4">
                        {/* Land Info */}
                        <h3
                          className="text-3xl
font-size: var(--text-3xl) font-bold "
                        >
                          <span className="text-orange-500">
                            Property Name:
                          </span>{" "}
                          <span className="text-green-500">
                            {land.property_name}
                          </span>{" "}
                        </h3>
                        <p className="text-lg text-gray-600">
                          <span className="font-bold">Location:</span>{" "}
                          {land.location || "N/A"}
                        </p>
                        <p className="text-lg text-gray-600">
                          <span className="font-bold">Size in Acres:</span>{" "}
                          {land.size}
                        </p>
                        <p className="text-lg text-gray-600">
                          <span className="font-bold">Price:</span> Ksh{" "}
                          {land.price}
                        </p>

                        <p className="mt-2 text-xl font-semibold text-blue-600">
                          Ksh {land.price}
                        </p>
                        <p
                          className={`mt-1 font-semibold ${
                            land.status === "Available"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {land.status}
                        </p>

                        
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
      
    </section>
  );
};

export default Lands;
