import { motion } from "framer-motion";
import teamMember1 from "../assets/team1.jpg"; // Replace with your image paths
import teamMember2 from "../assets/team2.jpg";
import teamMember3 from "../assets/team3.jpg";
import teamMember4 from "../assets/team4.jpg"; 
import teamMember5 from "../assets/team5.jpg";
import teamMember6 from "../assets/team6.jpg"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO",
    description: "Leading the company with a vision for innovation and success.",
    image: teamMember1,
  },
  {
    name: "Michael Smith",
    role: "CTO",
    description: "Building tech solutions to drive our goals forward.",
    image: teamMember2,
  },
  {
    name: "Emily Davis",
    role: "Marketing Head",
    description: "Crafting strategies to connect with our audience.",
    image: teamMember3,
  },
  {
    name: "Brian Mwangi",
    role: "Marketing Head",
    description: "Crafting strategies to connect with our audience.",
    image: teamMember4,
  },
  {
    name: "Jacob Jones",
    role: "Marketing Head",
    description: "Crafting strategies to connect with our audience.",
    image: teamMember5,
  },
  {
    name: "Tomas Tom",
    role: "Marketing Head",
    description: "Crafting strategies to connect with our audience.",
    image: teamMember6,
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
        <Navbar />
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Team
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl p-6 transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="h-32 w-32 object-cover rounded-full border-4 border-gray-200"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium">{member.role}</p>
                <p className="mt-3 text-gray-600 text-center">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
