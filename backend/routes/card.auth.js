const express = require("express");
const router = express.Router();
const {
  ActivityCard,
  generateBuisnessNumber,
  validateCard,
} = require("../models/cards.model");
const authCheckMiddleWare = require("../middlewares/auth");
const { User } = require("../models/users");
const { JWTSecretToken } = require("../configs/config");
const jwt = require("jsonwebtoken");


let tasks = [];




router.get("/my-activity-cards", authCheckMiddleWare, async (req, res) => {
  if (!req.user.biz) {
    res.status(401).send("Access good");
    return;
  }
  const cards = await ActivityCard.find({ user_id: req.user._id });

  res.send(cards);
});

router.get("/my-activity-cards/:id", authCheckMiddleWare, async (req, res) => {
  const user = req.jwtPayload;
  
  if (req.jwtPayload.biz) {
    const activityCard = await ActivityCard.findOne({
      phoneNumber: req.params.id,

      _id: req.query.cardId,
    });
    res.send(activityCard);
  } else {
    const activityCard = await ActivityCard.findOne({
      phoneNumber: req.params.id,
      user_id: req.jwtPayload._id,
      _id: req.query.cardId,
    });
    if (!activityCard) {
      res.status(404).send("their is not such a card with this specific id");
      return;
    }
    res.send(activityCard);
  }
});

router.delete(
  "/delete-activity-cards/:id",
  authCheckMiddleWare,
  async (req, res) => {
    try {
      const activityCard = await ActivityCard.findOneAndRemove({
        phoneNumber: req.params.id,
        _id: req.query.cardId,
        ...(req.user && req.user.biz ? {} : { user_id: req.jwtPayload._id }), 

      });

      if (!activityCard) {
        res.status(404).send("their is not such a card with this specific id");
        return;
      }
      res.send(activityCard);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.get("/get-activity-cards", async (req, res) => {
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


router.post("/create-activity-card", async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let card = await ActivityCard.findOne({
    activityTime: req.body.activityTime,
    activityDate: req.body.activityDate,
  });
  if (card) {
    res.send("there is already activity is this day and time", card);
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

  const newTask = activityCard;
  tasks.push(newTask);
  res.status(201).json({ tasks: tasks, newTask: newTask });
});

router.put(
  "/edit-activity-cards/:id",
  authCheckMiddleWare,
  async (req, res) => {
    console.log("query params is: ", req.query.cardId);
    console.log("body ", req.body);
    const user = req.jwtPayload;
    console.log("user ", user);

    const { error } = validateCard(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
   
    let activityCard = await ActivityCard.findOneAndUpdate(
      {
        phoneNumber: req.params.id,
        _id: req.query.cardId,
        ...(req.user && req.user.biz ? {} : { user_id: req.jwtPayload._id }), 
      },
      req.body
    );
    if (!activityCard)
      return res
        .status(404)
        .send("could not find a card with this specific id");
    activityCard = await ActivityCard.findOne({
      phoneNumber: req.params.id,
      _id: req.query.cardId,
      
    });
    
    res.send(activityCard);
  }
);
router.put("/payment/:id", async (req, res) => {

  console.log(req.body);
  let activityCard = await ActivityCard.findOneAndUpdate(
    {
      phoneNumber: req.params.id,
      _id: req.body._id,
    },
    { isPaid: true, inCalendar: true }
  );
  if (!activityCard)
    return res.status(404).send("could not find a card with this specific id");
  activityCard = await ActivityCard.findOne({
    phoneNumber: req.params.id,
    _id: req.body._id,
  });
  res.send(activityCard);
});

module.exports = router;
