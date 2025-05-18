// Package Declaration
package dev.abid.aishorts_backend.configurations;

// Imports
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket configuration class that enables and configures message broker support
 * for real-time bi-directional communication using STOMP protocol over WebSockets.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Configure the message broker:
     * - Enables a simple in-memory message broker with destination prefix "/topic"
     * - Sets the application destination prefix to "/app", which is used for mapping incoming messages
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // Outgoing messages to clients
        config.setApplicationDestinationPrefixes("/app"); // Incoming messages from clients
    }

    /**
     * Register the STOMP endpoint for WebSocket communication:
     * - Endpoint: "/ws-chat" is where clients connect
     * - Allows connections from the frontend running at localhost:5173
     * - Enables SockJS fallback for browsers that don’t support native WebSockets
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat")
                .setAllowedOrigins("http://localhost:5173") // Allow requests from frontend
                .withSockJS(); // Enable fallback options for unsupported clients
    }
}
