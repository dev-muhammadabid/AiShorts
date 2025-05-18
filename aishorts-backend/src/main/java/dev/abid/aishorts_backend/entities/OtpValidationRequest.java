// Package Declaration
package dev.abid.aishorts_backend.entities;

// Imports
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the request payload for validating an OTP.
 * Includes the username and the OTP number entered by the user.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpValidationRequest {

    private String username;  // Username of the user to validate OTP for
    private String otpNumber; // OTP code entered by the user

}
