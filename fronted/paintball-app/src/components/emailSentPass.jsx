import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
const SentEmail = () => {
  const { logIn, user, refreshUser } = useAuth();
  const TOKEN_KEY = "token";

  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerificationCodeChange = (e) => {
    const inputCode = e.target.value;
    // You may want to add additional validation here
    setVerificationCode(inputCode);
  };

  const handleVerificationCodeSubmit = async () => {
    // Check if the entered code is valid (you may want to compare it with a server-generated code)
    const isValidCode = verificationCode.length === 4; // Example: Check if the code has 4 digits

    if (isValidCode) {
      const response = await fetch(
        "http://localhost:3003/reset-password/sent-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verificationCode }),
        }
      );
      const { user, userToken } = await response.json();
      localStorage.setItem(TOKEN_KEY, userToken);
      localStorage.getItem(TOKEN_KEY);
      refreshUser();
      // Navigate to the "Change Password" component
      navigate(`/users/change-password/via-email-code/${user._id}`, {
        state: { user },
      });
    } else {
      // Handle invalid code (show an error message or perform other actions)
      console.error("Invalid verification code");
    }
  };

  return (
    <div>
      <h2>Enter Verification Code</h2>
      <p>Please enter the 4-digit verification code sent to your email.</p>

      <input
        type="text"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
        maxLength={4}
      />

      <button onClick={handleVerificationCodeSubmit}>
        Submit Verification Code
      </button>
    </div>
  );
};

export default SentEmail;
