package dev.abid.AiShorts.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;


@Configuration
public class ApiConfig {

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    public String geminiApiKey(){
        return "AIzaSyC6e3aFCU-3Slp1a9-T2Lqc3qm1dYEzceg";
    }
}