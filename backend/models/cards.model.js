const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const activityCardSchema = new mongoose.Schema({
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  inCalendar: {
    type: Boolean,
    required: true,
    default: false,
  },
  activityName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  bizUserName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  activityDescription: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 1024,
  },
  activityAddress: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 400,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 10,
  },
  activityImage: {
    type: String,
    required: true,
    minLength: 11,
    maxLength: 1024,
  },
  activityNumber: {
    type: Number,
    required: true,
    min: 100,
    max: 9_999_999_999_999,
    unique: true,
  },
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  activityDate: {
    type: String,
    required: true,
  },
  activityTime: {
    type: String,
    required: true,
  },
});

const ActivityCard = mongoose.model(
  "Card",
  activityCardSchema,
  "activity-cards"
);

const validateCard = (activityCard) => {
  const schema = Joi.object({
    user_id: Joi.string(),
    isPaid: Joi.boolean(),
    inCalendar: Joi.boolean(),
    activityName: Joi.string().min(2).max(255).required(),
    bizUserName: Joi.string().min(2).max(255).required(),
    activityDescription: Joi.string().min(2).max(1024).required(),
    activityAddress: Joi.string().min(2).max(400).required(),
    phoneNumber: Joi.string()
      .allow("")
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    activityImage: Joi.string().allow("").min(11).max(1024),
    activityDate: Joi.date().allow(""),
    activityTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    _id: Joi.string().allow(""),
  });

  return schema.validate(activityCard);
};
const generateBuisnessNumber = async () => {
  while (true) {
    let random = _.random(100, 99999999);
    let card = await ActivityCard.findOne({ activityNumber: random });
    if (!card) {
      return random;
    }
  }
};
module.exports = {
  ActivityCard,
  validateCard,
  generateBuisnessNumber,
};
