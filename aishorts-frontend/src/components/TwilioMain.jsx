import { useState } from 'react';
import TwilioForm from './TwilioForm';
import OtpVerificationForm from './OtpVerificationForm';
import './TwilioMain.css'; // Add styling

function TwilioMain() {
  const [username, setUsername] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleOtpSent = (user) => {
    setUsername(user);
    setOtpSent(true);
  };

  return (
<div className="twilio-container">
  <div className="logo-header flex items-center justify-center mb-6">
    <img
      src="/images/aishorts-logo.png"
      alt="AiShorts Logo"
      className="logo h-10 w-10 mr-2"
    />
    <h1 className="text-2xl ">AiShorts</h1>
  </div>

  {!otpSent ? (
    <TwilioForm onOtpSent={handleOtpSent} />
  ) : (
    <OtpVerificationForm username={username} />
  )}
</div>

  );
}

export default TwilioMain;