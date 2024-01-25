const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");
const { ActivityCard } = require("../models/cards.model");
//// should fix and then bring as middleware
module.exports = async (req, res, next) => {
  let tasks = await ActivityCard.find({});
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(200).json(tasks);
    console.log("you are not a user, you can see tasks but not edit");

    return;
  }
  next();
};
