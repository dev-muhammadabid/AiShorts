package dev.abid.aishorts_backend.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatService {

    private static final int MAX_SUMMARY_WORDS = 60;
    private static final Set<Character> SENTENCE_TERMINATORS = Set.of('.', '!', '?');

    private final RestTemplate restTemplate;
    private final String geminiApiKey;

    public ChatService(RestTemplate restTemplate, String geminiApiKey) {
        this.restTemplate = restTemplate;
        this.geminiApiKey = geminiApiKey;
    }

    /**
     * Calls Gemini, summarizes, and returns a map with:
     *   - "success": Boolean
     *   - "content": String (if success)
     *   - "error": String   (if failure)
     */
    public Map<String, Object> sendMessageToGemini(String userMessage) {
        Map<String, Object> response = new HashMap<>();

        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/"
                + "gemini-1.5-flash:generateContent?key=" + geminiApiKey;
        Map<String, Object> body = createRequestBody(userMessage);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, createHeaders());

        try {
            ResponseEntity<String> apiResp = restTemplate.exchange(
                    endpoint, HttpMethod.POST, entity, String.class);

            if (!apiResp.getStatusCode().is2xxSuccessful()) {
                response.put("success", false);
                response.put("error", "Gemini API returned status: " + apiResp.getStatusCode());
                return response;
            }

            String fullText = extractTextFromResponse(apiResp.getBody());
            String summary  = summarizeResponse(fullText);

            response.put("success", true);
            response.put("content", summary);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Error communicating with Gemini API: " + e.getMessage());
        }

        return response;
    }

    private Map<String, Object> createRequestBody(String message) {
        Map<String, Object> textPart = Map.of("text", message);
        Map<String, Object> content  = Map.of("parts", List.of(textPart));
        return Map.of(
                "contents", List.of(content),
                "generationConfig", Map.of("maxOutputTokens", 200)
        );
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    private String extractTextFromResponse(String responseBody) {
        JSONObject json       = new JSONObject(responseBody);
        JSONArray candidates  = json.getJSONArray("candidates");
        if (candidates.isEmpty()) {
            return "Error: No candidates returned";
        }
        return candidates.getJSONObject(0)
                .getJSONObject("content")
                .getJSONArray("parts")
                .getJSONObject(0)
                .getString("text");
    }

    private String summarizeResponse(String text) {
        if (text.startsWith("Error")) {
            return text;
        }
        List<String> words = new ArrayList<>(Arrays.asList(text.split("\\s+")));
        if (words.size() <= MAX_SUMMARY_WORDS) {
            return text;
        }
        StringJoiner joiner = new StringJoiner(" ");
        for (String w : words.subList(0, MAX_SUMMARY_WORDS)) {
            joiner.add(w);
        }
        return findCompleteSentences(joiner.toString());
    }

    private String findCompleteSentences(String text) {
        int lastIdx = text.length() - 1;
        for (int i = text.length() - 1; i >= 0; i--) {
            if (SENTENCE_TERMINATORS.contains(text.charAt(i))) {
                lastIdx = i;
                break;
            }
        }
        return text.substring(0, lastIdx + 1);
    }
}
