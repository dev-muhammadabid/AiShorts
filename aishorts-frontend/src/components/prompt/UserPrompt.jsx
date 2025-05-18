// Imports
import PropTypes from "prop-types";
import { useState } from "react";

function UserPrompt({ onSubmit, loading }) {
  // Local state to hold the current input message
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit behavior (page reload)
    if (message.trim()) { // Only submit if message is not empty or whitespace
      onSubmit(message);  // Call the parent onSubmit handler with the message
      setMessage("");     // Clear the input after sending
    }
  };

  return (
    // Form container with submit handler
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4">
      <div className="flex gap-2 max-w-3xl mx-auto">
        {/* Input field bound to local state */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading} // Disable input while loading
        />
        {/* Submit button, disabled while loading or if input is empty */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
          disabled={loading || !message.trim()}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}

// Prop types validation to ensure onSubmit is a function and loading is boolean
UserPrompt.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UserPrompt;
