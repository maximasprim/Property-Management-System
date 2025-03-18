import React, { useState } from "react";
import Vehicles from "../Vehicles/FeaturedVehicle";
import Houses from "../Houses/FeaturedHouses";
import Lands from "../Lands/FeaturedLands";

const AvailableProperties: React.FC = () => {
  const [category, setCategory] = useState("all");

  return (
    <div className="h-screen mt-0 overflow-y-auto w-full p-1 mb-2">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-300">
        Available Properties
      </h2>

      {/* Property Type Tabs */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <div className="flex justify-center space-x-4 mb-6">
          {["all", "house", "land", "vehicle"].map((type) => (
            <button
              key={type}
              className={`px-5 py-2 rounded-full text-lg font-semibold transition-all ${
                category === type
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setCategory(type)}
            >
              {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <div className="mb-2">
        {(category === "all" || category === "house") && <Houses />}
      </div>
      <div className="mb-2">
        {(category === "all" || category === "vehicle") && <Vehicles />}
      </div>
      <div className="mb-2">
        {(category === "all" || category === "land") && <Lands />}
      </div>
    </div>
  );
};

export default AvailableProperties;
