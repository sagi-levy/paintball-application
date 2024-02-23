const express = require("express");
const router = express.Router();
const joi = require("joi");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) {
    res.status(400).send("this number had not registed yet");
    return;
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(400).send("invalid password");
    return;
  }
  
  const token = user.generateAuthToken();
  res.send({ token });
});

function validate(user) {
  const Schema = joi.object({
    phoneNumber: joi
      .string()
      .allow("")
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    password: joi.string().required().min(5).max(1000),
  });

  return Schema.validate(user);
}
module.exports = router;
