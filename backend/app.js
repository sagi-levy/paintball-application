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

let tasks = [];

app.get("/api/tasks", (req, res) => {
  res.json([
    {
      isPaid: false,
      inCalendar: false,
      activityDate: "2024-01-19",
      time: "12:0",
      activityName: "Meeting with client",
    },
    {
      isPaid: false,
      inCalendar: false,
      activityDate: "2024-01-20",
      time: "10:00",
      activityName: "Team brainstorming",
    },
    {
      isPaid: true,
      inCalendar: true,
      activityDate: "2024-01-21",
      time: "2",
      activityName: "Project presentation",
    },
    {
      isPaid: false,
      inCalendar: false,
      activityDate: "2024-01-22",
      time: "09:00",
      activityName: "Code review",
    },
  ]);
});

app.post("/api/tasks", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(tasks);
});

const PORT = 3003;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
