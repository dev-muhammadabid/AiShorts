package dev.abid.AiShorts.controllers;

import dev.abid.AiShorts.services.AiShortsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class AiShortsController {

    private final AiShortsService aiShortsService;

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> payload){
        String question = payload.get("question");
        String answer = aiShortsService.getAnswer(question);
        return ResponseEntity.ok(answer);
    }
}
