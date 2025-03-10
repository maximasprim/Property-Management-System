import React, { useRef, Suspense } from "react";
import { useGetHousesQuery, useGetLandsQuery, useGetVehiclesQuery } from "./PropertyApi";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const AvailableProperties: React.FC = () => {
  const { data: houses, isLoading: loadingHouses, error: errorHouses } = useGetHousesQuery();
  const { data: lands, isLoading: loadingLands, error: errorLands } = useGetLandsQuery();
  const { data: vehicles, isLoading: loadingVehicles, error: errorVehicles } = useGetVehiclesQuery();

  const housesRef = useRef<HTMLDivElement>(null);
  const landsRef = useRef<HTMLDivElement>(null);
  const vehiclesRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 400 * 3;
      ref.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const PropertyCard = ({ property }: { property: any }) => (
    <Link to={`/properties/${property.property_id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-95 w-[500px] flex-shrink-0">
        <div className="relative w-full h-48 overflow-hidden">
          <div className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
            {property.images && property.images.length > 0 ? (
              property.images.map((img: string, index: number) => (
                <img key={index} src={img} alt={`Image ${index + 1}`} className="w-80 h-48 object-cover rounded-lg snap-center shrink-0" />
              ))
            ) : (
              <img src="/placeholder.jpg" alt="No image" className="w-full h-48 object-cover" />
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{property.name || property.model || property.property_name || "Unnamed Property"}</h3>
          <p className="text-gray-500 text-sm">{property.city || property.address}</p>
          <p className="text-gray-700 font-medium mt-2">${property.price ? property.price.toLocaleString() : "N/A"}</p>
          <p className={`text-sm mt-1 ${property.status === "Available" ? "text-green-600" : "text-red-500"}`}>
            {property.status || "Available"}
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <PropagateLoader color="#4A90E2" />
      </div>
    }
  >
      <div className="space-y-0 w-[90%] h-screen overflow-y-auto mb-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Available Properties</h2>

        <section>
          {loadingHouses && <p>Loading houses...</p>}
          {errorHouses && <p className="text-red-500">Error loading houses</p>}
          <div className="relative">
            <button onClick={() => scroll(housesRef, "left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  bg-transparent shadow-md rounded-full">
              <ChevronLeftIcon className="h-10 w-10 text-white" />
            </button>
            <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide " ref={housesRef}>
              {houses?.map((house) => (
                <PropertyCard key={house.property_id} property={house} />
              ))}
            </div>
            <button onClick={() => scroll(housesRef, "right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10  bg-transparent shadow-md rounded-full">
              <ChevronRightIcon className="h-10 w-10 text-white" />
            </button>
          </div>
        </section>

        <section>
          {loadingLands && <p>Loading lands...</p>}
          {errorLands && <p className="text-red-500">Error loading lands</p>}
          <div className="relative">
            <button onClick={() => scroll(landsRef, "left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  bg-transparent shadow-md rounded-full">
              <ChevronLeftIcon className="h-10 w-10 text-white" />
            </button>
            <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide " ref={landsRef}>
              {lands?.map((land) => (
                <PropertyCard key={land.property_id} property={land} />
              ))}
            </div>
            <button onClick={() => scroll(landsRef, "right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10  bg-transparent shadow-md rounded-full">
              <ChevronRightIcon className="h-10 w-10 text-white" />
            </button>
          </div>
        </section>

        <section>
          {loadingVehicles && <p>Loading vehicles...</p>}
          {errorVehicles && <p className="text-red-500">Error loading vehicles</p>}
          <div className="relative">
            <button onClick={() => scroll(vehiclesRef, "left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10  bg-transparent shadow-md rounded-full">
              <ChevronLeftIcon className="h-10 w-10 text-white" />
            </button>
            <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide " ref={vehiclesRef}>
              {vehicles?.map((vehicle) => (
                <PropertyCard key={vehicle.property_id} property={vehicle} />
              ))}
            </div>
            <button onClick={() => scroll(vehiclesRef, "right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10  bg-transparent shadow-md rounded-full">
              <ChevronRightIcon className="h-10 w-10 text-white" />
            </button>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default AvailableProperties;
