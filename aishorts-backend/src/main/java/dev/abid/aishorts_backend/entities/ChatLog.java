package dev.abid.aishorts_backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_logs") // Better table name
public class ChatLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String userMessage;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String aiResponse;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    // Getters and Setters
    public Long getId() { return id; }

    public String getUserMessage() { return userMessage; }
    public void setUserMessage(String userMessage) { this.userMessage = userMessage; }

    public String getAiResponse() { return aiResponse; }
    public void setAiResponse(String aiResponse) { this.aiResponse = aiResponse; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
