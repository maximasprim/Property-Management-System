import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import image1 from "../../assets/team1.jpg";

const reviews = [
  {
    name: "Jane Doe",
    role: "Homebuyer",
    rating: 5,
    feedback:
    "The team helped me find my dream home seamlessly. Their service is exceptional!",
image: image1,
  },
{
    
    name: "John Smith",
    role: "Landowner",
    rating: 4,
    feedback:
      "Great platform to manage my properties. The marketing tools are incredibly effective.",
    image: image1,
  },
  {
    name: "Emma Johnson",
    role: "Vehicle Seller",
    rating: 5,
    feedback:
      "I sold my vehicle quickly thanks to their platform. Highly recommended!",
    image: image1,
  },
  {
    name: "Michael Brown",
    role: "Real Estate Investor",
    rating: 4,
    feedback:
      "Excellent insights into the market and a smooth experience managing my properties.",
    image: image1,
  },
  {
    name: "Sophia Williams",
    role: "Tenant",
    rating: 5,
    feedback:
      "Renting a property has never been easier. The platform is user-friendly and efficient!",
    image: image1,
  },
];

const Reviews = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Customers Say
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-500 ${
                      i < review.rating ? "fill-current" : "opacity-50"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
