package dev.abid.aishorts_backend.controllers;

import dev.abid.aishorts_backend.entities.ChatLog;
import dev.abid.aishorts_backend.entities.Message;
import dev.abid.aishorts_backend.repositories.ChatLogRepository;
import dev.abid.aishorts_backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.awt.SystemColor.text;

@RestController
@RequestMapping("/aishorts")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatLogRepository chatLogRepository;

    @Autowired
    public ChatController(ChatService chatService,
                          SimpMessagingTemplate messagingTemplate,
                          ChatLogRepository chatLogRepository) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
        this.chatLogRepository = chatLogRepository;
    }

    // ----------------------------
    // 1) REST: POST /aishorts/prompt
    // ----------------------------
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

    // ---------------------------------------------
    // 2) WebSocket: client sends to /app/sendMessage
    // ---------------------------------------------
    @MessageMapping("/sendMessage")
    public void handleMessage(@Payload Map<String, Object> payload) {
        try {
            String userMessage = (String) payload.get("text");
            Map<String, Object> resp = chatService.sendMessageToGemini(userMessage);

            if (Boolean.TRUE.equals(resp.get("success"))) {
                // Save to database
                ChatLog log = new ChatLog();
                log.setUserMessage(userMessage);
                log.setAiResponse(resp.get("content").toString());
                chatLogRepository.save(log);

                // Send properly structured response
                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put("text", resp.get("content"));
                responseBody.put("isUser", false);

                messagingTemplate.convertAndSend("/topic/messages", responseBody);
            }
        } catch (Exception e) {
            messagingTemplate.convertAndSend("/topic/errors",
                    "Processing failed: " + e.getMessage());
        }
    }
}