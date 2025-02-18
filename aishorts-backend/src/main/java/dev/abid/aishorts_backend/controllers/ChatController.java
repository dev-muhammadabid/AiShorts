//Package Declaration
package dev.abid.aishorts_backend.controllers;

//Imports
import dev.abid.aishorts_backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

//Annotations
@RestController
@RequestMapping("/aishorts")
public class ChatController {

    // Dependencies
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    //Constructor
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
    @MessageMapping("/chat")
    public void handleChatMessage(String userMessage) {
        String response = chatService.sendMessageToGemini(userMessage);
        messagingTemplate.convertAndSend("/topic/messages", response);
    }
}