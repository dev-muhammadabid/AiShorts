import { useState, useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import UserPrompt from "./UserPrompt";
import Response from "./Response";

// Custom hook for WebSocket connection
const useWebSocket = (url, onMessage, onError) => {
  const clientRef = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 5;

  const connect = useCallback(() => {
    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str), // Add debug logs
    });

    client.onConnect = () => {
      retryCount.current = 0;
      console.log("WebSocket connected");
      client.subscribe("/topic/messages", (message) => {
        onMessage(JSON.parse(message.body));
      });
    };

    client.onStompError = (frame) => {
      console.error("WebSocket error:", frame);
      onError(
        `Connection error${
          retryCount.current > 0
            ? ` (Retry ${retryCount.current}/${maxRetries})`
            : ""
        }`
      );
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        setTimeout(
          () => client.activate(),
          Math.min(5000 * retryCount.current, 30000)
        );
      } else {
        console.error("Max retries reached. Giving up.");
      }
    };

    client.onDisconnect = () => {
      console.log("WebSocket disconnected");
    };

    client.activate();
    return client;
  }, [url, onMessage, onError]);

  useEffect(() => {
    clientRef.current = connect();
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
        console.log("WebSocket connection cleaned up");
      }
    };
  }, [connect]);

  return clientRef;
};

function Prompt() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMessage = useCallback((data) => {
    console.log("Received message:", data);
    setResponse(data);
    setLoading(false);
  }, []);

  const handleError = useCallback((message) => {
    console.error("Error:", message);
    setError(message);
    setLoading(false);
  }, []);

  const clientRef = useWebSocket(
    "http://localhost:8080/ws-chat",
    handleMessage,
    handleError
  );

  const handleInputSubmit = useCallback(
    async (userMessage) => {
      setLoading(true);
      setResponse(null);
      setError(null);

      try {
        if (clientRef.current?.connected) {
          console.log("Sending message:", userMessage);
          clientRef.current.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify({ text: userMessage }),
          });
        } else {
          throw new Error("Connection not ready. Please wait and try again.");
        }
      } catch (err) {
        console.error("Failed to send message:", err);
        setError(err.message);
        setLoading(false);
      }
    },
    [clientRef]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <main className="flex-1 overflow-y-auto p-4">
        {error && <ErrorMessage message={error} />}
        <Response response={response} />
        {loading && <LoadingIndicator />}
      </main>
      <UserPrompt onSubmit={handleInputSubmit} loading={loading} />
    </div>
  );
}

export default Prompt;
