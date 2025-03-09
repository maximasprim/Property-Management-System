import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetHouseByIdQuery, useGetLandByIdQuery, useGetVehicleByIdQuery } from "./PropertyApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingModal from "../Bookings/CreateBookingModal"; // Import modal

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL params
  const numericId = Number(id);
  const navigate = useNavigate();

  // Fetch property details (assuming API provides individual endpoints)
  const { data: house, isLoading: houseLoading } = useGetHouseByIdQuery(numericId);
  const { data: land, isLoading: landLoading } = useGetLandByIdQuery(numericId);
  const { data: vehicle, isLoading: vehicleLoading } = useGetVehicleByIdQuery(numericId);

  // Determine the property type
  const property = house || land || vehicle;
  const isLoading = houseLoading || landLoading || vehicleLoading;

  // State for Booking Modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Handle Purchase Click
  const handlePurchaseClick = () => {
    const userId = localStorage.getItem("user_id"); // Check localStorage for user_id

    if (userId) {
      setModalOpen(true); // Open the modal if user is logged in
    } else {
      if (property) {
        navigate("/login", { state: { redirectTo: `/properties/${property.property_id}` } }); // Redirect to login first
      }
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading property details...</p>;
  if (!property) return <p className="text-center text-red-500">Property not found</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        {/* Property Title */}
        <h1 className="text-3xl font-bold mb-4">
          {("property_name" in property ? property.property_name : undefined) ??
            ("name" in property ? property.name : undefined) ??
            ("model" in property ? property.model : undefined) ??
            "Unnamed Property"}
        </h1>

        {/* Image Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
            {property.images && property.images.length > 0 ? (
              property.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Property Image ${index + 1}`}
                  className="w-80 h-56 object-cover rounded-lg snap-center shrink-0 mr-2"
                />
              ))
            ) : (
              <img src="/placeholder.jpg" alt="No Image Available" className="w-full h-56 object-cover rounded-lg" />
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-6 bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Property Information</h2>
          <button onClick={() => navigate(-1)} className="btn btn-secondary mt-4">Go Back</button>
          <p className="text-gray-700"><strong>Price:</strong> ${property.price?.toLocaleString() || "N/A"}</p>
          <p className="text-gray-700"><strong>Status:</strong> {property.status || "Available"}</p>

          {/* Conditional fields based on property type */}
          {house && (
            <>
              <p className="text-gray-700"><strong>Number of Rooms:</strong> {house.number_of_rooms}</p>
              <p className="text-gray-700"><strong>Location:</strong> {house.address}</p>
              <p className="text-gray-700"><strong>Size:</strong> {house.size} sqft</p>
            </>
          )}

          {land && (
            <>
              <p className="text-gray-700"><strong>Size:</strong> {land.size} acres</p>
              <p className="text-gray-700"><strong>Location:</strong> {land.location || "N/A"}</p>
            </>
          )}

          {vehicle && (
            <>
              <p className="text-gray-700"><strong>Make:</strong> {vehicle.make}</p>
              <p className="text-gray-700"><strong>Model:</strong> {vehicle.model}</p>
              <p className="text-gray-700"><strong>Year:</strong> {vehicle.year}</p>
              <p className="text-gray-700"><strong>Mileage:</strong> {vehicle.mileage} km</p>
            </>
          )}
        </div>

        {/* Purchase Property Button */}
        <button onClick={handlePurchaseClick} className="btn btn-primary mt-4 w-full">
          Purchase Property
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <Footer />
    </div>
  );
};

export default PropertyDetails;
