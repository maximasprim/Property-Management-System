import {
  useFetchHousesWithHistoryQuery,
  HouseHistory
} from "./HousesApi";
// import UpdateHouseModal from "./houseModal";
import { RingLoader } from "react-spinners";
import { useState,useEffect } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingModal from "../Bookings/CreateBookingModal";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


let totalHouses = 0;
export const setTotalHouses = (count: number) => {
  totalHouses = count;
};
export const getTotalHouses = () => totalHouses;

const NavHouses = () => {
  const {
    data: houses,
    isLoading,
    isError,refetch
  } = useFetchHousesWithHistoryQuery();
  console.log(houses);
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  // const [deleteHouse] = useDeleteHouseMutation();
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
      setTotalHouses(houses?.length || 0); // Update the exported total
    }, [houses]);

  useEffect(() => {
    const debouncedRefetch = debounce(refetch, 100); // Adjust delay as needed
    debouncedRefetch();
    return () => debouncedRefetch.cancel();
  }, [houses]);

  const handleCardClick = (house: any) => {
    console.log("Selected House:", house);
    setSelectedHouse(house); // Set the selected house when clicked
  };

const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const handlePurchaseClick = () => {
    const userId = localStorage.getItem("user_id"); // Check localStorage for user_id

    if (userId) {
      setModalOpen(true); // Open the modal if user is logged in
    } else {
      if (houses) {
        toast.error("You must be logged in first to purchase this property");
        setTimeout(
          () =>
            navigate("/login", {
              state: { redirectTo: `/properties/${selectedHouse.property_id}` },
            }),
          2000
        ); // Redirect to login first
        navigate("/login", { state: { redirectTo: `/properties/${selectedHouse.property_id}` } }); // Redirect to login first
      }
    }
  };

  const handleBack = () => {
    setSelectedHouse(null); // Clear the selected house to go back to the list
  };

  if (isLoading) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <RingLoader color="#2563eb" size={80} />
    </div>
  );

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
                      Location: {selectedHouse.address || "N/A"}
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
                              <span className="font-bold">Tenant Information:</span>{" "}
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
                              Dispute History
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Type of Dispute:</span>{" "}
                              {historyItem.dispute_type || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Dispute Status:</span>{" "}
                              {historyItem.dispute_status || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Dispute Resolution Date:</span>{" "}
                              {historyItem.dispute_resolution_date || "N/A"}
                            </p>

                          </div>

                          {/* Column 2 */}
                          <div>
                            <h6 className="font-extrabold text-black">
                              Legal Infomation
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Issue:</span>{" "}
                              {historyItem.legal_issue || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">
                                Resolution Date:
                              </span>{" "}
                              {historyItem.resolution_date || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Permit Approval Date:</span>{" "}
                              {historyItem.permit_approval_date || "N/A"}
                            </p>
                            

                            <h6 className="font-extrabold text-black mt-4">
                              Disaster History
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Type of Disaster:</span>{" "}
                              {historyItem.disaster_type || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Description Of Disaster:</span>{" "}
                              {historyItem.disaster_description || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Date of Disaster:</span>{" "}
                              {historyItem.disaster_date || "N/A"}
                            </p>
                            <p className="text-gray-700">
                            <span className="font-bold">Disaster Assessmet Report :</span>{" "}
                              {historyItem.environmental_assessment_date ||
                                "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-bold">Status After Disaster:</span>{" "}
                              {historyItem.status_after_disaster || "N/A"}
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
                              $
                              {historyItem.property_value?.toLocaleString() ||
                                "N/A"}
                            </p>
                            <h6 className="font-extrabold text-black mt-4">
                              Feedback Information
                            </h6>
                            <p className="text-gray-700">
                              <span className="font-bold">Tenant Feedback:</span>{" "}
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
                        selectedHouse={selectedHouse} // Pass the selected house
                      />
          </div>
        ))
      ) : (
        // House Cards List
        <div className="">
          <Navbar/>
          <div className="flex justify-center p-6">
          
       

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:px-2">
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
                        <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300 ">
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
                        
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
          <Footer/>
        </div>
      )}
      
    </section>
  );
};

export default NavHouses;
