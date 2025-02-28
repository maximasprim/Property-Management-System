import { useState } from "react";
import { useUpdateLandMutation, Land } from "./LandsApi"; // Import mutation

interface UpdateLandModalProps {
  land: any;
  onClose: () => void;
  onUpdate: (updatedLand: Land) => void;
}

const UpdateLandModal: React.FC<UpdateLandModalProps> = ({ land, onClose }) => {
  const [updatedLand, setUpdatedLand] = useState({ ...land, images: land.images || [] });
  const [updateLand, { isLoading, error }] = useUpdateLandMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedLand({
      ...updatedLand,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setUpdatedLand({
      ...updatedLand,
      images: urls,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLand({ property_id: land.property_id, ...updatedLand }).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update land:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update Land</h2>
        {error && <p className="text-red-500">Error updating land</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input type="text" name="location" value={updatedLand.location} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Size (sqm)</label>
            <input type="number" name="size" value={updatedLand.size} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" name="price" value={updatedLand.price} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={updatedLand.status} onChange={handleChange} className="w-full border rounded p-2">
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Land Type</label>
            <input type="text" name="land_type" value={updatedLand.land_type} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Images (Comma-separated URLs)</label>
            <input type="text" name="images" value={updatedLand.images.join(", ")} onChange={handleImageChange} className="w-full border rounded p-2" />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>{isLoading ? "Updating..." : "Update Land"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLandModal;