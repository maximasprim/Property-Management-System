import { useState } from "react";
import { useUpdateVehicleMutation, Vehicle } from "./VehicleApi"; // Import mutation

interface UpdateVehicleModalProps {
  vehicle: any;
  onClose: () => void;
  onUpdate: (updatedVehicle: Vehicle) => void;
}

const UpdateVehicleModal: React.FC<UpdateVehicleModalProps> = ({
  vehicle,
  onClose,
}) => {
  const [updatedVehicle, setUpdatedVehicle] = useState({ ...vehicle, images: vehicle.images || [] });
  const [updateVehicle, { isLoading, error }] = useUpdateVehicleMutation(); // Use mutation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedVehicle({
      ...updatedVehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setUpdatedVehicle({
      ...updatedVehicle,
      images: urls,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVehicle({ property_id: vehicle.property_id, ...updatedVehicle }).unwrap();
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Failed to update vehicle:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update Vehicle</h2>
        {error && <p className="text-red-500">Error updating vehicle</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Make</label>
            <input type="text" name="make" value={updatedVehicle.make} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Model</label>
            <input type="text" name="model" value={updatedVehicle.model} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Year</label>
            <input type="number" name="year" value={updatedVehicle.year} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">VIN</label>
            <input type="text" name="vin" value={updatedVehicle.vin} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={updatedVehicle.status} onChange={handleChange} className="w-full border rounded p-2">
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" name="price" value={updatedVehicle.price} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mileage</label>
            <input type="number" name="mileage" value={updatedVehicle.mileage} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Fuel Type</label>
            <input type="text" name="fuel_type" value={updatedVehicle.fuel_type} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input type="text" name="location" value={updatedVehicle.location} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Images (Comma-separated URLs)</label>
            <input type="text" name="images" value={updatedVehicle.images.join(", ")} onChange={handleImageChange} className="w-full border rounded p-2" />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>{isLoading ? "Updating..." : "Update Vehicle"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVehicleModal;
