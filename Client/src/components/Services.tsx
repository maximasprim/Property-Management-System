import { motion } from "framer-motion";
import { FaCarAlt, FaLandmark, FaHandshake, FaBullhorn, FaChartLine, FaClipboardList, FaUsers } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Connecting Buyers & Sellers",
    description:
      "Effortlessly connect buyers and sellers of houses, vehicles, and land with our secure platform.",
    icon: <FaHandshake className="text-green-500 text-4xl" />,
  },
  {
    title: "Property Management",
    description:
      "Manage houses, vehicles, and land properties with detailed tracking of history and status.",
    icon: <FaClipboardList className="text-blue-500 text-4xl" />,
  },
  {
    title: "Real Estate Marketing",
    description:
      "Promote properties with targeted campaigns to attract the right buyers or renters.",
    icon: <FaBullhorn className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Vehicle Listings and Sales",
    description:
      "Facilitate buying, selling, and renting of vehicles with verified ownership history.",
    icon: <FaCarAlt className="text-purple-500 text-4xl" />,
  },
  {
    title: "Land Acquisition Support",
    description:
      "Assist in purchasing or selling land, including valuations and environmental assessments.",
    icon: <FaLandmark className="text-teal-500 text-4xl" />,
  },
  {
    title: "Market Insights & Analytics",
    description:
      "Get detailed insights on market trends, property valuations, and pricing strategies.",
    icon: <FaChartLine className="text-red-500 text-4xl" />,
  },
  {
    title: "Tenant and Leasing Management",
    description:
      "Track tenant information, lease agreements, and rental payments seamlessly.",
    icon: <FaUsers className="text-orange-500 text-4xl" />,
  },
  {
    title: "Legal Compliance & Documentation",
    description:
      "Ensure all properties meet legal and regulatory requirements with streamlined processes.",
    icon: <FaClipboardList className="text-gray-500 text-4xl" />,
  },
];

const OurServices = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
        <Navbar />
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl p-6 transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  {service.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                  {service.title}
                </h3>
                <p className="mt-3 text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
            <Link to="/contact">
        <div className="flex justify-center mt-12">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md">
                Contact Us for More Information
            </button>
            </div>
            </Link>
      </div>
      <Footer />
    </div>
  );
};

export default OurServices;
