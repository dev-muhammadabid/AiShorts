import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const OtpVerificationForm = ({ username }) => {
  const [otp, setOtp] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    if (!otp.match(/^\d{4}$/)) {
      setVerificationMessage('Please enter a 4-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      // Adjust the URL if necessary to point to your backend endpoint.
      const response = await axios.post('/otp/validate-otp', {
        username,
        otpNumber: otp,
      });

      if (response.data === "OTP is valid!") {
        setVerificationMessage("✅ Verification successful!");
        // Redirect to "/prompt" after a short delay (e.g., 1.5 seconds)
        setTimeout(() => {
          navigate('/prompt');
        }, 1500);
      } else {
        setVerificationMessage("❌ Invalid OTP");
      }
    } catch (error) {
      setVerificationMessage(
        'Verification failed: ' + (error.response?.data || 'Server error')
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="verification-form">
      <h2>Enter OTP Sent to Your Phone</h2>
      <input
        type="number"
        placeholder="1234"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="4"
      />
      <button
        onClick={handleVerifyOtp}
        disabled={isVerifying}
        className="verify-btn"
      >
        {isVerifying ? 'Verifying...' : 'Verify OTP'}
      </button>
      {verificationMessage && (
        <p className="message" data-success={verificationMessage.includes('✅')}>
          {verificationMessage}
        </p>
      )}
    </div>
  );
};

OtpVerificationForm.propTypes = {
  username: PropTypes.string.isRequired,
};

export default OtpVerificationForm;
