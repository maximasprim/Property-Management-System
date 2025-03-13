import { useState } from 'react';
import { Link } from 'react-router-dom';
import karen_land from '../assets/luxury land.jpg'
import toyota from '../assets/landcruiser.jpg'
import apartment from '../assets/apartment.jpg'
import naivasha from '../assets/farm land.jpg'
import demio from '../assets/mazda demio.jpg'
import mansionpool from '../assets/mansion with pool.jpg'
import ford from '../assets/ford ranger.jpg'
import countryside from '../assets/countryside.jpg'
import townhouse from '../assets/townhouse.jpg'

const properties = [
  {
    id: 2,
    title: 'Luxury Land Estate',
    location: 'Karen, Nairobi',
    
    sqft: 10000,
    price: 'Ksh 50,000,000',
    featured: false,
    forSale: true,
    image: karen_land,
    agent: 'David Kimani',
    agentImage: 'agent_david.jpg',
    category: 'Lands',
  },
  {
    id: 3,
    title: 'Off-road SUV',
    location: 'Westlands, Nairobi',
    model: 'Toyota Land Cruiser',
    year: 2020,
    mileage: 40000,
    price: 'Ksh 8,500,000',
    featured: true,
    forSale: true,
    image: toyota,
    agent: 'Peter Njoroge',
    agentImage: 'agent_peter.jpg',
    category: 'Vehicles',
  },
  {
    id: 4,
    title: 'Apartment in Kilimani',
    location: 'Kilimani, Nairobi',
    beds: 3,
    baths: 2,
    sqft: 1500,
    price: 'Ksh 12,000,000',
    featured: true,
    forSale: true,
    image: apartment,
    agent: 'Esther Wanjiru',
    agentImage: 'agent_esther.jpg',
    category: 'Houses',
  },
  {
    id: 5,
    title: 'Prime Agricultural Land',
    location: 'Naivasha, Nakuru',
    
    sqft: 20000,
    price: 'Ksh 3,500,000 per acre',
    featured: false,
    forSale: true,
    image: naivasha,
    agent: 'John Karanja',
    agentImage: 'agent_john.jpg',
    category: 'Lands',
  },
  {
    id: 6,
    title: 'Compact City Car',
    location: 'CBD, Nairobi',
    model: 'Mazda Demio',
    year: 2018,
    mileage: 65000,
    price: 'Ksh 1,200,000',
    featured: false,
    forSale: true,
    image: demio,
    agent: 'Paul Otieno',
    agentImage: 'agent_paul.jpg',
    category: 'Vehicles',
  },
  {
    id: 7,
    title: 'Mansion with Pool',
    location: 'Runda, Nairobi',
    beds: 6,
    baths: 5,
    sqft: 6000,
    price: 'Ksh 80,000,000',
    featured: true,
    forSale: true,
    image: mansionpool,
    agent: 'Grace Mutua',
    agentImage: 'agent_grace.jpg',
    category: 'Houses',
  },
  {
    id: 8,
    title: 'Townhouse in Lavington',
    location: 'Lavington, Nairobi',
    beds: 4,
    baths: 4,
    sqft: 2500,
    price: 'Ksh 32,000,000',
    featured: false,
    forSale: true,
    image: townhouse,
    agent: 'Anthony Kamau',
    agentImage: 'agent_anthony.jpg',
    category: 'Houses',
  },
  {
    id: 9,
    title: '4x4 Double Cab Pickup',
    location: 'Industrial Area, Nairobi',
    model: 'Ford Ranger',
    year: 2021,
    mileage: 20000,
    price: 'Ksh 4,500,000',
    featured: true,
    forSale: true,
    image: ford,
    agent: 'Samuel Waweru',
    agentImage: 'agent_samuel.jpg',
    category: 'Vehicles',
  },
  {
    id: 10,
    title: 'Serene Countryside Land',
    location: 'Nyeri, Central Kenya',
    
    sqft: 15000,
    price: 'Ksh 2,000,000 per acre',
    featured: false,
    forSale: true,
    image: countryside,
    agent: 'Margaret Wambui',
    agentImage: 'agent_margaret.jpg',
    category: 'Lands',
  },
];

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('View All');
  const [showAll, setShowAll] = useState(false);

  const handleFilterClick = (filter:any) => {
    setActiveFilter(filter);
    setShowAll(false); // Reset view when switching filters
  };

  const filteredProperties = activeFilter === 'View All' 
    ? properties 
    : properties.filter(property => property.category === activeFilter);

  const displayedProperties = showAll ? filteredProperties : filteredProperties.slice(0, 6);

  return (
    <section className="py-10 bg-slate-200">
      <h2 className="text-center text-blue-600 font-semibold uppercase">Featured Properties</h2>
      <h1 className="text-center text-3xl font-bold mb-6">Recommended For You</h1>

      {/* Filter Options */}
      <div className="flex justify-center space-x-4 mb-10">
        {['View All', 'Lands', 'Houses','Vehicles'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full font-semibold ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Property Cards */}
      <Link to = '/properties'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {displayedProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-black transition duration-300 ease-in-out">
            <div className="relative">
              <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
              {/* {property.featured && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">Featured</span>
              )}
              {property.forSale && (
                <span className="absolute top-2 left-20 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">For Sale</span>
              )} */}
              <div className="absolute bottom-2 left-2 text-white text-sm">
                <i className="fas fa-map-marker-alt"></i> {property.location}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              
              <div className="flex items-center space-x-4 text-gray-600 mt-2">
                {property.beds !== undefined && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-bed"></i>
                    <span>{property.beds} Beds</span>
                  </div>
                )}
                {property.baths !== undefined && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-bath"></i>
                    <span>{property.baths} Baths</span>
                  </div>
                )}
                {property.year !== undefined && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-bath"></i>
                    <span>{property.year}</span>
                  </div>
                )}
                {property.model !== undefined && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-bath"></i>
                    <span>{property.model}</span>
                  </div>
                )}
                {property.mileage !== undefined && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-bath"></i>
                    <span>{property.mileage} Kms</span>
                  </div>
                )}
                {property.sqft !== undefined && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-ruler-combined"></i>
                    <span>{property.sqft} Sqft</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border-t">
              <div className="flex items-center space-x-2">
                <img src={property.agentImage} alt={property.agent} className="w-8 h-8 rounded-full" />
                <span className="text-gray-700 text-sm">{property.agent}</span>
              </div>
              <span className="text-blue-600 font-bold">{property.price}</span>
            </div>
          </div>
        ))}
      </div>
      </Link>

      {/* View More & View All Buttons */}
      <div className='flex justify-center mt-8 space-x-4'>
        {!showAll && filteredProperties.length > 6 && (
          <button 
            className='bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700'
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        )}
        <Link to='/properties'>
          <button className='bg-gray-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-700'>
            View All
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
