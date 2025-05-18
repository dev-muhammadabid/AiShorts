// Package Declaration
package dev.abid.aishorts_backend.entities;

// Imports
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object representing the response after an OTP operation.
 * Contains status and a message describing the result.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpResponseDto {

    private OtpStatus status; // Enum representing OTP operation status (e.g., SUCCESS, FAILURE)
    private String message;   // Descriptive message related to OTP operation

}
