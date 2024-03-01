require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATA_BASE_MONGO_URL)
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

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
