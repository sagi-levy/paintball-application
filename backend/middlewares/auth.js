const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");
const { ActivityCard } = require("../models/cards.model");
const { User } = require("../models/users");

module.exports = async (req, res, next) => {
  let tasks = await ActivityCard.find({});
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(200).json(tasks);
    return;
  }
  try {
    console.log(token);

    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    req.jwtPayload = payload;

    next();
  } catch {
    res.status(401).send("invalid token");
  }
};
