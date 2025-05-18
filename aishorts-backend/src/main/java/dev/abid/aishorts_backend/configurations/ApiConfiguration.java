// Package Declaration
package dev.abid.aishorts_backend.configurations;

// Imports
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * Configuration class to define application-wide beans.
 * This includes the RestTemplate for HTTP calls and the Gemini API key.
 */
@Configuration
public class ApiConfiguration {

    /**
     * Creates a singleton RestTemplate bean for performing HTTP requests.
     *
     * @return a configured RestTemplate instance.
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    /**
     * Provides the Gemini API key as a Spring-managed bean.
     *
     * @return the Gemini API key string.
     *
     * NOTE: It's not recommended to hard-code API keys in source code.
     *       Move this to a secure configuration file like `application.properties`
     *       or use environment variables in production.
     */
    @Bean
    public String geminiApiKey() {
        return "AIzaSyA_Ou9u02fb0sGyrUAMVLbZMIxQydsNlLI";
    }
}
