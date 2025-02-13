import React from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg p-5 transition-transform duration-300 hover:scale-105 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = "" }: CardProps) => {
  return <div className={`mb-4 flex items-center justify-center ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }: CardProps) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-800 text-center ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = "" }: CardProps) => {
  return <p className={`text-gray-600 text-center ${className}`}>{children}</p>;
};
