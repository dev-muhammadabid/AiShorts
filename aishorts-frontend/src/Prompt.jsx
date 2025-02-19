import UserPrompt from "./components/UserPrompt";
import Response from "./components/Response";
import './App.css';
import { useState, useEffect } from "react";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function Prompt() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stompClient, setStompClient] = useState(null);

    // Initialize WebSocket connection on component mount
    useEffect(() => {
      const socket = new SockJS('http://localhost:8080/ws-chat'); // Replace with your backend URL
      const client = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          debug: (str) => console.log(str),
      });
  
      client.onConnect = (frame) => {
          console.log('Connected to WebSocket:', frame);
          setStompClient(client);
  
          // Subscribe to the response topic
          client.subscribe('/topic/messages', (message) => {
            try {
                const responseData = JSON.parse(message.body);
                setResponse(responseData);
            } catch {
                setError("Invalid response format");
            }
            setLoading(false);
        });
      };
  
      client.onStompError = (frame) => {
          console.error('WebSocket error:', frame);
          setError("Failed to connect to WebSocket. Retrying...");
          setTimeout(() => client.activate(), 5000); // Retry connection after 5 seconds
      };
  
      client.activate();
  
      // Cleanup on component unmount
      return () => {
          if (client) {
              client.deactivate();
          }
      };
  }, []);

    const handleInputSubmit = async (userMessage) => {
        setLoading(true);
        setResponse(null);
        setError(null);

        if (stompClient && stompClient.connected) {
            // Send the message to the WebSocket endpoint
            stompClient.publish({
                destination: '/app/sendMessage',
                body: JSON.stringify({ text: userMessage }),
            });
        } else {
            setError("WebSocket connection not established.");
            setLoading(false);
        }
    };

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
            </div>
            <UserPrompt onSubmit={handleInputSubmit} />
        </>
    );
}

export default Prompt;