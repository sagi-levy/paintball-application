import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    navigate("sent-sms")
    try {
      setIsLoading(true);
      // Add your backend API endpoint for password reset
      const response = await fetch("http://localhost:3003/reset-password", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Enter your email address to receive a password reset link.</p>

      <label>phone number:</label>
      <input
        type="email"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
      />

      <button
        onClick={handleResetPassword}
        disabled={isLoading || !phoneNumber}
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
