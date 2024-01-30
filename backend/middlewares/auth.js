const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");
const { ActivityCard } = require("../models/cards.model");
const { User } = require("../models/users");

//// should fix and then bring as middleware
module.exports = async (req, res, next) => {
  let tasks = await ActivityCard.find({});
  const token = req.header("x-auth-token");
  if (!token) {
    
    res.status(200).json(tasks);
    return;
  }
  try {
   

    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    req.jwtPayload = payload;

    console.log("payload", payload);

    console.log("user id is:", req.user._id);

    //const user = await User.findOne({ _id: req.user._id }, { password: 0 });
    //console.log(user);
    //res.send({ user: user, tasks: tasks });
    next();
  } catch {
    res.status(400).send("invalid token");
  }
};
