const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("./configs/config");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1/paintball-activities")
  .then(() => console.log("connected to mongo"))
  .catch(() => console.log("could not connect to mongo"));

const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/auth");
const cardAuth = require("./routes/card.auth");

const app = express();
app.use(cors());
app.use(morgan("dev"), express.json());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cards", cardAuth);
app.use((req, res, next) => {
  const token = req.header('Authorization');
  try {
    console.log("token", token)
    console.log("token type", typeof token)
    if (token !== "null") {
      console.log("there is a token")
      req.userHasToken = true;
      const payload = jwt.verify(token, JWTSecretToken);
      req.user = payload; // You can now access the user information in your routes
    } else {
      req.userHasToken = false;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});
const {
  ActivityCard,
  generateBuisnessNumber,
} = require("./models/cards.model");

const authMW = require("./middlewares/auth");
const { User, validateUser } = require("./models/users");

let tasks = [];

console.log(tasks);

app.get("/api/tasks", async (req, res) => {
  //should add authMw as middleware
  let tasks = await ActivityCard.find({});
  console.log("userHasToken", req.userHasToken);
  if (!req.userHasToken) {
    res.status(200).json(tasks);
    console.log("user has no token");
    return;
  }
  try {
    const user = await User.findOne({ phoneNumber: req.user.id });
    res.status(200).json(tasks);
    console.log("user has token");
    // res.send({ a: user, b: tasks });
  } catch (err){
    console.log("err", err)
    res.status(400).send("invalid token");
  }
});
app.post("/api/tasks", async (req, res) => {
  // const { error } = validateCard(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  const activityCard = await new ActivityCard({
    ...req.body,
    activityImage:
      req.body.activityImage ||
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png",
    activityNumber: await generateBuisnessNumber(),
    user_id: req.body.phoneNumber,
    isPaid: false,
    inCalendar: false,
  }).save();

  const newTask = activityCard;
  tasks.push(newTask);
  console.log(`new tack is ${newTask}`);
  res.status(201).json(tasks);
});

const PORT = 3003;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
