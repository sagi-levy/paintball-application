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
  const activityCard = await ActivityCard.findById({
    _id: req.params.id,
    user_id: req.user._id,
  });
  res.send(activityCard);
});

router.delete("/delete-activity-cards/:id", async (req, res) => {});

router.post(
  "/create-activity-card",

  async (req, res) => {}
);

router.put(
  "/edit-activity-cards/:id",
  authCheckMiddleWare,
  async (req, res) => {
    const { error } = validateCard(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    let activityCard = await ActivityCard.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user._id,
      },
      req.body
    );
    if (!activityCard)
      return res
        .status(404)
        .send("could not find a card with this specific id");
    activityCard = await ActivityCard.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    res.send(activityCard);
  }
);

module.exports = router;
