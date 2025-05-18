import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

// Animation variants
const responseVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Placeholder when no response yet
const NoResponse = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={responseVariants}
    className="flex items-center justify-center h-60 bg-gray-800 rounded-lg"
  >
    <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
      AiShorts
    </span>
  </motion.div>
);

// Skeleton while loading
const LoadingSkeleton = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={responseVariants}
    className="bg-gray-800 p-4 rounded-lg animate-pulse space-y-3"
  >
    <div className="h-4 bg-gray-700 rounded w-3/4" />
    <div className="h-4 bg-gray-700 rounded" />
    <div className="h-4 bg-gray-700 rounded w-5/6" />
  </motion.div>
);

// Main Response component
const Response = ({ response, isLoading, error }) => {
  // Loading state
  if (isLoading) return <LoadingSkeleton />;

  // Error state
  if (error) return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={responseVariants}
      className="bg-red-100 p-4 rounded-lg"
    >
      <Typography className="text-red-700">⚠️ {error}</Typography>
    </motion.div>
  );

  // Extract text (if passed as string or nested structure)
  const text = typeof response === "string"
    ? response
    : response?.candidates?.[0]?.content?.parts?.[0]?.text;

  // No content yet
  if (!text) return <NoResponse />;

  // Normal display
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={responseVariants}
      className="bg-gray-800 p-4 rounded-lg"
    >
      <Typography className="whitespace-pre-wrap text-gray-100">
        {text}
      </Typography>
    </motion.div>
  );
};

Response.propTypes = {
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

Response.defaultProps = {
  isLoading: false,
  error: null
};

export default Response;
