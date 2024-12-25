import UserPrompt from "./components/UserPrompt";
import Response from "./components/Response";
import './App.css';
import { useState } from "react";
import { fetchResponse } from "./services/api";


function Prompt() {
    const[response, setResponse] = useState(null);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputSubmit = async (userMessage) =>{
        setLoading(true);
        setResponse(null);
        setError(null);
        try{
            const apiResponse = await fetchResponse(userMessage);
            setResponse(apiResponse)
            if (typeof apiResponse === "string") {
                setResponse({ candidates: [{ content: { parts: [{ text: apiResponse }] } }] });
              } else {
                setResponse(apiResponse); // Use as is if it's already an object
              }
        }catch(error){
            setError("Failed to get response!!")
            console.error("API Error:", error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <>
            <div className="min-h-[calc(70vh)] w-auto bg-gray-900 overflow-hidden flex flex-col justify-between">
                <div className="flex-grow flex items-center justify-center">
                    {loading && (
                        <p className="text-gray-200 font-bold text-3xl">
                            Generating...
                        </p>
                    )}
                    {error && (
                        <p className="text-gray-200 font-bold text-3xl">
                            {error}
                        </p>
                    )}
                    {!loading && !error && <Response response={response} />}
                </div>
                /</div>
    <UserPrompt onSubmit={handleInputSubmit} />

    </>
  )
}

export default Prompt;