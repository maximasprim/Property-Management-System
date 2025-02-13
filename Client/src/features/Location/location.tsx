import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const locations = [
  {
    name: "Nairobi City",
    description: "Explore premium properties, apartments, and vehicles in the heart of NYC.",
    image: "",
  },
  {
    name: "Mombasa",
    description: "Find luxury houses, vehicles, and real estate opportunities in LA.",
    image: "https://source.unsplash.com/400x300/?los-angeles",
  },
  {
    name: "Nakuru",
    description: "Discover beachfront properties, land, and high-end vehicles in Miami.",
    image: "https://source.unsplash.com/400x300/?miami",
  },
  {
    name: "Kirinyaga",
    description: "Search for urban properties, rentals, and vehicles in vibrant Chicago.",
    image: "https://source.unsplash.com/400x300/?chicago",
  },
  {
    name: "Eldoret",
    description: "Access affordable land, houses, and vehicle options in Dallas.",
    image: "https://source.unsplash.com/400x300/?dallas",
  },
  {
    name: "Kisumu",
    description: "Experience modern real estate and vehicle options in San Francisco.",
    image: "https://source.unsplash.com/400x300/?san-francisco",
  },
];

const Locations = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
        <Navbar/>
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Locations
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{location.name}</h3>
                <p className="mt-2 text-gray-600">{location.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Locations;
