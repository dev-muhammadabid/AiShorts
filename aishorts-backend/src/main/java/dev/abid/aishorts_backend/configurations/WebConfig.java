// Package Declaration
package dev.abid.aishorts_backend.configurations;

// Imports
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration class to customize CORS (Cross-Origin Resource Sharing) settings.
 *
 * This allows your frontend (e.g., running on localhost:5173) to make HTTP requests
 * to your backend without being blocked by browser security policies.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configure CORS mappings to allow cross-origin requests from specific frontend.
     *
     * @param registry the CorsRegistry to configure mappings on.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow all backend endpoints
                .allowedOrigins("http://localhost:5173") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true); // Allow cookies, authentication headers
    }
}
