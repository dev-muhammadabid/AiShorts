//Package Declaration
package dev.abid.aishorts_backend.services;

//Imports
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

//Annotation
@Service
public class ChatService {

    //Maximum number of words allowed in a summary
    private static final int MAX_SUMMARY_WORDS = 60;
    // Set of characters that indicate the end of a sentence
    private static final Set<Character> SENTENCE_TERMINATORS = Set.of('.', '!', '?');
    // Dependencies
    private final RestTemplate restTemplate;
    private final String geminiApiKey;

    //Constructor
    public ChatService(RestTemplate restTemplate, String geminiApiKey) {
        this.restTemplate = restTemplate;
        this.geminiApiKey = geminiApiKey;
    }

    public String sendMessageToGemini(String userMessage) {
        // Construct the API endpoint with the provided API key
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

        // Create request body and headers
        Map<String, Object> requestBody = createRequestBody(userMessage);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, createHeaders());

        try {
            // Make a POST request to the API
            ResponseEntity<String> response = restTemplate.exchange(
                    endpoint, HttpMethod.POST, entity, String.class);

            // Check if the response status is not successful
            if (!response.getStatusCode().is2xxSuccessful()) {
                return "Error: Gemini API returned status " + response.getStatusCode();
            }

            // Extract and summarize the response text
            String fullResponse = extractTextFromResponse(response.getBody());
            return summarizeResponse(fullResponse);
        } catch (Exception e) {
            return "Error communicating with Gemini API: " + e.getMessage();
        }
    }

    private Map<String, Object> createRequestBody(String message) {
        // Encapsulate user message in the required format
        Map<String, Object> textPart = Map.of("text", message);
        Map<String, Object> content = Map.of(
                "parts", Collections.singletonList(textPart)
        );
        // Return the complete request body with configuration options
        return Map.of(
                "contents", Collections.singletonList(content),
                "generationConfig", Map.of(
                        "maxOutputTokens", 200
                )
        );
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    private String extractTextFromResponse(String responseBody) {
        try {
            JSONObject responseJson = new JSONObject(responseBody);
            JSONArray candidates = responseJson.getJSONArray("candidates");

            // Handle cases where no candidates are found
            if (candidates.isEmpty()) {
                return "Error: No candidates in API response";
            }

            // Extract the actual text response from the first candidate
            return candidates.getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");
        } catch (Exception e) {
            return "Error parsing response: " + e.getMessage();
        }
    }

    private String summarizeResponse(String text) {
        // Return immediately if the response is an error message
        if (text.startsWith("Error")) return text;

        // Split text into words
        List<String> words = new ArrayList<>(Arrays.asList(text.split("\\s+")));
        if (words.size() <= MAX_SUMMARY_WORDS) return text;

        // Extract the first MAX_SUMMARY_WORDS words
        List<String> summaryWords = words.subList(0, MAX_SUMMARY_WORDS);
        // If the response is already short enough, return as is
        StringJoiner summary = new StringJoiner(" ");

        for (String word : summaryWords) {
            summary.add(word);
        }

        // Ensure the summary ends at a complete sentence if possible
        return findCompleteSentences(summary.toString());
    }

    private String findCompleteSentences(String text) {
        int lastValidIndex = text.length() - 1;
        for (int i = text.length() - 1; i >= 0; i--) {
            if (SENTENCE_TERMINATORS.contains(text.charAt(i))) {
                lastValidIndex = i;
                break;
            }
        }
        // Return the text up to the last complete sentence
        return text.substring(0, lastValidIndex + 1);
    }
}