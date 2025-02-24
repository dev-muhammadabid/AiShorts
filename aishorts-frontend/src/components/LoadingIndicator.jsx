import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <motion.div
      className="flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-200 text-lg">Generating response...</p>
    </motion.div>
  );
};

export default LoadingIndicator;