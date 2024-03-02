const mongoose = require("mongoose");
const joi = require("joi");
const JWT = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");
const userShcema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 1000, required: true },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 10,
  },
  password: { type: String, minLength: 5, maxLength: 1000, required: true },
  createdAt: { type: Date, default: Date.now },
  biz: { type: Boolean, required: true },
  _id: { type: String },
});
userShcema.methods.generateAuthToken = function () {
  return JWT.sign({ _id: this.phoneNumber, biz: this.biz }, JWTSecretToken);
};
const User = mongoose.model("User", userShcema, "users");

const validateUser = (user) => {
  const Schema = joi.object({
    name: joi.string().required().max(1000).min(2),
    phoneNumber: joi
      .string()
      .allow("")
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    password: joi.string().required().min(5).max(1000),
    biz: joi.boolean().required(),
    _id: joi.string(),
  });
  return Schema.validate(user);
};

module.exports = {
  User,
  validateUser,
};
