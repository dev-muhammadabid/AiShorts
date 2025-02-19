package dev.abid.aishorts_backend.controllers;

import dev.abid.aishorts_backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

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
    public void handleMessage(String userMessage) {
        String response = chatService.sendMessageToGemini(userMessage);
        // Wrap response in JSON structure
        String jsonResponse = String.format("{\"candidates\":[{\"content\":{\"parts\":[{\"text\":\"%s\"}]}}]", response);
        messagingTemplate.convertAndSend("/topic/messages", jsonResponse);
    }
}