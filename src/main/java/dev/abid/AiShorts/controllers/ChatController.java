package dev.abid.AiShorts.controllers;

import dev.abid.AiShorts.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aishorts")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/prompt")
    public String sendMessage(@RequestBody String userMessage) {
        return chatService.sendMessageToGemini(userMessage);
    }
}
