//Package Declaration
package dev.abid.aishorts_backend.configurations;

//Imports
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

//Annotation
@Configuration
public class ApiConfiguration {

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    public String geminiApiKey(){
        return "AIzaSyA_Ou9u02fb0sGyrUAMVLbZMIxQydsNlLI";
    }
}
