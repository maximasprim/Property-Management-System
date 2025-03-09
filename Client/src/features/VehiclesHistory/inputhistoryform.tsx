import React, { useState, useEffect } from "react";
import { useAddVehicleHistoryMutation } from "./historyApi";

interface VehicleHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property_id: string;
}



const VehicleHistoryModal: React.FC<VehicleHistoryModalProps> = ({ isOpen, onClose, property_id }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    property_id: property_id,
    previous_owner: "",
    transfer_date: "",
  });

  const [addVehicleHistory, { isLoading, isError, isSuccess }] = useAddVehicleHistoryMutation();

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, property_id }));
  }, [property_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addVehicleHistory(formData).unwrap();
      alert("Vehicle history added successfully!");
      setFormData({
        property_id: property_id,
        previous_owner: "",
        transfer_date: "",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting vehicle history:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {isError && <p className="text-red-500 mb-2">Failed to submit history.</p>}
        {isSuccess && <p className="text-green-500 mb-2">Vehicle history added successfully!</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="property_id"
            value={formData.property_id}
            disabled
            className="border p-2 rounded bg-gray-100"
          />
          <input
            type="text"
            name="previous_owner"
            value={formData.previous_owner}
            onChange={handleChange}
            placeholder="Previous Owner"
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="transfer_date"
            value={formData.transfer_date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Vehicle History"}
          </button>
        </form>

        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default VehicleHistoryModal;
