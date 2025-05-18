// Imports
import { motion } from "framer-motion";

// LoadingIndicator shows a spinning loader with a message
const LoadingIndicator = () => {
  return (
    <motion.div
      className="flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spinner circle with top and bottom blue borders, rotating */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      
      {/* Message displayed beside the spinner */}
      <p className="ml-4 text-gray-200 text-lg">Generating response...</p>
    </motion.div>
  );
};

export default LoadingIndicator;
