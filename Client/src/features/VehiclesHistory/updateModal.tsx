import React, { useState, useEffect } from "react";
import { useUpdateVehicleHistoryMutation } from "./historyApi";
import toast from "react-hot-toast";

interface UpdateVehicleHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: any;
}

const UpdateVehicleHistoryModal: React.FC<UpdateVehicleHistoryModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [updateVehicleHistory, { isLoading, isError }] =
    useUpdateVehicleHistoryMutation();

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVehicleHistory(formData).unwrap();
      alert("Vehicle history updated successfully!");
      toast.success("Vehicle history updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating history:", error);
      toast.error("Error updating history");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[700px] overflow-y-auto">
        {isError && <p className="text-red-500">Error updating history</p>}
        <h2 className="">Update vehicle History</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
  <input
    type="text"
    name="previous_owner"
    value={formData.previous_owner || ""}
    onChange={handleChange}
    placeholder="Previous Owner"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="transfer_date"
    value={formData.transfer_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="maintenance_type"
    value={formData.maintenance_type || ""}
    onChange={handleChange}
    placeholder="Maintenance Type"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="maintenance_date"
    value={formData.maintenance_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="service_provider"
    value={formData.service_provider || ""}
    onChange={handleChange}
    placeholder="Service Provider"
    className="border p-2 rounded"
  />
  <input
    type="number"
    name="maintenance_cost"
    value={formData.maintenance_cost || ""}
    onChange={handleChange}
    placeholder="Maintenance Cost"
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="tenant_name"
    value={formData.tenant_name || ""}
    onChange={handleChange}
    placeholder="Tenant Name"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="lease_start"
    value={formData.lease_start || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="lease_end"
    value={formData.lease_end || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="tax_payment_date"
    value={formData.tax_payment_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="number"
    name="tax_amount"
    value={formData.tax_amount || ""}
    onChange={handleChange}
    placeholder="Tax Amount"
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="legal_issue"
    value={formData.legal_issue || ""}
    onChange={handleChange}
    placeholder="Legal Issue"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="resolution_date"
    value={formData.resolution_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="permit_approval_date"
    value={formData.permit_approval_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="disaster_type"
    value={formData.disaster_type || ""}
    onChange={handleChange}
    placeholder="Disaster Type"
    className="border p-2 rounded"
  />
  <textarea
    name="disaster_description"
    value={formData.disaster_description || ""}
    onChange={handleChange}
    placeholder="Disaster Description"
    className="border p-2 rounded"
  ></textarea>
  <input
    type="date"
    name="disaster_date"
    value={formData.disaster_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="status_after_disaster"
    value={formData.status_after_disaster || ""}
    onChange={handleChange}
    placeholder="Status After Disaster"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="environmental_assessment_date"
    value={formData.environmental_assessment_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="insurance_policy_number"
    value={formData.insurance_policy_number || ""}
    onChange={handleChange}
    placeholder="Insurance Policy Number"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="claim_date"
    value={formData.claim_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="number"
    name="claim_amount"
    value={formData.claim_amount || ""}
    onChange={handleChange}
    placeholder="Claim Amount"
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="crime_type"
    value={formData.crime_type || ""}
    onChange={handleChange}
    placeholder="Crime Type"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="crime_date"
    value={formData.crime_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="valuation_date"
    value={formData.valuation_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <input
    type="number"
    name="property_value"
    value={formData.property_value || ""}
    onChange={handleChange}
    placeholder="Property Value"
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="dispute_type"
    value={formData.dispute_type || ""}
    onChange={handleChange}
    placeholder="Dispute Type"
    className="border p-2 rounded"
  />
  <input
    type="text"
    name="dispute_status"
    value={formData.dispute_status || ""}
    onChange={handleChange}
    placeholder="Dispute Status"
    className="border p-2 rounded"
  />
  <input
    type="date"
    name="dispute_resolution_date"
    value={formData.dispute_resolution_date || ""}
    onChange={handleChange}
    className="border p-2 rounded"
  />
  <div className="col-span-2 flex justify-between">
  <button
    type="submit"
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    disabled={isLoading}
  >
    {isLoading ? "Updating..." : "Update Vehicle History"}
  </button>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </button>
    </div>
  
</form>

      </div>
    </div>
  );
};

export default UpdateVehicleHistoryModal;
