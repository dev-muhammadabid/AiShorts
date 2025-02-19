import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "@material-tailwind/react";

const UserPrompt = ({ onSubmit }) => {
    const [userMessage, setUserMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userMessage.trim()) {
            onSubmit(userMessage);
            setUserMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="fixed bottom-0 w-full bg-gray-800 p-4">
            <div className="flex items-center justify-center space-x-4">
                <Input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow bg-gray-700 text-white rounded-lg p-2"
                />
                <Button type="submit" color="blue">
                    Send
                </Button>
            </div>
        </form>
    );
};

// Add prop-type validation
UserPrompt.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Validate that onSubmit is a function and is required
};

export default UserPrompt;