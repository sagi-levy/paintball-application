import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SentEmail = () => {
  const { logIn, user, refreshUser } = useAuth();
  const TOKEN_KEY = process.env.REACT_APP_TOKEN;
  const [errorApiRequest, setErrorApiRequest] = useState("");
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [verificationCode, setVerificationCode] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
  const email = location.state.email;
  const phoneNumber = location.state.phoneNumber;
  const startTimer = () => {
    // Set a timer to decrement the timer value every second
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          // Clear the interval when the timer reaches 0
          clearInterval(intervalId);
          setIsTimerActive(false);
          // Set the timer as inactive
          return 0; // Set timer to 0 and prevent it from restarting
        } else {
          return prevTimer - 1;
        }
      });
    }, 2000);

    return intervalId; // Return the intervalId for cleanup
  };

  useEffect(() => {
    if (isTimerActive) {
      const intervalId = startTimer();

      // Cleanup: Reset the timer and clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isTimerActive]);

  const handleVerificationCodeChange = (e) => {
    const inputCode = e.target.value;
    setVerificationCode(inputCode);
  };

  const handleVerificationCodeSubmit = async () => {
    try {
      // Check if the entered code is valid
      const isValidCode = verificationCode.length === 4;

      if (isValidCode && isTimerActive) {
        const response = await fetch(
          `${process.env.RENDER_API_URL}/reset-password/sent-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ verificationCode }),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text(); // Extract error message from response
          throw new Error(errorMessage); // Throw error with error message
        }

        const { user, userToken } = await response.json();
        localStorage.setItem(TOKEN_KEY, userToken);
        localStorage.getItem(TOKEN_KEY);
        toast.success(`welcome`, {
          autoClose: 2000,
          style: {
            background: "black",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          },
        });
        refreshUser();
        // Navigate to the "Change Password" component
        navigate(`/users/change-password/via-email-code/${user._id}`, {
          state: { user },
        });
        setIsTimerActive(true); // Set the timer as active
      } else {
        setErrorApiRequest("invalid code");
        // Handle invalid code (show an error message or perform other actions)
        console.error("Invalid verification code");
      }
    } catch (error) {
      console.log(error);
      setErrorApiRequest(error.message); // Update errorApiRequest state with error message
    }
  };

  const sendAnotherCode = () => {
    setErrorApiRequest("");
    const fetchForCode = async () => {
      try {
        // Add your backend API endpoint for password reset
        const response = await fetch(`${process.env.RENDER_API_URL}/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phoneNumber }),
        });
        setTimer(100);
        setIsTimerActive(true);

        const data = await response.json();

        if (response.ok) {
          console.log("message");
          setErrorApiRequest("");
        } else {
        }
      } catch (error) {
        setErrorApiRequest(error.message);
        console.error("Error resetting password:", error.message);
      }
    };

    fetchForCode(); // Immediately send a new code
  };

  return (
    <div className="p-5">
      <h2>Enter Verification Code</h2>
      <p>Please enter the 4-digit verification code sent to your email.</p>

      <input
        className="form-control w-25 d-inline m-2"
        type="text"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
        maxLength={4}
      />

      <button
        className="btn btn-secondary"
        onClick={handleVerificationCodeSubmit}
      >
        Submit Verification Code
      </button>

      <div>
        <p className="text-danger">{errorApiRequest}</p>
      </div>

      <div>
        <p>
          Time remaining: {Math.floor(timer / 60)}:{timer % 60}
        </p>
        {timer === 0 ? (
          <button className="btn btn-primary" onClick={sendAnotherCode}>
            Send New Code
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SentEmail;
