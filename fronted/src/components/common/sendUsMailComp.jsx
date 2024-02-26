import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SendUsMailComp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    axios
      .post("/send-email", formData)
      .then((response) => {
        console.log("Email sent successfully!");
        toast.success(`password changed`, {
          autoClose: 2000,
          style: {
            background: "black",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          },
        });
      })

      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    
        <div className="pb-sm-4">
          <form 
            style={{ margin: "auto", width: "100%", background: "rgba(111,111,111,0.3)", padding: "20px", borderRadius: "8px" }}
            onSubmit={handleSubmit}
          >
            <div >
              <label htmlFor="name">Name:</label>
              <input
                className="form-control "
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-success" type="submit">
              Send Email
            </button>
            <p className="text-d-sm-none">
              Send us an email and the manager will insert your activity in the
              calendar and update with a return email{" "}
            </p>
          </form>
        </div>
   
  );
};

export default SendUsMailComp;
