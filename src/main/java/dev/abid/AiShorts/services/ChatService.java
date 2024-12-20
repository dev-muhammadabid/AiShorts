package dev.abid.AiShorts.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatService {

    private final RestTemplate restTemplate;
    private final String geminiApiKey;

    public ChatService(RestTemplate restTemplate, String geminiApiKey) {
        this.restTemplate = restTemplate;
        this.geminiApiKey = geminiApiKey;
    }

    public String sendMessageToGemini(String userMessage) {
        String geminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

        // Construct request body
        Map<String, Object> part = new HashMap<>();
        part.put("text", userMessage);

        Map<String, Object> contents = new HashMap<>();
        contents.put("parts", new Object[]{part});

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", new Object[]{contents});

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // Make the API call
            ResponseEntity<String> response = restTemplate.exchange(geminiEndpoint, HttpMethod.POST, entity, String.class);
            return generateSixtySentenceSummary(response.getBody());
        } catch (Exception e) {
            return "Error connecting to Gemini API: " + e.getMessage();
        }
    }

    private String generateSixtySentenceSummary(String text) {
        if (text == null || text.isEmpty()) {
            return "No response received from the Gemini API.";
        }

        // Split the text into sentences
        String[] sentences = text.split("\\.\\s+");

        // Create a StringBuilder to build the summary
        StringBuilder summary = new StringBuilder();
        int sentenceCount = 0;

        // Loop through sentences and add them to the summary
        for (String sentence : sentences) {
            if (sentenceCount >= 60) {
                break; // Stop once we have 60 sentences
            }
            summary.append(sentence).append(". ");
            sentenceCount++;
        }

        // Trim and ensure the result ends with a period
        String result = summary.toString().trim();
        if (!result.endsWith(".")) {
            result += ".";
        }

        return result;
    }
}
