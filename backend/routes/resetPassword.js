const express = require("express");
const router = express.Router();
//const twilio = require("twilio");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { User, validateUser } = require("../models/users");
let userPhoneNumber = "";

let randomNumbers = [];
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

router.post("/", (req, res) => {
  console.log("work");

  for (let i = 0; i <= 3; i++) {
    let result = getRandomInt(9);
    randomNumbers.push(result);
  }
  console.log(randomNumbers);
  const { email, phoneNumber } = req.body;
  userPhoneNumber = phoneNumber;
  const mailOptions = {
    from: "sagilevy1612@gmail.com",
    to: email,
    subject: "this is your one time code for reset the password",
    text: `${randomNumbers[0]}${randomNumbers[1]}${randomNumbers[2]}${randomNumbers[3]}`,
  };
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: email,
      pass: "gnofeoeknyhgsmqp",
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
router.post("/sent-email", async (req, res) => {
  const codeSentToEmail = req.body.verificationCode;
  if (codeSentToEmail !== randomNumbers.join("")) {

    console.log(`we sent code ${randomNumbers.join("")} and you wrote ${codeSentToEmail}`);
    console.log("not correct code");
    return;
  } else {
    console.log(userPhoneNumber)
    const user = await User.findOne({ _id: userPhoneNumber });
    console.log(user);
    res.send(user)
  }
});

module.exports = router;

// function sendSms() {
//   const client = new twilio(
//     process.env.TWILIO_AUTH_KEY,
//     process.env.TWILIO_SECONED_ARGUMENT
//   );
//   return client.messages
//     .create({
//       body: "this is massage",
//       from: process.env.TWILIO_FROM_NUMBER,
//       to: "+972 54 319 1612",
//     })
//     .then((massage) => console.log(massage))
//     .catch((err) => console.log(err));
// }
// sendSms();
