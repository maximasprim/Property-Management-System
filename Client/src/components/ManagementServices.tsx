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
// import Topbanner from "./Topbanner";
import Footer from "./Footer";

const services = [
  {
    title: "Ownership History",
    description: "Track previous owners and transfer dates for individual assets.",
    icon: <FaHome className="text-green-500 text-3xl" />,
  },
  {
    title: "Maintenance and Repairs",
    description:
      "Record maintenance types, service providers, costs, and dates.",
    icon: <FaTools className="text-blue-500 text-3xl" />,
  },
  {
    title: "Rental History",
    description:
      "Keep tabs on tenant information, lease start and end dates.",
    icon: <FaDollarSign className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Payment History",
    description:
      "Maintain detailed records of tax payment dates and amounts.",
    icon: <FaDollarSign className="text-orange-500 text-3xl" />,
  },
  {
    title: "Legal and Regulatory Compliance",
    description:
      "Monitor legal issues, permits, and resolution dates effectively.",
    icon: <FaGavel className="text-red-500 text-3xl" />,
  },
  {
    title: "Environmental Assessments",
    description:
      "Log disaster details, assessments, and statuses post-events.",
    icon: <FaGlobe className="text-teal-500 text-3xl" />,
  },
  {
    title: "Insurance Claims",
    description:
      "Track insurance claims, policy details, and claim amounts.",
    icon: <FaShieldAlt className="text-purple-500 text-3xl" />,
  },
  {
    title: "Crime and Safety History",
    description: "Document crime-related incidents for properties or vehicles.",
    icon: <FaExclamationTriangle className="text-gray-600 text-3xl" />,
  },
  {
    title: "Market and Valuation History",
    description: "Track valuation dates and property market values.",
    icon: <FaDollarSign className="text-green-400 text-3xl" />,
  },
  {
    title: "Dispute and Litigation History",
    description:
      "Maintain records of disputes, resolutions, and litigation history.",
    icon: <FaBalanceScale className="text-indigo-500 text-3xl" />,
  },
];

const ManagementServices = () => {
  return (
    
    <div className=" bg-gray-100 ">
        
        <Navbar />
      <div className="container mx-auto px-6 md:px-12 mb-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Property Management Services
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {service.icon}
                    <CardTitle className="text-lg font-semibold">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default ManagementServices;
