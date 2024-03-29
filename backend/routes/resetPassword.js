const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");
const { User, validateUser } = require("../models/users");
const JWT = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");
let userPhoneNumber = "";

let randomNumbers = [];
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

router.post("/", async(req, res) => {
  randomNumbers = [];
  setTimeout(() => {
   randomNumbers = [];
  }, 900000);
  for (let i = 0; i <= 3; i++) {
    let result = getRandomInt(9);
    randomNumbers.push(result);
  }
  console.log("reandomNumbers is:", randomNumbers);
  const { email, phoneNumber } = req.body;
  userPhoneNumber = phoneNumber;
  const user = await User.findOne({ _id: userPhoneNumber });
    if (!user) {
      res.status(404).send({ error: "no such a user" });
      return;
    }
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS_TO_SEND_MAIL,
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
      res.status(500).send({error:"Error sending email"});
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});
router.post("/sent-email", async (req, res) => {
  console.log("reandomNumbers is:", randomNumbers);

  const codeSentToEmail = req.body.verificationCode;
  if (codeSentToEmail !== randomNumbers.join("")) {
    console.log(
      `we sent code ${randomNumbers.join("")} and you wrote ${codeSentToEmail}`
    );
    console.log("not correct code");
    res
      .status(400)
      .send("not correct code or time passed for code, send another request");
    return;
  } else {
  
    randomNumbers = [];
    const user = await User.findOne({ _id: userPhoneNumber });
    if (!user) {
      res.status(404).send({ error: "no such a user" });
      return;
    }
    const userToken = JWT.sign(
      { _id: user._id, biz: user.biz },
      JWTSecretToken
    );
    res.status(200).send({ user, userToken });
  }
});

module.exports = router;
