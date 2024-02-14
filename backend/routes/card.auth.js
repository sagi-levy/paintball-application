const express = require("express");
const router = express.Router();
const {
  ActivityCard,
  generateBuisnessNumber,
  validateCard,
} = require("../models/cards.model");
const authCheckMiddleWare = require("../middlewares/auth");
const { User } = require("../models/users");

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
  // console.log("params", req.params.id);
  // console.log("query params is: ", req.query.cardId);
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
        ...(req.user && req.user.biz ? {} : { user_id: req.jwtPayload._id }), //user_id: req.jwtPayload._id,

        //user_id: req.jwtPayload._id,
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

router.post(
  "/create-activity-card",

  async (req, res) => {}
);

router.put(
  "/edit-activity-cards/:id",
  authCheckMiddleWare,
  async (req, res) => {
    // console.log("activity card is is", req.body._id);
    console.log("query params is: ", req.query.cardId);
    console.log("body ", req.body);
    const user = req.jwtPayload;
    console.log("user ", user);

    const { error } = validateCard(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    // console.log(req.jwtPayload._id);
    // console.log(req.jwtPayload);

    let activityCard = await ActivityCard.findOneAndUpdate(
      {
        phoneNumber: req.params.id,
        _id: req.query.cardId,
        // _id: req.body._id,
        ...(req.user && req.user.biz ? {} : { user_id: req.jwtPayload._id }), //user_id: req.jwtPayload._id,
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
      //_id: req.body._id,
      //user_id: req.user._id,
    });
    // if (user.biz === false && user._id !== req.body.phoneNumber) {
    //   let userChangingId = await User.findOneAndUpdate(
    //     {
    //       phoneNumber: req.body.phoneNumber,
    //     },
    //     { phoneNumber: req.body.phoneNumber },
    //     { new: true }
    //   );
    //   console.log(userChangingId);
    //   if (userChangingId) {
    //     console.log(
    //       " changed this User phone number cause the card changed phone number",
    //       userChangingId
    //     );

    //     return;
    //   } else {
    //     console.log("ok");
    //     res.send({ activityCard, userChangingId });
    //   }
    // } else {
    //   console.log("cadacsacs");
    //   res.send(activityCard);
    //   return;
    // }

    res.send(activityCard);
  }
);
router.put("/payment/:id", async (req, res) => {
  // const { error } = validateCard(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }
  // console.log(req.jwtPayload._id);
  // console.log(req.jwtPayload);
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
