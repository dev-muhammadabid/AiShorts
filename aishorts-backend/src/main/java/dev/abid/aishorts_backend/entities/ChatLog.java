// Package Declaration
package dev.abid.aishorts_backend.entities;

// Imports
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a single interaction between the user and the AI.
 * Stores user message, AI response, and timestamp for history/logging.
 */
@Entity
@Table(name = "chat_logs") // Explicit table name for clarity
public class ChatLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String userMessage; // User's original message

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String aiResponse; // AI-generated response

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now(); // Auto-generated timestamp

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(String userMessage) {
        this.userMessage = userMessage;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public void setAiResponse(String aiResponse) {
        this.aiResponse = aiResponse;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
