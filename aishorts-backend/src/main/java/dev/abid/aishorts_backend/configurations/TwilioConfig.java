// Package Declaration
package dev.abid.aishorts_backend.configurations;

// Imports
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class to bind Twilio-related properties from application.properties
 * using the prefix "twilio".
 *
 * Example properties in application.properties:
 * twilio.account-sid=...
 * twilio.auth-token=...
 * twilio.phone-number=...
 * twilio.messaging-service-sid=...
 * twilio.service-sid=...
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "twilio")
public class TwilioConfig {

    /** Your Twilio Account SID */
    private String accountSid;

    /** Your Twilio Auth Token */
    private String authToken;

    /** Default Twilio phone number for sending SMS */
    private String phoneNumber;

    /** Messaging Service SID for Twilio Messaging Services */
    private String messagingServiceSid;

    /** Optional service SID for additional Twilio configurations */
    private String serviceSid;
}
