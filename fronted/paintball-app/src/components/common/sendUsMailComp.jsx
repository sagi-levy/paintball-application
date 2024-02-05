import React, { useState } from "react";
import axios from "axios";
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
      })

      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="">
          <form
            style={{ padding: 0, margin: "auto", width: "100%" }}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name">Name:</label>
              <input
                className="form-control"
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
            <p>
              Send us an email and the manager will insert your activity in the
              calendar and update with a return email{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendUsMailComp;
