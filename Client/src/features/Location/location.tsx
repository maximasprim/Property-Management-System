import React from "react";
import { useGetLocationsQuery } from "./LocationApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Mapping of locations to their respective images
const locationImages: { [key: string]: string } = {
  "Eldoret branch": "https://i.pinimg.com/236x/e8/97/bf/e897bf7af97517abad9e27caed377f60.jpg",
  "Kutus branch": "https://i.pinimg.com/236x/ae/37/79/ae377980982c32971ed9143e8a7b28b7.jpg",
  "Kerugoya branch": "https://i.pinimg.com/236x/87/bf/ad/87bfad25ecfb640c1cb49c20127d4027.jpg",
  "Kagio branch": "https://i.pinimg.com/236x/ae/37/79/ae377980982c32971ed9143e8a7b28b7.jpg",
  "Nairobi branch": "https://i.pinimg.com/236x/ce/67/8a/ce678aed351c24e648a53066607de9f1.jpg",
  "Mombasa branch": "https://i.pinimg.com/236x/46/c7/6d/46c76d36b93db93672a08cc907a03a3a.jpg",
  "Kisumu branch": "https://i.pinimg.com/236x/32/fc/27/32fc276bc5b7a9c2030836ff7c71c7ae.jpg",
  "Nakuru branch": "https://i.pinimg.com/236x/e8/97/bf/e897bf7af97517abad9e27caed377f60.jpg",
};

const Locations: React.FC = () => {
  const { data: locations, error, isLoading } = useGetLocationsQuery();

  return (
    <div className="">
      <Navbar />
      <div className="p-6 w-full bg-gray-800 min-h-screen overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Our Locations</h2>

        {isLoading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error fetching locations</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {locations?.map((location) => (
            <div
              key={location.address}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300 hover:shadow-2xl transition duration-300 ease-in-out "
            >
              {/* Image Section */}
              <img
                src={locationImages[location.name_of_branch] || "/images/default.jpg"}
                alt={location.name_of_branch}
                className="w-full h-40 object-cover"
              />

              {/* Location Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{location.name_of_branch}</h3>
                <p className="text-gray-600"><strong>City:</strong> {location.city}</p>
                <p className="text-gray-600"><strong>Country:</strong> {location.country}</p>
                <p className="text-gray-600"><strong>Address:</strong> {location.address}</p>
                <p className="text-gray-600"><strong>Zip Code:</strong> {location.zip_code}</p>
              </div>

              {/* View Properties Button */}
              <div className="flex justify-center p-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700">
                  View Available Properties
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Locations;
