const express = require("express");
const router = express.Router();
const twilio = require("twilio");
// recovery code from twilio = SK7YZLC67S45A2Q6N3S2JQ3L
router.post("/", (req, res) => {
  console.log("work");
  function sendSms() {
    const client = new twilio(
      "AC6cef0ff01d77c9fc6567a3db2fe4bfcb",
      "e5fe05accf725abfe5f20ccaba54a6ef"
    );
    return client.messages
      .create({
        body: "this is massage",
        from: "+16318562207",
        to: "+972 54 319 1612",
      })
      .then((massage) => console.log(massage))
      .catch((err) => console.log(err));
  }
  sendSms();
});

module.exports = router;
