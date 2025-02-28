import { useState } from 'react';
import mansion7 from '../assets/mansion7.jpg';
import mansion from '../assets/01_l_gal.jpg';
import { Link } from 'react-router-dom';

const properties = [
  {
    id: 1,
    title: 'Casa Lomas De Machalí Machas',
    location: '145 Brooklyn Ave, California, New York',
    beds: 3,
    baths: 2,
    sqft: 1150,
    price: 'Ksh7250.00',
    featured: true,
    forSale: true,
    image: mansion, // Replace with actual image URLs
    agent: 'Arlene McCoy',
    agentImage: mansion7, // Replace with actual agent image URL
  },
  {
    id: 1,
    title: 'Casa Lomas De Machalí Machas',
    location: '145 Brooklyn Ave, California, New York',
    beds: 3,
    baths: 2,
    sqft: 1150,
    price: 'Ksh7250.00',
    featured: true,
    forSale: true,
    image: mansion, // Replace with actual image URLs
    agent: 'Arlene McCoy',
    agentImage: mansion7, // Replace with actual agent image URL
  },
  {
    id: 1,
    title: 'Casa Lomas De Machalí Machas',
    location: '145 Brooklyn Ave, California, New York',
    beds: 3,
    baths: 2,
    sqft: 1150,
    price: 'Ksh7250.00',
    featured: true,
    forSale: true,
    image: mansion, // Replace with actual image URLs
    agent: 'Arlene McCoy',
    agentImage: mansion7, // Replace with actual agent image URL
  },
  {
    id: 1,
    title: 'Casa Lomas De Machalí Machas',
    location: '145 Brooklyn Ave, California, New York',
    beds: 3,
    baths: 2,
    sqft: 1150,
    price: 'Ksh7250.00',
    featured: true,
    forSale: true,
    image: mansion, // Replace with actual image URLs
    agent: 'Arlene McCoy',
    agentImage: mansion7, // Replace with actual agent image URL
  },
  {
    id: 1,
    title: 'Casa Lomas De Machalí Machas',
    location: '145 Brooklyn Ave, California, New York',
    beds: 3,
    baths: 2,
    sqft: 1150,
    price: 'Ksh7250.00',
    featured: true,
    forSale: true,
    image: mansion, // Replace with actual image URLs
    agent: 'Arlene McCoy',
    agentImage: mansion7, // Replace with actual agent image URL
  },
  {
    id: 1,
    title: 'Casa Lomas De Machalí Machas',
    location: '145 Brooklyn Ave, California, New York',
    beds: 3,
    baths: 2,
    sqft: 1150,
    price: 'Ksh7250.00',
    featured: true,
    forSale: true,
    image: mansion, // Replace with actual image URLs
    agent: 'Arlene McCoy',
    agentImage: mansion7, // Replace with actual agent image URL
  },
  
];

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('View All');
  // const [visibleCount, setVisibleCount] = useState(3);

  const handleFilterClick = (filter:any) => {
    setActiveFilter(filter);
    // Implement filter logic based on property type if needed
  };
  // const handleViewMore = () => {
  //   setVisibleCount((prevCount) => prevCount + 6); // Show 3 more properties each time
  // };


  return (
    <section className="py-10 bg-slate-200">
      <h2 className="text-center text-blue-600 font-semibold uppercase">Featured Properties</h2>
      <h1 className="text-center text-3xl font-bold mb-6">Recommended For You</h1>

      {/* Filter Options */}
      <div className="flex justify-center space-x-4 mb-10">
        {['View All', 'Lands', 'Houses', 'Offices', 'Vehicles', 'Companies'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full font-semibold Ksh{activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Property Cards */}
      <Link to='/properties'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-black transition duration-300 ease-in-out">
            {/* Property Image */}
            <div className="relative">
              <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
              {property.featured && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">Featured</span>
              )}
              {property.forSale && (
                <span className="absolute top-2 left-20 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">For Sale</span>
              )}
              <div className="absolute bottom-2 left-2 text-white text-sm">
                <i className="fas fa-map-marker-alt"></i> {property.location}
              </div>
            </div>

            {/* Property Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <div className="flex items-center space-x-4 text-gray-600 mt-2">
                <div className="flex items-center space-x-1">
                  <i className="fas fa-bed"></i>
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-bath"></i>
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-ruler-combined"></i>
                  <span>{property.sqft} Sqft</span>
                </div>
              </div>
            </div>

            {/* Agent and Price */}
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

      {/* View More Button */}

      <div className=' flex justify-center mt-8'>
        <Link to='/properties'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700'>View More</button>
        </Link>
      </div>
      <div/>
      {/* View More Button */}
      {/* {visibleCount < properties.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            View More
          </button>
        </div>
      )}/ */}
    </section>
  );
};

export default FeaturedProperties;
