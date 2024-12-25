import axios from 'axios';

const API_URL = "http://localhost:8080/aishorts/prompt"
export const fetchResponse = async (userMessage) => {
    try{
        const response = await axios.post(API_URL, {userMessage});
        return response.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}