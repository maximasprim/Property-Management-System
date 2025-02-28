import React, { useState } from "react";
import { useCreateLocationMutation } from "./LocationApi";
import { Location } from "./LocationApi";

const NewLocationForm: React.FC = () => {
  const [createLocation, { isLoading, error }] = useCreateLocationMutation();
  const [formData, setFormData] = useState<Location>({
    name_of_branch: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
    // created_at: new Date().toISOString(),
    // updated_at: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLocation(formData).unwrap();
      setFormData({
        name_of_branch: "",
        address: "",
        city: "",
        country: "",
        zip_code: "",
        // created_at: new Date().toISOString(),
        // updated_at: new Date().toISOString(),
      }); // Reset form after success
    } catch (err) {
      console.error("Failed to create location:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-800 shadow-md rounded-md ">
      <h2 className="text-xl font-semibold mb-4">Add New Location</h2>
      {error && <p className="text-red-500">Error creating location</p>}

      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <div>
          <label className="block text-sm font-medium">Branch Name</label>
          <input
            type="text"
            name="name_of_branch"
            value={formData.name_of_branch}
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
            value={formData.address}
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
            value={formData.city}
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
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Zip Code</label>
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-48 h-10"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Location"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewLocationForm;
