import axios from 'axios';

// API endpoint URL for prompt processing
// Change this URL as per your deployment environment or use environment variables
const API_URL = "http://localhost:8080/aishorts/prompt";

/**
 * Sends a POST request to the backend API with the user's message
 * and returns the processed response data.
 *
 * @param {string} userMessage - The message input from the user to be processed by the API
 * @returns {Promise<any>} - The response data from the API
 * @throws Will throw an error if the API request fails
 */
export const fetchResponse = async (userMessage) => {
    try {
        // POST request to the API with userMessage as the payload
        const response = await axios.post(API_URL, { userMessage });
        
        // Return the actual data from the response
        return response.data;
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching response from API:", error);
        
        // Propagate the error to be handled by the caller
        throw error;
    }
}
