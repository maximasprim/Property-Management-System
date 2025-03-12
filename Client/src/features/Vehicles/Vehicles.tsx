import {
  useFetchVehiclesWithHistoryQuery,
  useDeleteVehicleMutation,
  VehicleHistory,
  Vehicle,
} from "./VehicleApi";
import UpdateVehicleModal from "./vehicleModal";
import { RingLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import VehicleHistoryModal from "../VehiclesHistory/inputhistoryform";
import UpdateVehicleHistoryModal from "../VehiclesHistory/updateModal";
import { toast } from "react-toastify";
import {useDeleteVehicleHistoryMutation} from "../VehiclesHistory/historyApi"
// import { Suspense } from "react";
// import { InputHistoryModalProps } from "../VehiclesHistory/inputhistoryform";
let totalVehicles = 0;
export const setTotalVehicles = (count: number) => {
  totalVehicles = count;
};
export const getTotalVehicles = () => totalVehicles;


const Vehicles = () => {
  const {
    data: vehicles,
    isLoading,
    isError,
    refetch,
  } = useFetchVehiclesWithHistoryQuery();
  
  console.log(vehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [initialData, setInitialData] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVehicleHistoryModalOpen, setIsVehicleHistoryModalOpen] =
    useState(false);
  const [deleteVehicleHistory] = useDeleteVehicleHistoryMutation()

  useEffect(() => {
    const debouncedRefetch = debounce(refetch, 300); // Adjust delay as needed
    debouncedRefetch();
    return () => debouncedRefetch.cancel();
  }, [vehicles]);
 

  useEffect(() => {
    setTotalVehicles(vehicles?.length || 0); // Update the exported total
  }, [vehicles]);

  const handleCardClick = (vehicle: any) => {
    console.log("Selected Vehicle:", vehicle);
    setSelectedVehicle(vehicle); // Set the selected vehicle when clicked
  };

  const handleDeleteHistory = async (history_id: number) => {
    try {
      await deleteVehicleHistory(history_id).unwrap();
      alert("Vehicle history deleted successfully");
    } catch (error) {
      console.error("Failed to delete vehicle history:", error);
      alert("Failed to delete vehicle history");
    }
  };


  const handleUpdateClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = async (vehicleId: number) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteVehicle(vehicleId);
      toast.success("Vehicle deleted successfully!");
    }
  };

  const handleBack = () => {
    setSelectedVehicle(null); // Clear the selected vehicle to go back to the list
  };

  if (isLoading) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <RingLoader color="#2563eb" size={80} />
    </div>
  );

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Failed to load vehicles. Please try again later.
      </div>
    );
  }
  

  return (
    <section className="bg-gray-800 flex flex-col min-h-screen w-full">
      {selectedVehicle ? (
        (console.log(
          "Selected Vehicle History:",
          selectedVehicle?.vehicles_history
        ),
        (
          // Detailed View for Selected Vehicle
          <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md p-6 ">
            <button
              onClick={handleBack}
              className="text-blue-600 font-semibold mb-4"
            >
              &larr; Back to vehicles
            </button>
            <div className="flex flex-col md:flex-col gap-4">
              {/* Vehicle Images */}
              <div className="flex overflow-x-auto space-x-2 scrollbar-hidden scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                {selectedVehicle.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image || "https://via.placeholder.com/300"}
                    alt={`Vehicle Image ${index + 1}`}
                    className="w-64 h-48 object-cover rounded-md"
                  />
                ))}
              </div>
              {/* Vehicle Details */}
              <div>
                <div className="flex flex-row gap-32">
                  <div>
                    {/* Vehicle Info */}
                    <h3 className="text-2xl font-semibold">
                      <span className="text-orange-500">Property Name:</span>{" "}
                      <span className="text-green-500">
                        {selectedVehicle.year} {selectedVehicle.make}{" "}
                        {selectedVehicle.model}
                      </span>
                    </h3>

                    <p className="text-lg text-gray-600">
                      <span className="font-bold">VIN:</span>{" "}
                      {selectedVehicle.vin || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Location:</span>{" "}
                      {selectedVehicle.location || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Mileage:</span>{" "}
                      {selectedVehicle.mileage || "N/A"}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-blue-300">
                      <span className="font-bold">Price:</span> Ksh{" "}
                      {selectedVehicle.price || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Fuel Type:</span>{" "}
                      {selectedVehicle.fuel_type || "N/A"}
                    </p>
                    <p
                      className={`mt-1 font-semibold ${
                        selectedVehicle.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <span className="font-bold">Status:</span>{" "}
                      {selectedVehicle.status}
                    </p>
                  </div>
                </div>

                {/* Vehicle History */}
                <div className="grid gap-6 -screen overflow-y-auto">
                  {selectedVehicle.history.map(
                    (historyItem: VehicleHistory, index: number) => (
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
                              Maintenance
                            </h6>
                            <p>
                              <span className="font-bold">Type:</span>{" "}
                              {historyItem.maintenance_type || "None"}
                            </p>
                            <p>
                              <span className="font-bold">Date:</span>{" "}
                              {historyItem.maintenance_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">
                                Service Provider:
                              </span>{" "}
                              {historyItem.service_provider || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Cost:</span> $
                              {historyItem.maintenance_cost?.toLocaleString() ||
                                "N/A"}
                            </p>

                            <h6 className="font-bold text-gray-700 mt-4">
                              Leasing
                            </h6>
                            <p>
                              <span className="font-bold">Tenant:</span>{" "}
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
                              Taxes
                            </h6>
                            <p>
                              <span className="font-bold">Payment Date:</span>{" "}
                              {historyItem.tax_payment_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Amount:</span> $
                              {historyItem.tax_amount?.toLocaleString() ||
                                "N/A"}
                            </p>
                          </div>

                          {/* Column 2 */}
                          <div>
                            <h6 className="font-bold text-gray-700">
                              Legal & Disputes
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
                              <span className="font-bold">Dispute Type:</span>{" "}
                              {historyItem.dispute_type || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Status:</span>{" "}
                              {historyItem.dispute_status || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">
                                Resolution Date:
                              </span>{" "}
                              {historyItem.dispute_resolution_date || "N/A"}
                            </p>

                            <h6 className="font-bold text-gray-700 mt-4">
                              Permits & Environmental
                            </h6>
                            <p>
                              <span className="font-bold">
                                Permit Approval:
                              </span>{" "}
                              {historyItem.permit_approval_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">
                                Environmental Assessment:
                              </span>{" "}
                              {historyItem.environmental_assessment_date ||
                                "N/A"}
                            </p>

                            <h6 className="font-bold text-gray-700 mt-4">
                              Disaster History
                            </h6>
                            <p>
                              <span className="font-bold">Type:</span>{" "}
                              {historyItem.disaster_type || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Description:</span>{" "}
                              {historyItem.disaster_description || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Date:</span>{" "}
                              {historyItem.disaster_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Status:</span>{" "}
                              {historyItem.status_after_disaster || "N/A"}
                            </p>
                          </div>
                          <div>
                            {/* Column 3 */}

                            <h6 className="font-bold text-gray-700 mt-4">
                              Insurance & Claims
                            </h6>
                            <p>
                              <span className="font-bold">Policy Number:</span>{" "}
                              {historyItem.insurance_policy_number || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Claim Date:</span>{" "}
                              {historyItem.claim_date || "N/A"}
                            </p>
                            <p>
                              <span className="font-bold">Claim Amount:</span> $
                              {historyItem.claim_amount?.toLocaleString() ||
                                "N/A"}
                            </p>

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
                          </div>
                        </div>
                        <div className="flex justify-between w-full gap-4">
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          >
                            Add Vehicle History
                          </button>

                          {isModalOpen && (
                            <VehicleHistoryModal
                              isOpen={isModalOpen}
                              onClose={() => setIsModalOpen(false)}
                              property_id={selectedVehicle.property_id} // Pass the property_id here
                            />
                          )}
                          <button
                            onClick={() => {
                              setIsVehicleHistoryModalOpen(true);
                              setInitialData(selectedVehicle); // Set the selected vehicle data for update
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Update Vehicle History
                          </button>

                          {isVehicleHistoryModalOpen && initialData && (
                            <UpdateVehicleHistoryModal
                              isOpen={isVehicleHistoryModalOpen}
                              onClose={() =>
                                setIsVehicleHistoryModalOpen(false)
                              }
                              // property_id={selectedVehicle.property_id} // Pass the property_id here
                              initialData={initialData} // Pass the selected data for update
                            />
                          )}
                          <button
                      onClick={() => handleDeleteHistory(historyItem.history_id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete Vehicle History
                    </button>
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
        // Vehicle Cards List
        <div className="h-screen overflow-y-auto">
        <h2 className="text-center text-blue-600 font-semibold uppercase">
          Featured Vehicles
        </h2>
        <h1 className="text-center text-3xl font-bold mb-6">Our Vehicles</h1>
  
        {/* Total Vehicles Display */}
        <div className="flex justify-center">
        <p className="text-xl font-semibold text-green-600">
          <span className="font-bold">Total Vehicles:</span> {vehicles?.length || 0}
        </p>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
          {vehicles?.map(
            (vehicle) =>
              vehicle &&
              vehicle.images &&
              vehicle.images.length > 0 && (
                <div
                  key={vehicle.property_id}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== "BUTTON") {
                      handleCardClick(vehicle);
                    }
                  }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                      {vehicle.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "https://via.placeholder.com/300"}
                          alt={`Vehicle Image ${index + 1}`}
                          className="w-64 h-48 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-3xl font-bold">
                      <span className="text-orange-500">Property Name:</span>{" "}
                      <span className="text-green-500">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </span>
                    </h3>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">VIN:</span> {vehicle.vin || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Mileage:</span> {vehicle.mileage || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Fuel Type:</span> {vehicle.fuel_type || "N/A"}
                    </p>
                    <p className="text-lg text-gray-600">
                      <span className="font-bold">Location:</span> {vehicle.location || "N/A"}
                    </p>
  
                    <p className="mt-2 text-xl font-semibold text-blue-600">
                      <span className="font-bold">Price:</span> Ksh {vehicle.price || "N/A"}
                    </p>
                    <p
                      className={`mt-1 font-semibold ${
                        vehicle.status === "Available" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span className="font-bold">Status:</span> {vehicle.status}
                    </p>
  
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateClick(vehicle);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(vehicle.property_id)}
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
        <UpdateVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updatedVehicle) => setSelectedVehicle(updatedVehicle)}
        />
      )}
    </section>
  );
};

export default Vehicles;
