// Package Declaration
package dev.abid.aishorts_backend.services;

// Imports
import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import dev.abid.aishorts_backend.configurations.TwilioConfig;
import dev.abid.aishorts_backend.entities.OtpRequest;
import dev.abid.aishorts_backend.entities.OtpResponseDto;
import dev.abid.aishorts_backend.entities.OtpStatus;
import dev.abid.aishorts_backend.entities.OtpValidationRequest;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.text.DecimalFormat;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TwilioService {

    private static final Logger logger = LoggerFactory.getLogger(TwilioService.class);

    private final TwilioConfig twilioConfig;

    // Thread-safe map to store OTPs mapped by username
    private final Map<String, String> otpMap = new ConcurrentHashMap<>();

    // Constructor injection for better testability and immutability
    public TwilioService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
    }

    /**
     * Initializes the Twilio SDK with account credentials once the service is constructed.
     */
    @PostConstruct
    public void init() {
        try {
            Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
            logger.info("Twilio initialized successfully");
        } catch (Exception e) {
            logger.error("Twilio initialization failed", e);
        }
    }

    /**
     * Sends an OTP SMS to the phone number specified in the request.
     * Validates phone number format, generates OTP, sends SMS via Twilio, and stores the OTP.
     *
     * @param otpRequest containing username and phone number.
     * @return OtpResponseDto with status and message.
     */
    public OtpResponseDto sendSMS(OtpRequest otpRequest) {
        try {
            // Remove all characters except digits and plus sign to sanitize the phone number
            String sanitizedNumber = otpRequest.getPhoneNumber().replaceAll("[^+0-9]", "");

            // Validate phone number against E.164 format
            if (!sanitizedNumber.matches("^\\+[1-9]\\d{1,14}$")) {
                return new OtpResponseDto(OtpStatus.FAILED, "Invalid phone number format");
            }

            // Generate a 4-digit OTP
            String otp = generateOTP();

            String messageBody = "Your verification code: " + otp;

            Message message;

            // Send SMS either using Messaging Service SID (recommended) or from a phone number
            if (twilioConfig.getMessagingServiceSid() != null && !twilioConfig.getMessagingServiceSid().trim().isEmpty()) {
                message = Message.creator(
                                new PhoneNumber(sanitizedNumber),
                                new PhoneNumber(""), // Empty because messaging service SID is used
                                messageBody)
                        .setMessagingServiceSid(twilioConfig.getMessagingServiceSid())
                        .create();
            } else {
                message = Message.creator(
                                new PhoneNumber(sanitizedNumber),
                                new PhoneNumber(twilioConfig.getPhoneNumber()),
                                messageBody)
                        .create();
            }

            // Store OTP for the username for later validation
            otpMap.put(otpRequest.getUsername(), otp);

            logger.info("OTP sent to {} with Message SID: {}", sanitizedNumber, message.getSid());

            return new OtpResponseDto(OtpStatus.DELIVERED, "OTP sent successfully");

        } catch (ApiException e) {
            logger.error("Twilio API error: {}", e.getMessage());
            return new OtpResponseDto(OtpStatus.FAILED, "Error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during OTP send", e);
            return new OtpResponseDto(OtpStatus.FAILED, "Internal server error");
        }
    }

    /**
     * Validates the OTP entered by the user against the stored OTP.
     *
     * @param request containing username and OTP number.
     * @return String message indicating if OTP is valid, invalid or expired.
     */
    public String validateOtp(OtpValidationRequest request) {
        String storedOtp = otpMap.get(request.getUsername());

        // OTP not found or expired
        if (storedOtp == null) {
            return "OTP expired";
        }

        // Compare stored OTP with user input
        return storedOtp.equals(request.getOtpNumber())
                ? "OTP is valid!"
                : "Invalid OTP";
    }

    /**
     * Generates a random 4-digit OTP as a zero-padded string.
     *
     * @return 4-digit OTP string
     */
    private String generateOTP() {
        return new DecimalFormat("0000").format(new Random().nextInt(10000));
    }
}
