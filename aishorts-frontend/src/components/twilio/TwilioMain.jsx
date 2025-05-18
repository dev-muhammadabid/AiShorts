// Imports
import { useState } from 'react';
import TwilioForm from './TwilioForm';
import OtpVerificationForm from './OtpVerificationForm';
import './TwilioMain.css'; // Import styles for the component

function TwilioMain() {
  // State to hold the username after OTP is sent
  const [username, setUsername] = useState('');
  
  // State to track whether OTP has been sent and verification form should be shown
  const [otpSent, setOtpSent] = useState(false);

  // Handler triggered when OTP is sent successfully
  const handleOtpSent = (user) => {
    setUsername(user);
    setOtpSent(true);
  };

  return (
    <div className="twilio-container">
      {/* Header with logo and app name */}
      <div className="logo-header flex items-center justify-center mb-6">
        <img
          src="/images/aishorts-logo.png"
          alt="AiShorts Logo"
          className="logo h-10 w-10 mr-2"
        />
        <h1 className="text-2xl">AiShorts</h1>
      </div>

      {/* Conditionally render TwilioForm or OtpVerificationForm */}
      {!otpSent ? (
        <TwilioForm onOtpSent={handleOtpSent} />
      ) : (
        <OtpVerificationForm username={username} />
      )}
    </div>
  );
}

export default TwilioMain;
