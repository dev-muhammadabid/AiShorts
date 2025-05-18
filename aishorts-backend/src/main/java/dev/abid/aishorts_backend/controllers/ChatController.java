//Package Declaration
package dev.abid.aishorts_backend.controllers;

// Imports
import dev.abid.aishorts_backend.entities.ChatLog;
import dev.abid.aishorts_backend.repositories.ChatLogRepository;
import dev.abid.aishorts_backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller that handles chat interactions via both REST and WebSocket.
 */
@RestController
@RequestMapping("/aishorts")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatLogRepository chatLogRepository;

    /**
     * Constructor-based injection of dependencies.
     *
     * @param chatService         Service for interacting with Gemini API
     * @param messagingTemplate   WebSocket messaging component
     * @param chatLogRepository   Repository for saving chat logs to DB
     */
    @Autowired
    public ChatController(ChatService chatService,
                          SimpMessagingTemplate messagingTemplate,
                          ChatLogRepository chatLogRepository) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
        this.chatLogRepository = chatLogRepository;
    }

    /**
     * ----------------------------
     * 1) REST Endpoint: POST /aishorts/prompt
     * ----------------------------
     * Accepts a plain text user prompt, sends it to Gemini via ChatService,
     * and returns a summarized AI response. If successful, logs the interaction to DB.
     *
     * @param userMessage The user's message in plain text.
     * @return JSON map with keys: "success", "content" or "error".
     */
    @PostMapping("/prompt")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody String userMessage) {
        Map<String, Object> resp = chatService.sendMessageToGemini(userMessage);

        if (Boolean.TRUE.equals(resp.get("success"))) {
            ChatLog log = new ChatLog();
            log.setUserMessage(userMessage);
            log.setAiResponse(resp.get("content").toString());
            chatLogRepository.save(log);
        }

        return ResponseEntity.ok(resp);
    }

    /**
     * ---------------------------------------------
     * 2) WebSocket Endpoint: /app/sendMessage
     * ---------------------------------------------
     * Receives messages from WebSocket clients, sends to Gemini,
     * and broadcasts the AI response to subscribers of /topic/messages.
     * Errors are sent to /topic/errors.
     *
     * @param payload A map containing the "text" message from user.
     */
    @MessageMapping("/sendMessage")
    public void handleMessage(@Payload Map<String, Object> payload) {
        try {
            String userMessage = (String) payload.get("text");

            Map<String, Object> resp = chatService.sendMessageToGemini(userMessage);

            if (Boolean.TRUE.equals(resp.get("success"))) {
                // Save chat log to database
                ChatLog log = new ChatLog();
                log.setUserMessage(userMessage);
                log.setAiResponse(resp.get("content").toString());
                chatLogRepository.save(log);

                // Send response message back to WebSocket clients
                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put("text", resp.get("content"));
                responseBody.put("isUser", false);

                messagingTemplate.convertAndSend("/topic/messages", responseBody);
            }
        } catch (Exception e) {
            // Send error message to error topic
            messagingTemplate.convertAndSend("/topic/errors",
                    "Processing failed: " + e.getMessage());
        }
    }
}
