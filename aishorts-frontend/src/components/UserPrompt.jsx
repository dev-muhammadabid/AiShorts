import { useState } from "react";
import PropTypes from "prop-types";
import { FiArrowRight } from "react-icons/fi";

const UserPrompt = ({onSubmit}) => {
    const [userMessage, setUserMessage] = useState("");

    const handleInputChange = (e) => {
      setUserMessage(e.target.value);
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
      if(userMessage.trim()){
        onSubmit(userMessage);
        setUserMessage("");
      }
      console.log("Searching for:", userMessage);
    };
  
    return (
      <div className="relative flex items-center justify-center min-h-[calc(20vh)] bg-gray-900">
        <form
          onSubmit={handleSearch}
          className="absolute bottom-8 flex items-center w-full max-w-3xl bg-gray-800 text-white rounded-full shadow-lg border border-gray-600"
        >
          {/* Left Icon */}
          <div className="p-3">
            {/* <FiImage className="text-white text-xl" /> */}
            <img
                alt="AiShorts Logo"
                src="./public/aishorts-logo.png"
                className="h-8 w-8 sm:ml-6"
              />
          </div>
  
          {/* Input */}
          <input
            type="text"
            value={userMessage}
            onChange={handleInputChange}
            placeholder="Search AiShorts"
            className="flex-grow bg-transparent text-white placeholder-gray-400 px-4 py-2 focus:outline-none"
          />
  
          {/* Animated Dot */}
          <div className="flex items-center justify-center px-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          </div>
  
          {/* Right Icon/Button */}
          <button
            type="submit"
            className="p-5 rounded-full bg-blue-700 hover:bg-gray-600 transition"
          >
            <FiArrowRight className="text-white text-xl" />
          </button>
        </form>
      </div>
    );
  };

  UserPrompt.propTypes = {
    onSubmit: PropTypes.func.isRequired, // onSubmit must be a function and is required
  };

export default UserPrompt;