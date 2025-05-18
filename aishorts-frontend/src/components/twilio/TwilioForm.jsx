// Imports
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TwilioForm = ({ onOtpSent }) => {
  // State for phone number input
  const [phoneNumber, setPhoneNumber] = useState('');
  // State for username input
  const [username, setUsername] = useState('');
  // State for status and error messages
  const [message, setMessage] = useState('');
  // Loading state to disable button while sending OTP
  const [loading, setLoading] = useState(false);

  // Custom handler for phone number input changes
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;

    // Remove any characters except digits and '+'
    value = value.replace(/[^\d+]/g, '');

    if (value.startsWith('+91')) {
      // If it starts with '+91', limit total length to 13 chars (+91 + 10 digits)
      if (value.length > 13) {
        value = value.slice(0, 13);
      }
    } else {
      // If no country code, prepend '+91' and limit to 10 digits after that
      value = '+91' + value.replace(/[^\d]/g, '').slice(0, 10);
    }

    setPhoneNumber(value);
  };

  // Function to send OTP request to backend
  const handleSendOtp = async () => {
    // Basic validation for empty inputs
    if (!phoneNumber || !username) {
      setMessage('Please enter both phone number and username.');
      return;
    }

    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      // POST request to backend API to send OTP
      const response = await axios.post(
        'http://localhost:8080/otp/send-otp', // Update URL if needed
        {
          phoneNumber: phoneNumber.replace(/[^0-9+]/g, ''), // Sanitize phone number again
          username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check response status for OTP delivery
      if (response.data.status === 'DELIVERED') {
        setMessage('OTP sent successfully!');
        // Notify parent component that OTP was sent
        onOtpSent(username);
      } else {
        setMessage('Failed to send OTP: ' + response.data.message);
      }
    } catch (error) {
      // Handle network or server errors gracefully
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="otp-form">
      <h2 className="text-white">Login</h2>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange} // Use custom phone number formatting
        aria-label="Phone number input"
        style={{ padding: '10px' }}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="Username input"
        style={{ padding: '10px' }}
      />
      <button
        onClick={handleSendOtp}
        disabled={loading}
        className="send-otp-btn"
        aria-busy={loading}
      >
        {loading ? 'Sending...' : 'Send OTP'}
      </button>
      {message && (
        <p
          className="message"
          data-success={message.toLowerCase().includes('success')}
          data-error={!message.toLowerCase().includes('success')}
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
};

TwilioForm.propTypes = {
  onOtpSent: PropTypes.func.isRequired, // Callback when OTP sent successfully
};

export default TwilioForm;
