require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_ADDRESS_FROM_SEND_MAIL,
    to: process.env.GMAIL_ADDRESS_TO_SEND_MAIL,
    subject: "New Email from Your React Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS_FROM_SEND_MAIL,
      pass: process.env.PASSWORD_FOR_GMAIL_NODEMAILER,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});
module.exports = router;
