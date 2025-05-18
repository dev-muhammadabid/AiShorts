// Package Declaration
package dev.abid.aishorts_backend.entities;

/**
 * Enum representing the status of an OTP delivery attempt.
 */
public enum OtpStatus {
    DELIVERED, // OTP was successfully sent
    FAILED     // OTP sending failed
}
