import { useState } from "react";
import { useUpdateLocationMutation,Location } from "./LocationApi";


interface UpdateLocationModalProps {
  location: Location;
  onClose: () => void;
}

const UpdateLocationModal: React.FC<UpdateLocationModalProps> = ({
  location,
  onClose,
}) => {
  const [updatedLocation, setUpdatedLocation] = useState({ ...location });

  const [updateLocation, { isLoading, error }] = useUpdateLocationMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedLocation({
      ...updatedLocation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLocation({
        ...updatedLocation,
      }).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update location:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Location
        </h2>
        {error && <p className="text-red-500">Error updating location</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Branch Name</label>
            <input
              type="text"
              name="name_of_branch"
              value={updatedLocation.name_of_branch}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={updatedLocation.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={updatedLocation.city}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={updatedLocation.country}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ZIP Code</label>
            <input
              type="text"
              name="zip_code"
              value={updatedLocation.zip_code}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLocationModal;
