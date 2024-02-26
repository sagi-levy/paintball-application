import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_RENDER_API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phoneNumber }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        navigate("sent-email", { state: { email, phoneNumber } });
      } else {
        setMessage(data.error || "Failed to reset password.");
      }
    } catch (error) {
      navigate("sent-email", { state: { email, phoneNumber } });

      setMessage("Something went wrong. Please try again later.");
      console.error("Error resetting password:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className="p-5">
      <h2>Reset Password</h2>
      <p>Enter your email address to receive a password reset link.</p>

      <label>Email:</label>
      <input
        className="form-control w-50 m-auto"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <label>Phone:</label>
      <input
        className="form-control w-50 m-auto"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone"
      />
      <p>{message}</p>

      <button
        className="btn btn-secondary m-2"
        onClick={handleResetPassword}
        disabled={isLoading || !email || !phoneNumber}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
};

export default ResetPassword;
