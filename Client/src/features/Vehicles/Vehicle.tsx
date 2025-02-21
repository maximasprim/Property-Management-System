import { useFetchVehiclesWithHistoryQuery, VehicleHistory } from './VehicleApi';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import Footer from '../../components/Footer'

const FeaturedVehicles = () => {
  const { data: vehicles, isLoading, isError } = useFetchVehiclesWithHistoryQuery();
  console.log(vehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleCardClick = (vehicle: any) => {
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
    <section className="bg-slate-200">
      <Navbar />
      {selectedVehicle ? (
        // Detailed View for Selected Vehicle
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 ">
          <button onClick={handleBack} className="text-blue-600 font-semibold mb-4">
            &larr; Back to vehicles
          </button>
          <div className="flex flex-col md:flex-row gap-4">
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
              <h3 className="text-2xl font-semibold">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-sm text-gray-600">VIN: {selectedVehicle.vin}</p>
              <p className="text-sm text-gray-600">Location: {selectedVehicle.location || 'N/A'}</p>
              <p className="mt-2 text-xl font-semibold text-blue-600">${selectedVehicle.price}</p>
              <p
                className={`mt-1 font-semibold ${
                  selectedVehicle.status === 'Available' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {selectedVehicle.status}
              </p>
              {/* Vehicle History */}
              <div className="mt-4">
  <h4 className="text-gray-700 font-semibold">Vehicle History:</h4>
  {selectedVehicle.vehicles_history && selectedVehicle.vehicles_history.length > 0 ? (
    <ul className="text-gray-600 text-sm mt-2">
      {selectedVehicle.vehicles_history.map((history: VehicleHistory) => (
        <li key={history.history_id} className="mb-2">
          
          {history.previous_owner ? (
            <>
              <span className="font-bold">Previous Owner:</span> {history.previous_owner} <br />
            </>
          ) : (
            <span className="text-gray-500">No previous owner information available.</span>
          )}

          {history.maintenance_type ? (
            <>
              <span className="font-bold">Maintenance:</span> {history.maintenance_type} (
              {history.maintenance_date || 'No date available'}) <br />
            </>
          ) : null}

          {history.tax_payment_date ? (
            <>
              <span className="font-bold">Tax Paid:</span> {history.tax_amount || 'N/A'} on{' '}
              {history.tax_payment_date} <br />
            </>
          ) : null}

          {/* Add checks for other fields as needed */}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 mt-4">No history available.</p>
  )}
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
