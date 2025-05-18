// Imports
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const OtpVerificationForm = ({ username }) => {
  // State to store OTP input value
  const [otp, setOtp] = useState('');
  // Message to show verification status or errors
  const [verificationMessage, setVerificationMessage] = useState('');
  // Flag to indicate verification process is ongoing
  const [isVerifying, setIsVerifying] = useState(false);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Handler to verify the OTP
  const handleVerifyOtp = async () => {
    // Validate OTP format (exactly 4 digits)
    if (!/^\d{4}$/.test(otp)) {
      setVerificationMessage('Please enter a 4-digit OTP');
      return;
    }

    setIsVerifying(true); // Disable button while verifying

    try {
      // POST request to backend for OTP validation
      // Adjust URL if your backend endpoint differs
      const response = await axios.post('/otp/validate-otp', {
        username,
        otpNumber: otp,
      });

      // Check server response message
      if (response.data === "OTP is valid!") {
        setVerificationMessage("✅ Verification successful!");
        // Navigate to "/prompt" after short delay
        setTimeout(() => navigate('/prompt'), 1500);
      } else {
        setVerificationMessage("❌ Invalid OTP");
      }
    } catch (error) {
      // Display error message from server or generic message
      setVerificationMessage(
        'Verification failed: ' + (error.response?.data || 'Server error')
      );
    } finally {
      setIsVerifying(false); // Re-enable button after process ends
    }
  };

  return (
    <div className="verification-form">
      <h2>Enter OTP Sent to Your Phone</h2>
      <input
        type="text" // Changed from number to text to handle leading zeros properly
        placeholder="1234"
        value={otp}
        onChange={(e) => {
          // Limit input to max 4 digits and only numbers
          const value = e.target.value;
          if (/^\d{0,4}$/.test(value)) {
            setOtp(value);
          }
        }}
        maxLength={4} // maxLength works for text inputs
        inputMode="numeric" // Brings up numeric keyboard on mobile devices
        aria-label="Enter 4-digit OTP"
        style={{ padding: '10px' }}
      />
      <button
        onClick={handleVerifyOtp}
        disabled={isVerifying}
        className="verify-btn"
        aria-busy={isVerifying}
      >
        {isVerifying ? 'Verifying...' : 'Verify OTP'}
      </button>
      {verificationMessage && (
        <p
          className="message"
          data-success={verificationMessage.includes('✅')}
          role="alert"
        >
          {verificationMessage}
        </p>
      )}
    </div>
  );
};

// Prop validation for required username string
OtpVerificationForm.propTypes = {
  username: PropTypes.string.isRequired,
};

export default OtpVerificationForm;
