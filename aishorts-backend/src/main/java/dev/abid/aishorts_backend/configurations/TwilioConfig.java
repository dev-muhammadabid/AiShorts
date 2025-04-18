package dev.abid.aishorts_backend.configurations;

import com.twilio.type.PhoneNumber;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Component
@ConfigurationProperties(prefix = "twilio")
@Data
public class TwilioConfig {
    private String accountSid;
    private String authToken;
    private String phoneNumber;
    private String messagingServiceSid;
    private String serviceSid;
}
