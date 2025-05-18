// Package Declaration
package dev.abid.aishorts_backend.entities;

/**
 * Represents a simple message object used for communication,
 * typically over WebSocket or in REST payloads.
 */
public class Message {

    private String text; // The message content

    // Default constructor for frameworks (e.g., Jackson)
    public Message() {}

    // Constructor with parameter
    public Message(String text) {
        this.text = text;
    }

    // Getter for message text
    public String getText() {
        return text;
    }

    // Setter for message text
    public void setText(String text) {
        this.text = text;
    }
}
