import React, { useState } from "react";
import { useCreateHouseMutation } from "./HousesApi"; // Adjust the import based on your API setup

interface House {
  name: string;
  address?: string;
  number_of_rooms: number;
  size: number;
  price: number;
  status: string;
  year_built?: number;
  images: string[];
}

const HouseForm: React.FC = () => {
  const [house, setHouse] = useState<House>({
    name: "",
    address: "",
    number_of_rooms: 0,
    size: 0,
    price: 0,
    status: "Available",
    year_built: undefined,
    images: [],
  });

  const [addHouse] = useCreateHouseMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "images") {
      setHouse((prev) => ({
        ...prev,
        images: value.split(",").map((url) => url.trim()), // Convert input to an array
      }));
    } else {
      setHouse((prev) => ({
        ...prev,
        [name]: name === "number_of_rooms" || name === "size" || name === "price" || name === "year_built" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addHouse(house).unwrap();
      alert("House added successfully!");
      setHouse({
        name: "",
        address: "",
        number_of_rooms: 0,
        size: 0,
        price: 0,
        status: "Available",
        year_built: undefined,
        images: [],
      });
    } catch (err) {
      console.error("Failed to add house:", err);
      alert("Error adding house.");
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-800 p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Add a New House</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="name" placeholder="House Name" value={house.name} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="address" placeholder="Address" value={house.address} onChange={handleChange} className="input input-bordered w-full" />
        <input type="number" name="number_of_rooms" placeholder="Enter Number of Rooms" value={house.number_of_rooms || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="size" placeholder="Enter Property Size (sq ft)" value={house.size || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="price" placeholder="Enter Price ($)" value={house.price || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="status" placeholder="Status" value={house.status} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="year_built" placeholder="Year Built" value={house.year_built || ""} onChange={handleChange} className="input input-bordered w-full" />

        {/* Image URLs Field */}
        <input 
          type="text" 
          name="images" 
          placeholder="Enter image URLs (comma-separated)" 
          value={house.images.join(", ")} 
          onChange={handleChange} 
          className="input input-bordered w-full" 
          required 
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add House
        </button>
      </form>
    </div>
  );
};

export default HouseForm;
