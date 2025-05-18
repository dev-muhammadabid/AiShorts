//Package Declaration
package dev.abid.aishorts_backend.services;

// Imports
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

/**
 * Service class for handling communication with the Gemini API and summarizing its responses.
 */
@Service
public class ChatService {

    private static final int MAX_SUMMARY_WORDS = 60; // Maximum words in the response summary
    private static final Set<Character> SENTENCE_TERMINATORS = Set.of('.', '!', '?'); // Used to end clean summary

    private final RestTemplate restTemplate;
    private final String geminiApiKey;

    /**
     * Constructor-based dependency injection.
     *
     * @param restTemplate RestTemplate instance for HTTP communication.
     * @param geminiApiKey Gemini API key (should be securely stored and injected).
     */
    public ChatService(RestTemplate restTemplate, String geminiApiKey) {
        this.restTemplate = restTemplate;
        this.geminiApiKey = geminiApiKey;
    }

    /**
     * Sends a user message to Gemini API, summarizes the response,
     * and returns a result map with success status and message content or error.
     *
     * @param userMessage The input message from the user.
     * @return A map containing:
     *         - "success": Boolean
     *         - "content": String (if success)
     *         - "error": String (if failure)
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

            // Check for non-2xx status codes
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
            // Handles connection failures, JSON parsing errors, etc.
            response.put("success", false);
            response.put("error", "Error communicating with Gemini API: " + e.getMessage());
        }

        return response;
    }

    /**
     * Constructs the request body expected by the Gemini API.
     *
     * @param message The user's message.
     * @return A map representing the request body.
     */
    private Map<String, Object> createRequestBody(String message) {
        Map<String, Object> textPart = Map.of("text", message);
        Map<String, Object> content  = Map.of("parts", List.of(textPart));

        return Map.of(
                "contents", List.of(content),
                "generationConfig", Map.of("maxOutputTokens", 200)
        );
    }

    /**
     * Creates HTTP headers for Gemini API call.
     *
     * @return Headers with Content-Type set to application/json.
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    /**
     * Parses the response body to extract generated text from Gemini's candidate output.
     *
     * @param responseBody Raw JSON string returned by Gemini API.
     * @return The text response or an error message if no candidates are found.
     */
    private String extractTextFromResponse(String responseBody) {
        JSONObject json      = new JSONObject(responseBody);
        JSONArray candidates = json.getJSONArray("candidates");

        if (candidates.isEmpty()) {
            return "Error: No candidates returned";
        }

        return candidates.getJSONObject(0)
                .getJSONObject("content")
                .getJSONArray("parts")
                .getJSONObject(0)
                .getString("text");
    }

    /**
     * Trims the full Gemini response to a concise summary of up to MAX_SUMMARY_WORDS.
     * Ensures the summary ends with a complete sentence if possible.
     *
     * @param text The original full-text response.
     * @return A trimmed and readable summary.
     */
    private String summarizeResponse(String text) {
        if (text.startsWith("Error")) {
            return text;
        }

        List<String> words = new ArrayList<>(Arrays.asList(text.split("\\s+")));
        if (words.size() <= MAX_SUMMARY_WORDS) {
            return text;
        }

        StringJoiner joiner = new StringJoiner(" ");
        for (String word : words.subList(0, MAX_SUMMARY_WORDS)) {
            joiner.add(word);
        }

        return findCompleteSentences(joiner.toString());
    }

    /**
     * Ensures the summary ends with a complete sentence by finding the last sentence terminator.
     *
     * @param text Summary text to evaluate.
     * @return Trimmed text ending at a sentence boundary if possible.
     */
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
