// import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/Card";
import {
  FaTools,
  FaHome,
  FaDollarSign,
  FaGavel,
  FaGlobe,
  FaExclamationTriangle,
  FaShieldAlt,
  FaBalanceScale,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const services = [
  {
    title: "Ownership History",
    description: "Track previous owners and transfer dates for vehicles.",
    icon: <FaHome className="text-green-500 text-4xl" />,
  },
  {
    title: "Maintenance and Repairs",
    description:
      "Record maintenance types, service providers, costs, and dates.",
    icon: <FaTools className="text-blue-500 text-4xl" />,
  },
  {
    title: "Rental History",
    description:
      "Keep tabs on tenant information, lease start and end dates.",
    icon: <FaDollarSign className="text-yellow-500 text-4xl" />,
  },
  {
    title: "Payment History",
    description:
      "Maintain detailed records of tax payment dates and amounts.",
    icon: <FaDollarSign className="text-orange-500 text-4xl" />,
  },
  {
    title: "Legal and Regulatory Compliance",
    description:
      "Monitor legal issues, permits, and resolution dates effectively.",
    icon: <FaGavel className="text-red-500 text-4xl" />,
  },
  {
    title: "Environmental Assessments",
    description:
      "Log disaster details, assessments, and statuses post-events.",
    icon: <FaGlobe className="text-teal-500 text-4xl" />,
  },
  {
    title: "Insurance Claims",
    description:
      "Track insurance claims, policy details, and claim amounts.",
    icon: <FaShieldAlt className="text-purple-500 text-4xl" />,
  },
  {
    title: "Crime and Safety History",
    description: "Document crime-related incidents for properties or vehicles.",
    icon: <FaExclamationTriangle className="text-gray-600 text-4xl" />,
  },
  {
    title: "Market and Valuation History",
    description: "Track valuation dates and property market values.",
    icon: <FaDollarSign className="text-green-400 text-4xl" />,
  },
  {
    title: "Dispute and Litigation History",
    description:
      "Maintain records of disputes, resolutions, and litigation history.",
    icon: <FaBalanceScale className="text-indigo-500 text-4xl" />,
  },
];

const VehiclesServ = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 ">
        <Navbar />
      <div className="container mx-auto px-6 md:px-12 mb-10">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our Vehicle Management Services
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex justify-center"
            >
              <Card className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {service.icon}
                    <CardTitle className="text-xl font-semibold text-gray-700">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
};

export default VehiclesServ;
