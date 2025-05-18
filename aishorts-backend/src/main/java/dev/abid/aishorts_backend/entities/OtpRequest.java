// Package Declaration
package dev.abid.aishorts_backend.entities;

// Imports
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a request payload to send an OTP.
 * Contains the username and phone number to which OTP will be sent.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpRequest {

    private String username;    // Username of the user requesting OTP
    private String phoneNumber; // Phone number to send OTP to

}
