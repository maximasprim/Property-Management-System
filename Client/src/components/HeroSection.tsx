import  { useState } from 'react';
import background from '../assets/mansion6.jpg';
import mansion7 from '../assets/mansion7.jpg';

const HeroSection = () => {
  const [searchType, setSearchType] = useState('For Rent');
  const [filters, setFilters] = useState({ type: 'All', location: '', keyword: '' });

  const handleSearchTypeToggle = (type:any) => {
    setSearchType(type);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching with filters:', filters, 'and search type:', searchType);
  };

  return (
    <div className="bg-gray-100">
      <div className="relative">
        <div className="w-full object-cover hero h-screen bg-cover bg-center mb-20" 
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-6">
          <h2 className="text-xl font-semibold mb-2">Find out why we are your choice</h2>
          <h1 className="text-4xl md:text-5xl font-bold">TrueEstate Property Management</h1>

          {/* Existing Overlay Buttons */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon1.png" alt="Management" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">MANAGEMENT SERVICES</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src={mansion7} alt="Services" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">Housing SERVICES</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon3.png" alt="Tenant Resources" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">Vehicle Services</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-700 p-4 rounded-full mb-2">
                <img src="icon4.png" alt="Quote" className="h-8 w-8" />
              </div>
              <button className="text-lg font-medium">Land Services</button>
            </div>
          </div>

          {/* Search Functionality */}
          <div className="flex flex-col items-center mt-10 w-full max-w-3xl">
            {/* Toggle Buttons */}
            <div className="flex space-x-4">
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
            </div>

            {/* Search Bar */}
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
                name="keyword" 
                placeholder="Search Keyword" 
                className="p-2 bg-transparent outline-none w-full text-gray-700" 
                value={filters.keyword}
                onChange={handleInputChange}
              />
              <button 
                className="text-blue-600 p-2"
                onClick={() => console.log("Advanced search options")}
              >
                Search advanced
              </button>
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

      {/* Additional Section - About Text */}
      <section className="py-12 px-6 md:px-12 text-center bg-slate-100">
        <h2 className="text-3xl font-bold mb-6">Get to Know TrueEstate Property Management</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We are a dedicated property management service focused on offering high-quality services to property owners and tenants locally from wherever you are. Whether you’re looking to rent, manage, or lease properties, we’re here to guide you every step of the way.
        </p>
      </section>
    </div>
  );
};

export default HeroSection;
