import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

const Response = ({ response }) => {
    if (!response || !response.candidates || response.candidates.length === 0) {
        return null; // Render nothing if there's no valid response
    }

    // Extract the text from the first candidate
    const textToDisplay = response.candidates[0]?.content?.parts?.[0]?.text;

    if (!textToDisplay) {
        return (
            <div className="relative flex items-center justify-center min-h-[60vh] bg-gray-900 p-6">
                <div className="w-full max-w-3xl space-y-6">
                    <Typography className="text-gray-300 text-center">
                        No answers found.
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-[60vh] bg-gray-900 p-6">
            {/* Response Box */}
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <Typography className="text-gray-800 text-lg text-left">
                    {textToDisplay}
                </Typography>
            </div>
        </div>
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