package dev.abid.aishorts_backend.controllers;


import dev.abid.aishorts_backend.entities.OtpRequest;
import dev.abid.aishorts_backend.entities.OtpResponseDto;
import dev.abid.aishorts_backend.entities.OtpValidationRequest;
import dev.abid.aishorts_backend.services.TwilioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/otp")
@Slf4j
public class TwilioController {

    @Autowired
    private TwilioService twilioService;

    @GetMapping("/process")
    public String processSMS(){
        return "SMS sent";
    }

    @PostMapping("/send-otp")
    public OtpResponseDto sendOtp(@RequestBody OtpRequest otpRequest) {
        log.info("Sending OTP to: {}", otpRequest.getPhoneNumber());
        return twilioService.sendSMS(otpRequest);
    }

    @PostMapping("/validate-otp")
    public String validateOtp(@RequestBody OtpValidationRequest otpValidationRequest){
        log.info("inside validateOtp ::" + otpValidationRequest.getUsername() + " " + otpValidationRequest);
        return twilioService.validateOtp(otpValidationRequest);
    }

}
