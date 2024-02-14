const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/users");
const { ActivityCard } = require("../models/cards.model");
const authMW = require("../middlewares/auth");
const { JWTSecretToken } = require("../configs/config");
const jwt = require("jsonwebtoken");

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
  try {
    let activity = await ActivityCard.updateMany(
      {
        phoneNumber: req.body.phoneNumber,
        user_id: "the guy who created this activity hasn't registed yet",
      },
      {
        $set: { user_id: req.body.phoneNumber },
      }
    );
    console.log(
      "this new user has signed up now but he allready had activities, so we updated those activities user_id to this user phoneNumber",
      activity
    ); 
  } catch (error) {
    console.error(error); 
  }

  res.send({ name: user.name, phoneNumber: user._id });
});
router.put("/change-password/:id", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(200).json(tasks);
    return;
  }
  try {
    console.log(jwt.verify(token, JWTSecretToken));

    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    req.jwtPayload = payload;

    console.log("payload", payload);

    console.log("user id is:", req.user._id);
  } catch {
    res.status(400).send("invalid token");
    return;
  }
  try {
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res
        .status(400)
        .send("new password must be equal to confirmPassword");
    }
    // Find the user by ID
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("No user found with the provided ID");
    }

    // Compare the old password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send("Incorrect old password");
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    // Update the user's password in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { password: hashedNewPassword },
      { new: true }
    );

    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Internal server error");
  }
});
router.put("/change-password/via-email-code/:id", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(200).json(tasks);
    return;
  }
  try {
    console.log(jwt.verify(token, JWTSecretToken));

    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    req.jwtPayload = payload;

    console.log("payload", payload);

    console.log("user id is:", req.user._id);
    if (req.user._id !== payload._id) {
      return res.status(404).send("you cant change password to other user");
    }
  } catch {
    res.status(400).send({ message: "you cant change password to other user" });
    return;
  }
  try {
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res
        .status(400)
        .send("new password must be equal to confirmPassword");
    }
    // Find the user by ID
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("No user found with the provided ID");
    }

    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { password: hashedNewPassword },
      { new: true }
    );

    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
