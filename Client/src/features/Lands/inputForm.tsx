import React, { useState } from "react";
import { useCreateLandMutation } from "./LandsApi"; // Adjust the import based on your API setup

interface Land {
  location?: string;
  size: number;
  price: number;
  status: string;
  land_type: string;
  images: string[];
}

const LandForm: React.FC = () => {
  const [land, setLand] = useState<Land>({
    location: "",
    size: 0,
    price: 0,
    status: "Available",
    land_type: "",
    images: [],
  });

  const [addLand] = useCreateLandMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "images") {
      setLand((prev) => ({
        ...prev,
        images: value.split(",").map((url) => url.trim()), // Convert input to an array
      }));
    } else {
      setLand((prev) => ({
        ...prev,
        [name]: name === "size" || name === "price" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLand(land).unwrap();
      alert("Land added successfully!");
      setLand({
        location: "",
        size: 0,
        price: 0,
        status: "Available",
        land_type: "",
        images: [],
      });
    } catch (err) {
      console.error("Failed to add land:", err);
      alert("Error adding land.");
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-800 p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Add a New Land</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="location" placeholder="Location" value={land.location} onChange={handleChange} className="input input-bordered w-full" />
        <input type="number" name="size" placeholder="Enter Land Size (sq ft)" value={land.size || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="price" placeholder="Enter Price ($)" value={land.price || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="status" placeholder="Status" value={land.status} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="land_type" placeholder="Land Type" value={land.land_type} onChange={handleChange} className="input input-bordered w-full" required />

        {/* Image URLs Field */}
        <input 
          type="text" 
          name="images" 
          placeholder="Enter image URLs (comma-separated)" 
          value={land.images.join(", ")} 
          onChange={handleChange} 
          className="input input-bordered w-full" 
          required 
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Land
        </button>
      </form>
    </div>
  );
};

export default LandForm;
