import { useState, useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import UserPrompt from "./UserPrompt";
import ChatBubble from "./ChatBubble";
import Response from "./Response";

// Custom hook for WebSocket
const useWebSocket = (url, onMessage, onError) => {
  const clientRef = useRef(null);

  const connect = useCallback(() => {
    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("WebSocket connected");
      client.subscribe("/topic/messages", (message) => {
      try {
  const parsed = JSON.parse(message.body);
  onMessage(parsed);
} catch {
  onMessage({ text: message.body }); // fallback if it's plain text
}
      });
    };

    client.onStompError = (frame) => {
      console.error("WebSocket error:", frame);
      onError("WebSocket error");
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
      }
    };
  }, [connect]);

  return clientRef;
};

function Prompt() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMessage = useCallback((data) => {
    console.log("Received message:", data);
    setMessages((prev) => [...prev, { text: data.text, isUser: false }]);
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

  const handleInputSubmit = async (userMessage) => {
    setLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    try {
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination: "/app/sendMessage",
          body: JSON.stringify({ text: userMessage }),
        });
      } else {
        throw new Error("Connection not ready.");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <main className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
        <Response response={Response} />
        {loading && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
      </main>
      <UserPrompt onSubmit={handleInputSubmit} loading={loading} />
    </div>
    </>
  );
}

export default Prompt;
