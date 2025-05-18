import { useState, useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import UserPrompt from "./UserPrompt";
import ChatBubble from "./ChatBubble";
import Response from "./Response";

// WebSocket hook manages STOMP/SockJS lifecycle
const useWebSocket = (url, onMessage, onError) => {
  const clientRef = useRef(null);

  const connect = useCallback(() => {
    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: () => {}, // silence internal logs
    });

    client.onConnect = () => {
      client.subscribe("/topic/messages", (msg) => {
        try {
          onMessage(JSON.parse(msg.body));
        } catch {
          onMessage({ text: msg.body });
        }
      });
    };

    client.onStompError = () => onError("Connection error. Please try again.");

    client.activate();
    return client;
  }, [url, onMessage, onError]);

  useEffect(() => {
    clientRef.current = connect();
    return () => clientRef.current?.deactivate();
  }, [connect]);

  return clientRef;
};

export default function Prompt() {
  const [messages, setMessages]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const messagesEndRef               = useRef(null);

  // Append server message and scroll
  const handleMessage = useCallback((data) => {
    setMessages((prev) => [
      ...prev,
      { text: data.text, isUser: false, timestamp: Date.now() }
    ]);
    setLoading(false);
  }, []);

  const handleError = useCallback((msg) => {
    setError(msg);
    setLoading(false);
  }, []);

  const clientRef = useWebSocket(
    "http://localhost:8080/ws-chat",
    handleMessage,
    handleError
  );

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send user message
  const handleInputSubmit = (userMessage) => {
    if (!userMessage.trim()) return;
    setLoading(true);
    setError(null);
    setMessages((prev) => [
      ...prev,
      { text: userMessage, isUser: true, timestamp: Date.now() }
    ]);

    try {
      if (clientRef.current?.connected) {
        clientRef.current.publish({
          destination: "/app/sendMessage",
          body: JSON.stringify({ text: userMessage })
        });
      } else {
        throw new Error("Not connected yet.");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex items-center shadow-md">
        <img
          src="/images/aishorts-logo.png"
          alt="AiShorts Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="text-xl font-semibold">AiShorts</span>
      </nav>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) =>
          msg.isUser ? (
            <ChatBubble key={i} message={msg.text} isUser />
          ) : (
            <Response key={i} response={msg.text} />
          )
        )}

        {/* Show loading spinner inside the flow */}
        {loading && <Response isLoading />}

        <div ref={messagesEndRef} />
      </main>

      {/* Input area */}
      <div className="p-4">
        <UserPrompt onSubmit={handleInputSubmit} loading={loading} />
        {error && <div className="mt-2 text-red-400">{error}</div>}
      </div>
    </div>
  );
}
