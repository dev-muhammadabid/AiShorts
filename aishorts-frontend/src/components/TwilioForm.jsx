// TwilioForm.jsx - Fix API endpoints and error handling
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TwilioForm = ({ onOtpSent }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || !username) {
      setMessage('Please enter both phone number and username.');
      return;
    }

    setLoading(true);
    try {
     // Change the API endpoint to full URL for development
const response = await axios.post(
    'http://localhost:8080/otp/send-otp', // Add backend URL
    {
      phoneNumber: phoneNumber.replace(/[^0-9+]/g, ''), // Sanitize input
      username,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
      
      if (response.data.status === 'DELIVERED') {
        setMessage('OTP sent successfully!');
        onOtpSent(username);
      } else {
        setMessage('Failed to send OTP: ' + response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-form">
      <h2 className="text-white">Login</h2>
      <input
        type="tel"
        placeholder="+91 1234567890"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button 
        onClick={handleSendOtp} 
        disabled={loading}
        className="send-otp-btn"
      >
        {loading ? 'Sending...' : 'Send OTP'}
      </button>
      {message && <p className="message" data-success={message.includes('success')} data-error={!message.includes('success')}>{message}</p>}
    </div>
  );
};

TwilioForm.propTypes = {
  onOtpSent: PropTypes.func.isRequired,
};

export default TwilioForm;