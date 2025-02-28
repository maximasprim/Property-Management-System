import React, { useState } from "react";
import { useGetLocationsQuery, useDeleteLocationMutation } from "./LocationApi";
import UpdateLocationModal from "./LocationModal";
import { Location } from "./LocationApi";
import NewLocationForm from "./inputForm";

const Locations: React.FC = () => {
  const { data: locations, error, isLoading, refetch } = useGetLocationsQuery();
  const [deleteLocation] = useDeleteLocationMutation();

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (address: string) => {
    await deleteLocation(address);
    refetch(); // Refresh data after delete
  };

  const handleUpdate = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 w-full bg-gray-800 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Locations</h2>
      <NewLocationForm/>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error fetching locations</p>}

      <table className="min-w-full bg-gray-800 border border-gray-300 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Branch Name</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">City</th>
            <th className="py-2 px-4 border">Country</th>
            <th className="py-2 px-4 border">Zip Code</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations?.map((location) => (
            <tr key={location.address}>
              <td className="py-2 px-4 border">{location.name_of_branch}</td>
              <td className="py-2 px-4 border">{location.address}</td>
              <td className="py-2 px-4 border">{location.city}</td>
              <td className="py-2 px-4 border">{location.country}</td>
              <td className="py-2 px-4 border">{location.zip_code}</td>
              <td className="py-2 px-4 border flex gap-4">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdate(location)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(location.address)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedLocation && (
        <UpdateLocationModal
          location={selectedLocation}
          onClose={() => {
            setIsModalOpen(false);
            refetch(); // Refresh data after update
          }}
        />
      )}
    </div>
  );
};

export default Locations;
