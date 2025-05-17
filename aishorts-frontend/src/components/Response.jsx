import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

// Animation variants
const responseVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const NoResponse = () => (
  <div className="relative flex items-center justify-center min-h-[60vh] bg-gray-900 p-6">
    <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
      AiShorts
    </span>
  </div>
);

const Response = ({ response }) => {
  const textToDisplay = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textToDisplay) return <NoResponse />;

  return (
    <motion.div
      className="relative flex items-center justify-center min-h-[60vh] bg-gray-900 p-6"
      initial="hidden"
      animate="visible"
      variants={responseVariants}
    >
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg max-w-2xl w-full transform transition-all hover:shadow-xl">
        <Typography className="text-gray-800 text-lg text-left whitespace-pre-wrap">
          {textToDisplay}
        </Typography>
      </div>
    </motion.div>
  );
};

Response.propTypes = {
  response: PropTypes.shape({
    candidates: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.shape({
          parts: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string.isRequired,
            })
          ),
        }),
      })
    ),
  }),
};

export default Response;
