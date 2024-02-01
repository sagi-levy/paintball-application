const express = require("express");
const router = express.Router();
const twilio = require("twilio");
// 
router.post("/", (req, res) => {
  console.log("work");
  function sendSms() {
    const client = new twilio(
      ,
      
    );
    return client.messages
      .create({
        body: "this is massage",
        from: ,
        to: "+972 54 319 1612",
      })
      .then((massage) => console.log(massage))
      .catch((err) => console.log(err));
  }
  sendSms();
});

module.exports = router;
