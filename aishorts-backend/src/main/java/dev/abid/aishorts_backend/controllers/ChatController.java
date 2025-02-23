package dev.abid.aishorts_backend.controllers;

import dev.abid.aishorts_backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/aishorts")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    // REST API endpoint for HTTP POST requests
    @PostMapping("/prompt")
    public String sendMessage(@RequestBody String userMessage) {
        return chatService.sendMessageToGemini(userMessage);
    }

    // WebSocket endpoint for real-time communication
    @MessageMapping("/sendMessage")
    public void handleMessage(String userMessage, SimpMessageHeaderAccessor headerAccessor) {
        try {
            String response = chatService.sendMessageToGemini(userMessage);

            // Create proper JSON structure
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("candidates", List.of(
                    Map.of("content",
                            Map.of("parts",
                                    List.of(Map.of("text", response))
                            )
                    )));

            messagingTemplate.convertAndSend("/topic/messages", responseBody);
        } catch (Exception e) {
            messagingTemplate.convertAndSend("/topic/errors", "Processing failed: " + e.getMessage());
        }
    }
}