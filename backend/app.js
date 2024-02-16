require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://sagilevy1612:MongoDB-paintball@cluster0.o6lbx2w.mongodb.net/paintball-application"
  )
  .then(() => console.log("connected to mongo"))
  .catch(() => console.log("could not connect to mongo"));

const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/auth");
const cardAuth = require("./routes/card.auth");
const emailsRouter = require("./routes/emails");
const resetPasswordRouter = require("./routes/resetPassword");

const app = express();
app.use(cors());
app.use(morgan("dev"), express.json());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cards", cardAuth);
app.use("/send-email", emailsRouter);
app.use("/reset-password", resetPasswordRouter);
const {
  ActivityCard,
  generateBuisnessNumber,
} = require("./models/cards.model");

const authMW = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("./configs/config");
const { User, validateUser } = require("./models/users");

let tasks = [];

console.log(tasks);

app.get("/api/tasks", async (req, res) => {
  tasks = await ActivityCard.find({});
  const token = req.header("x-auth-token");
  //console.log(token);
  if (!token) {
    res.status(200).json(tasks);
    return;
  }
  try {
    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    //console.log("payload", payload);
    //console.log("user id is:", req.user._id);
    const user = await User.findOne({ _id: payload._id }, { password: 0 });
    // console.log(user);
    res.send({ user: user, tasks: tasks });
  } catch {
    res.status(400).send("invalid token");
  }
});

app.post("/api/tasks", async (req, res) => {
  // const { error } = validateCard(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }tasks = await ActivityCard.find({});

  const token = req.header("x-auth-token");

  if (!token) {
    let card = await ActivityCard.findOne({
      activityTime: req.body.activityTime,
      activityDate: req.body.activityDate,
    });
    console.log(card);
    if (card) {
      console.log("there is already activity is this day and time", card);
      res.status(400).send("there is already activity is this day and time");
      return;
    } else {
      console.log("ok");
    }

    const activityCard = await new ActivityCard({
      ...req.body,
      activityImage:
        req.body.activityImage ||
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png",
      activityNumber: await generateBuisnessNumber(),
      user_id: "the guy who created this activity hasn't registed yet",
      isPaid: false,
      inCalendar: false,
    }).save();

    const newTask = activityCard;
    tasks.push(newTask);
    console.log(`new tack is ${newTask}`);
    res.status(201).json({ tasks: tasks, newTask: newTask });

    return;
  }
  try {
    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    if (payload._id !== req.body.phoneNumber) {
      res.status(400).send("phone number has to be same as user id");
      return;
    }
    let card = await ActivityCard.findOne({
      activityTime: req.body.activityTime,
      activityDate: req.body.activityDate,
    });
    console.log(card);
    if (card) {
      console.log("there is already activity is this day and time", card);
      res.status(400).send("there is already activity is this day and time");
      return;
    } else {
      console.log("ok");
    }

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
    //console.log("payload", payload);
    //console.log("user id is:", req.user._id);
    const newTask = activityCard;
    tasks.push(newTask);
    console.log(`new tack is ${newTask}`);
    res.status(200).json({ tasks: tasks, newTask: newTask });
  } catch {
    res.status(400).send("invalid token");
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
