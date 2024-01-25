const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/users");
const authMW = require("../middlewares/auth");

router.get("/me", authMW, async (req, res) => {
  const user = await User.findById(req.user._id, { password: 0 });
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message);
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) {
    console.log("user is already registed");
    res.status(400).send("user is already registed");
    return;
  }
  user = await new User({
    ...req.body,
    _id: req.body.phoneNumber, //  if I delete it- _id default is objectID  need to ask what is better
    password: await bcrypt.hash(req.body.password, 12),
  }).save();
  res.send({ name: user.name, phoneNumber: user._id });
});
module.exports = router;
