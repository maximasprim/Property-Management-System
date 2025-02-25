import { useFetchVehiclesWithHistoryQuery, VehicleHistory } from './VehicleApi';
import Navbar from '../../components/Navbar';
import { useEffect,useState } from 'react';
import Footer from '../../components/Footer'

const FeaturedVehicles = () => {
  const { data: vehicles, isLoading, isError,refetch } = useFetchVehiclesWithHistoryQuery();
  console.log(vehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
      refetch();
    }, [vehicles]);

  const handleCardClick = (vehicle: any) => {
    console.log('Selected Vehicle:', vehicle);
    setSelectedVehicle(vehicle); // Set the selected vehicle when clicked
  };

  const handleBack = () => {
    setSelectedVehicle(null); // Clear the selected vehicle to go back to the list
  };

  if (isLoading) {
    return <div className="text-center">Loading vehicles...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600">Failed to load vehicles. Please try again later.</div>;
  }

  return (
    <section className="bg-slate-100 flex flex-col min-h-screen">
      <Navbar />
      {selectedVehicle ? (
        console.log("Selected Vehicle History:", selectedVehicle?.vehicles_history),

        // Detailed View for Selected Vehicle
        <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md p-6 ">
          <button onClick={handleBack} className="text-blue-600 font-semibold mb-4">
            &larr; Back to vehicles
          </button>
          <div className="flex flex-col md:flex-col gap-4">
            {/* Vehicle Images */}
            <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
              {selectedVehicle.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image || 'https://via.placeholder.com/300'}
                  alt={`Vehicle Image ${index + 1}`}
                  className="w-64 h-48 object-cover rounded-md"
                />
              ))}
            </div>
            {/* Vehicle Details */}
            <div>
              <div className='flex flex-row gap-72'>
                <div>
                <h3 className="text-2xl font-semibold ">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-sm text-gray-600">VIN: {selectedVehicle.vin}</p>
                </div>
              <div>
              <p className="text-sm text-gray-600">Location: {selectedVehicle.location || 'N/A'}</p>
              <p className="mt-2 text-xl font-semibold text-blue-300">Price :${selectedVehicle.price}</p>
              </div>
              <div>
              <p
                className={`mt-1 font-semibold ${
                  selectedVehicle.status === 'Available' ? 'text-green-600' : 'text-red-600'
                }`}
              > Status:  
                {selectedVehicle.status}
              </p>
              </div>
              
             

              </div>
              
              {/* Vehicle History */}
              <div className="grid gap-6">
  {selectedVehicle.history.map((historyItem: VehicleHistory, index: number) => (
    <div key={index} className="p-6 border rounded-lg shadow-lg bg-gray-100">
      <h5 className="font-bold text-xl text-blue-700 mb-4">History Record {index + 1}</h5>

      <div className="grid grid-cols-3 gap-4">
        {/* Column 1 */}
        <div>
          <h6 className="font-bold text-gray-700">Ownership</h6>
          <p><span className="font-bold">Previous Owner:</span> {historyItem.previous_owner || 'N/A'}</p>
          <p><span className="font-bold">Transfer Date:</span> {historyItem.transfer_date || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Maintenance</h6>
          <p><span className="font-bold">Type:</span> {historyItem.maintenance_type || 'None'}</p>
          <p><span className="font-bold">Date:</span> {historyItem.maintenance_date || 'N/A'}</p>
          <p><span className="font-bold">Service Provider:</span> {historyItem.service_provider || 'N/A'}</p>
          <p><span className="font-bold">Cost:</span> ${historyItem.maintenance_cost?.toLocaleString() || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Leasing</h6>
          <p><span className="font-bold">Tenant:</span> {historyItem.tenant_name || 'N/A'}</p>
          <p><span className="font-bold">Lease Start:</span> {historyItem.lease_start || 'N/A'}</p>
          <p><span className="font-bold">Lease End:</span> {historyItem.lease_end || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Taxes</h6>
          <p><span className="font-bold">Payment Date:</span> {historyItem.tax_payment_date || 'N/A'}</p>
          <p><span className="font-bold">Amount:</span> ${historyItem.tax_amount?.toLocaleString() || 'N/A'}</p>
        </div>

        {/* Column 2 */}
        <div>
          <h6 className="font-bold text-gray-700">Legal & Disputes</h6>
          <p><span className="font-bold">Issue:</span> {historyItem.legal_issue || 'N/A'}</p>
          <p><span className="font-bold">Resolution Date:</span> {historyItem.resolution_date || 'N/A'}</p>
          <p><span className="font-bold">Dispute Type:</span> {historyItem.dispute_type || 'N/A'}</p>
          <p><span className="font-bold">Status:</span> {historyItem.dispute_status || 'N/A'}</p>
          <p><span className="font-bold">Resolution Date:</span> {historyItem.dispute_resolution_date || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Permits & Environmental</h6>
          <p><span className="font-bold">Permit Approval:</span> {historyItem.permit_approval_date || 'N/A'}</p>
          <p><span className="font-bold">Environmental Assessment:</span> {historyItem.environmental_assessment_date || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Disaster History</h6>
          <p><span className="font-bold">Type:</span> {historyItem.disaster_type || 'N/A'}</p>
          <p><span className="font-bold">Description:</span> {historyItem.disaster_description || 'N/A'}</p>
          <p><span className="font-bold">Date:</span> {historyItem.disaster_date || 'N/A'}</p>
          <p><span className="font-bold">Status:</span> {historyItem.status_after_disaster || 'N/A'}</p>

        </div>
        <div>
          {/* Column 3 */}

          <h6 className="font-bold text-gray-700 mt-4">Insurance & Claims</h6>
          <p><span className="font-bold">Policy Number:</span> {historyItem.insurance_policy_number || 'N/A'}</p>
          <p><span className="font-bold">Claim Date:</span> {historyItem.claim_date || 'N/A'}</p>
          <p><span className="font-bold">Claim Amount:</span> ${historyItem.claim_amount?.toLocaleString() || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Crime Reports</h6>
          <p><span className="font-bold">Crime Type:</span> {historyItem.crime_type || 'N/A'}</p>
          <p><span className="font-bold">Crime Date:</span> {historyItem.crime_date || 'N/A'}</p>

          <h6 className="font-bold text-gray-700 mt-4">Valuation</h6>
          <p><span className="font-bold">Valuation Date:</span> {historyItem.valuation_date || 'N/A'}</p>
          <p><span className="font-bold">Property Value:</span> ${historyItem.property_value?.toLocaleString() || 'N/A'}</p>
        </div>
      </div>
    </div>
  ))}
</div>


            </div>
          </div>
        </div>
      ) : (
        // Vehicle Cards List
        <>
          <h2 className="text-center text-blue-600 font-semibold uppercase">Featured Vehicles</h2>
          <h1 className="text-center text-3xl font-bold mb-6">Our Vehicles</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
            {vehicles &&
              vehicles.map(
                (vehicle) =>
                  vehicle &&
                  vehicle.images &&
                  vehicle.images.length > 0 && (
                    <div
                      key={vehicle.property_id}
                      onClick={() => handleCardClick(vehicle)} // Click handler for setting selected vehicle
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        {/* Horizontal Scrollable Images */}
                        <div className="flex overflow-x-auto space-x-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300">
                          {vehicle.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || 'https://via.placeholder.com/300'}
                              alt={`Vehicle Image ${index + 1}`}
                              className="w-64 h-48 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-4">
                        {/* Vehicle Info */}
                        <h3 className="text-lg font-semibold">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600">VIN: {vehicle.vin}</p>
                        <p className="text-sm text-gray-600">Location: {vehicle.location || 'N/A'}</p>
                        <p className="mt-2 text-xl font-semibold text-blue-600">${vehicle.price}</p>
                        <p
                          className={`mt-1 font-semibold ${
                            vehicle.status === 'Available' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {vehicle.status}
                        </p>
                      </div>
                    </div>
                  )
              )}
          </div>
        </>
      )}
      <Footer/>
    </section>
  );
};

export default FeaturedVehicles;
