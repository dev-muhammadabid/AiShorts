package dev.abid.aishorts_backend.services;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TwilioService {

    private static final Logger logger = LoggerFactory.getLogger(TwilioService.class);

    @Autowired
    private TwilioConfig twilioConfig;

    private final Map<String, String> otpMap = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        try {
            Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
            logger.info("Twilio initialized successfully");
        } catch (Exception e) {
            logger.error("Twilio initialization failed", e);
        }
    }

    public OtpResponseDto sendSMS(OtpRequest otpRequest) {
        try {
            // Sanitize and validate the phone number
            String sanitizedNumber = otpRequest.getPhoneNumber().replaceAll("[^+0-9]", "");
            if (!sanitizedNumber.matches("^\\+[1-9]\\d{1,14}$")) {
                return new OtpResponseDto(OtpStatus.FAILED, "Invalid phone number format");
            }

            String otp = generateOTP();
            String messageBody = "Your verification code: " + otp;

            Message message;
            // Use MessagingServiceSid if available; otherwise use the 'from' phone number
            if (twilioConfig.getMessagingServiceSid() != null && !twilioConfig.getMessagingServiceSid().trim().isEmpty()) {
                // Use an empty PhoneNumber for the 'from' parameter since the messaging service will be used
                message = Message.creator(
                                new PhoneNumber(sanitizedNumber),
                                new PhoneNumber(""),
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

            otpMap.put(otpRequest.getUsername(), otp);
            logger.info("OTP sent to {} with Message SID: {}", sanitizedNumber, message.getSid());
            return new OtpResponseDto(OtpStatus.DELIVERED, "OTP sent successfully");

        } catch (ApiException e) {
            logger.error("Twilio error: {}", e.getMessage());
            return new OtpResponseDto(OtpStatus.FAILED, "Error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error", e);
            return new OtpResponseDto(OtpStatus.FAILED, "Internal server error");
        }
    }

    public String validateOtp(OtpValidationRequest request) {
        String storedOtp = otpMap.get(request.getUsername());
        if (storedOtp == null) {
            return "OTP expired";
        }
        return storedOtp.equals(request.getOtpNumber())
                ? "OTP is valid!"
                : "Invalid OTP";
    }


    private String generateOTP() {
        // Generates a 4-digit OTP.
        return new DecimalFormat("0000").format(new Random().nextInt(10000));
    }
}
