package dev.abid.aishorts_backend.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import dev.abid.aishorts_backend.configurations.TwilioConfig;
import dev.abid.aishorts_backend.entities.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class TwilioService {

    @Autowired
    private TwilioConfig twilioConfig;

    private final Map<String, String> otpMap = new HashMap<>();

    @PostConstruct
    public void init() {
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    public OtpResponseDto sendSMS(OtpRequest otpRequest) {
        OtpResponseDto otpResponseDto;
        try {
            String otp = generateOTP();
            String otpMessage = "Dear Customer, Your OTP is " + otp + " for verification.";

            Message.creator(
                    new PhoneNumber(otpRequest.getPhoneNumber()),
                    twilioConfig.getMessagingServiceSid(),
                    otpMessage
            ).create();

            otpMap.put(otpRequest.getUsername(), otp);
            otpResponseDto = new OtpResponseDto(OtpStatus.DELIVERED, otpMessage);
        } catch (Exception e) {
            e.printStackTrace();
            otpResponseDto = new OtpResponseDto(OtpStatus.FAILED, "Failed to send OTP: " + e.getMessage());
        }
        return otpResponseDto;
    }

    public String validateOtp(OtpValidationRequest otpValidationRequest) {
        String username = otpValidationRequest.getUsername();
        String storedOtp = otpMap.get(username);
        if (storedOtp != null && storedOtp.equals(otpValidationRequest.getOtpNumber())) {
            otpMap.remove(username);
            return "OTP is valid!";
        } else {
            return "OTP is invalid!";
        }
    }

    private String generateOTP() {
        return new DecimalFormat("0000").format(new Random().nextInt(10000));
    }
}
