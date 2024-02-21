const express = require("express");
const mongoose = require("mongoose");
const RateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_ATLAS_CONNECECTION_URL)
  .then(() => console.log("connected to mongo"))
  .catch(() => console.log("could not connect to mongo"));

const app = express();
const { ActivityCard, generateBuisnessNumber } = require("./models/cards.model");
const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("./configs/config");

let tasks = [];

// Set up rate limiting middleware based on IP addresses
const limiter = new RateLimit({
  store: new MongoStore({
    uri: process.env.MONGO_ATLAS_CONNECECTION_URL,
    expireTimeMs: 24 * 60 * 60 * 1000, // 24 hours
    errorHandler: console.error,
  }),
  max: 10, // Maximum number of requests per windowMs
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  message: "Too many requests from this IP, please try again later.",
  keyGenerator: function(req) {
    return req.ip; // Track requests based on IP address
  },
});

// Apply the rate limiter to all requests
app.use(limiter);

app.use(cors());
app.use(morgan("dev"), express.json());

// Your routes and middleware come here
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/auth");
const cardAuth = require("./routes/card.auth");
const emailsRouter = require("./routes/emails");
const resetPasswordRouter = require("./routes/resetPassword");
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cards", cardAuth);
app.use("/send-email", emailsRouter);
app.use("/reset-password", resetPasswordRouter);

app.get("/api/tasks", async (req, res) => {
  tasks = await ActivityCard.find({});
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(200).json(tasks);
    return;
  }
  try {
    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    console.log("payload", payload);
    const user = await User.findOne({ _id: payload._id }, { password: 0 });
    console.log(user);
    res.send({ user: user, tasks: tasks });
  } catch {
    res.status(400).send("invalid token");
  }
});

// Apply rate limiting middleware to the specific POST route for creating tasks
app.post("/api/tasks", limiter, async (req, res) => {
  let card = await ActivityCard.findOne({
    activityTime: req.body.activityTime,
    activityDate: req.body.activityDate,
  });
  console.log(card);
  if (card) {
    console.log("there is already activity is this day and time", card);
    return;
  } else {
    console.log("ok");
  }

  const activityCard = await new ActivityCard({
    ...req.body,
    activityImage: req.body.activityImage || "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png",
    activityNumber: await generateBuisnessNumber(),
    user_id: req.body.phoneNumber,
    isPaid: false,
    inCalendar: false,
  }).save();

  const newTask = activityCard;
  tasks.push(newTask);
  console.log(`new tack is ${newTask}`);
  res.status(201).json({ tasks: tasks, newTask: newTask });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
