import { useState } from 'react';
import { useGetHousesQuery, useGetLandsQuery, useGetVehiclesQuery } from '../features/All_PropertyTypes/PropertyApi';
import { useNavigate } from 'react-router-dom';
import background from '../assets/mansion6.jpg';
import { Link } from 'react-router-dom';
import image1 from '../assets/managementlogo.jpg';
import image2 from '../assets/vehiclehero (2).jpg';
import image3 from '../assets/houselogo.jpg';
import image4 from '../assets/landhero.jpg';
import { Toaster, toast } from 'sonner';

const HeroSection = () => {
  const [searchType, setSearchType] = useState('For Rent');
  const [filters, setFilters] = useState({ type: 'All', location: '', property_name: '' });
  const navigate = useNavigate();

  // Fetch property data
  const { data: houses } = useGetHousesQuery();
  const { data: lands } = useGetLandsQuery();
  const { data: vehicles } = useGetVehiclesQuery();

  // Combine all properties into a single array
  const properties = [
    ...(houses || []).map((house) => ({ ...house, category: 'House' })),
    ...(lands || []).map((land) => ({ ...land, category: 'Land' })),
    ...(vehicles || []).map((vehicle) => ({ ...vehicle, category: 'Vehicle' })),
  ];

  // Handle input change for filters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle search type toggle
  const handleSearchTypeToggle = (type: string) => {
    setSearchType(type);
  };

  // Filter properties based on search inputs
  const filteredProperties = properties.filter((property:any) => {
    return (
      (filters.type === 'All' || property.category === filters.type) &&
      (filters.location === '' || (property.location && property.location.toLowerCase().includes(filters.location.toLowerCase()))) &&
      (filters.property_name === '' || (property.property_name && property.property_name.toLowerCase().includes(filters.property_name.toLowerCase())))
    );
  });

  // Handle search action
  const handleSearch = () => {
    if (filteredProperties.length > 0) {
      toast.success('Property is available! Redirecting to properties page.');
      setTimeout(() => navigate('/properties'), 2500);
    } else {
      toast.error('No properties found. Try different search criteria.');
    }
  };

  return (
    <div className="bg-gray-100">
      <Toaster position="top-right" />
      <div className="relative">
        <div className="w-full object-cover hero h-screen bg-cover bg-center mb-20" 
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-6">
          <h2 className="text-xl font-semibold mb-2">Find out why we are your choice</h2>
          <h1 className="text-4xl md:text-5xl font-bold">TrueEstate Property Management</h1>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/managementServices">
              <div className="flex flex-col items-center">
                <div className="bg-green-700 rounded-full mb-2 flex items-center justify-center">
                  <img src={image1} alt="Services" className="h-16 w-16 rounded-full" />
                </div>
                <button className="text-lg font-medium">MANAGEMENT SERVICES</button>
              </div>
            </Link>
            <Link to="/housesServices">
              <div className="flex flex-col items-center">
                <div className="bg-green-700 rounded-full mb-2 flex items-center justify-center">
                  <img src={image3} alt="Services" className="h-16 w-16 rounded-full" />
                </div>
                <button className="text-lg font-medium">Housing SERVICES</button>
              </div>
            </Link>
            <Link to="/vehiclesServices">
              <div className="flex flex-col items-center">
                <div className="bg-green-700 rounded-full mb-2 flex items-center justify-center">
                  <img src={image2} alt="Services" className="h-16 w-16 rounded-full" />
                </div>
                <button className="text-lg font-medium">Vehicle Services</button>
              </div>
            </Link>
            <Link to="/landServices">
              <div className="flex flex-col items-center">
                <div className="bg-green-700 rounded-full mb-2 flex items-center justify-center">
                  <img src={image4} alt="Services" className="h-16 w-16 rounded-full" />
                </div>
                <button className="text-lg font-medium">Land Services</button>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center mt-10 w-full max-w-3xl">
            {/* <div className="flex space-x-4">
              <button 
                className={`px-6 py-2 rounded-full ${searchType === 'For Rent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => handleSearchTypeToggle('For Rent')}
              >
                For Rent
              </button>
              <button 
                className={`px-6 py-2 rounded-full ${searchType === 'For Sale' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => handleSearchTypeToggle('For Sale')}
              >
                For Sale
              </button>
            </div> */}

            <div className="flex items-center mt-4 bg-white rounded-full shadow-lg px-4 py-2 w-full">
              <select 
                name="type" 
                className="p-2 bg-transparent outline-none text-gray-700"
                value={filters.type} 
                onChange={handleInputChange}
              >
                <option value="All">All</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Land">Land</option>
                <option value="Vehicle">Vehicle</option>
              </select>
              <input 
                type="text" 
                name="location" 
                placeholder="Search Location" 
                className="p-2 bg-transparent outline-none w-full text-gray-700" 
                value={filters.location}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="property_name" 
                placeholder="Search Property Name" 
                className="p-2 bg-transparent outline-none w-full text-gray-700" 
                value={filters.property_name}
                onChange={handleInputChange}
              />
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;