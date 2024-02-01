const express = require("express");
const router = express.Router();
const twilio = require("twilio");
require("dotenv").config();

router.post("/", (req, res) => {
  console.log("work");
  function sendSms() {
    const client = new twilio(
      process.env.TWILIO_AUTH_KEY,
      process.env.TWILIO_SECONED_ARGUMENT
    );
    return client.messages
      .create({
        body: "this is massage",
        from: process.env.TWILIO_FROM_NUMBER,
        to: "+972 54 319 1612",
      })
      .then((massage) => console.log(massage))
      .catch((err) => console.log(err));
  }
  sendSms();
});

module.exports = router;
