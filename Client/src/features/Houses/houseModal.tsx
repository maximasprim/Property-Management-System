import { useState } from "react";
import { useUpdateHouseMutation, House } from "./HousesApi"; // Import mutation

interface UpdateHouseModalProps {
  house: any;
  onClose: () => void;
  onUpdate: (updatedHouse: House) => void;
}

const UpdateHouseModal: React.FC<UpdateHouseModalProps> = ({ house, onClose }) => {
  const [updatedHouse, setUpdatedHouse] = useState({ ...house, images: house.images || [] });
  const [updateHouse, { isLoading, error }] = useUpdateHouseMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedHouse({
      ...updatedHouse,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setUpdatedHouse({
      ...updatedHouse,
      images: urls,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHouse({ property_id: house.property_id, ...updatedHouse }).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update house:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update House</h2>
        {error && <p className="text-red-500">Error updating house</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name of Property</label>
            <input type="text" name="location" value={updatedHouse.name} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input type="text" name="location" value={updatedHouse.address} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Number of Rooms</label>
            <input type="text" name="location" value={updatedHouse.number_of_rooms} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Size (sqm)</label>
            <input type="number" name="size" value={updatedHouse.size} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" name="price" value={updatedHouse.price} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={updatedHouse.status} onChange={handleChange} className="w-full border rounded p-2">
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">House Type</label>
            <input type="text" name="house_type" value={updatedHouse.house_type} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Images (Comma-separated URLs)</label>
            <input type="text" name="images" value={updatedHouse.images.join(", ")} onChange={handleImageChange} className="w-full border rounded p-2" />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>{isLoading ? "Updating..." : "Update House"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHouseModal;