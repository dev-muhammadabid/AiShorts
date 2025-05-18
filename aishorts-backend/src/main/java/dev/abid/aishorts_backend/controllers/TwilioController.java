// Package Declaration
package dev.abid.aishorts_backend.controllers;

// Imports
import dev.abid.aishorts_backend.entities.OtpRequest;
import dev.abid.aishorts_backend.entities.OtpResponseDto;
import dev.abid.aishorts_backend.entities.OtpValidationRequest;
import dev.abid.aishorts_backend.services.TwilioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller to handle OTP-related HTTP requests.
 * Communicates with the TwilioService to send and validate OTPs via SMS.
 */
@RestController
@RequestMapping("/otp")
@Slf4j
public class TwilioController {

    @Autowired
    private TwilioService twilioService;

    /**
     * Test endpoint to verify that the service is up.
     * @return a static message indicating the SMS service is operational.
     */
    @GetMapping("/process")
    public String processSMS() {
        return "SMS sent";
    }

    /**
     * Endpoint to send an OTP to the given phone number using Twilio.
     *
     * @param otpRequest Contains the target phone number.
     * @return Response DTO containing success/failure status and other details.
     */
    @PostMapping("/send-otp")
    public OtpResponseDto sendOtp(@RequestBody OtpRequest otpRequest) {
        log.info("Sending OTP to: {}", otpRequest.getPhoneNumber());
        return twilioService.sendSMS(otpRequest);
    }

    /**
     * Endpoint to validate the submitted OTP against the stored/generated OTP.
     *
     * @param request Contains phone number and the OTP to validate.
     * @return HTTP 200 with result message if valid; HTTP 500 otherwise.
     */
    @PostMapping("/validate-otp")
    public ResponseEntity<String> validateOtp(@RequestBody OtpValidationRequest request) {
        try {
            String result = twilioService.validateOtp(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // Log the exception stack trace for debugging
            log.error("OTP validation failed", e);
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
}
