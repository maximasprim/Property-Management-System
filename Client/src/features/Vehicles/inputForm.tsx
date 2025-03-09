import React, { useState } from "react";
import { useCreateVehicleMutation } from "./VehicleApi";

interface Vehicle {
  make: string;
  model: string;
  year: number;
  vin: string;
  status: string;
  price: number;
  mileage: number;
  fuel_type?: string;
  location?: string;
  images: string[];
}

const VehicleForm: React.FC = () => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    vin: "",
    status: "Available",
    price: 0,
    mileage:0,
    fuel_type: "",
    location: "",
    images: [],
  });

  const [addVehicle] = useCreateVehicleMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "images") {
      setVehicle((prev) => ({
        ...prev,
        images: value.split(",").map((url) => url.trim()), // Convert input to an array
      }));
    } else {
      setVehicle((prev) => ({
        ...prev,
        [name]: name === "year" || name === "price" || name === "mileage" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addVehicle(vehicle).unwrap();
      alert("Vehicle added successfully!");
      setVehicle({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        vin: "",
        status: "Available",
        price: 0,
        mileage: 0,
        fuel_type: "",
        location: "",
        images: [],
      });
    } catch (err) {
      console.error("Failed to add vehicle:", err);
      alert("Error adding vehicle.");
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-800 p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Add a New Vehicle</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="make" placeholder="Make" value={vehicle.make} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="model" placeholder="Model" value={vehicle.model} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="year" placeholder="Year" value={vehicle.year} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="vin" placeholder="VIN" value={vehicle.vin} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="status" placeholder="Status" value={vehicle.status} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="price" placeholder="Price ($)" value={vehicle.price || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="mileage" placeholder="Mileage" value={vehicle.mileage || ""} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="fuel_type" placeholder="Fuel Type" value={vehicle.fuel_type} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="location" placeholder="Location" value={vehicle.location} onChange={handleChange} className="input input-bordered w-full" required />
        
        {/* Image URLs Field */}
        <input 
          type="text" 
          name="images" 
          placeholder="Enter image URLs (comma-separated)" 
          value={vehicle.images.join(", ")} 
          onChange={handleChange} 
          className="input input-bordered w-full" 
          required 
        />
        
        
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
