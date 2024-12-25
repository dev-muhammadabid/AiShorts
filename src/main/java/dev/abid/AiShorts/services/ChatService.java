package dev.abid.AiShorts.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

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
            return extractTextFromResponse(response.getBody());
        } catch (Exception e) {
            return "Error connecting to Gemini API: " + e.getMessage();
        }
    }

    private String extractTextFromResponse(String responseBody) {
        if (responseBody == null || responseBody.isEmpty()) {
            return "No response received from the Gemini API.";
        }

        // Parse the response into a JSON object
        JSONObject jsonResponse = new JSONObject(responseBody);

        // Extract the text content from the JSON structure
        try {
            String text = jsonResponse
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

            // Limit the text to 60 words
            return limitToSixtyWords(text);
        } catch (Exception e) {
            return "Error parsing the response from Gemini API: " + e.getMessage();
        }
    }

    // Helper method to limit text to 60 words
    private String limitToSixtyWords(String text) {
        // Split the text into words
        String[] words = text.split("\\s+");

        // If there are more than 60 words, limit the text to 60 words
        if (words.length > 60) {
            StringBuilder limitedText = new StringBuilder();
            for (int i = 0; i < 60; i++) {
                limitedText.append(words[i]).append(" ");
            }
            // Trim and return the result
            return limitedText.toString().trim() + ".";
        }

        // If the text is less than or equal to 60 words, return it as is
        return text.trim() + ".";
    }
}
