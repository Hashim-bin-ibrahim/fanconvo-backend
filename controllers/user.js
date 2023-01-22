const { validateLength, validateEmail } = require("../helpers/userValidation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { generateToken } = require("../helpers/token");

exports.fanSignUp = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      timezone,
      password,
      talentSignup,
    } = req.body;

    const checks = await User.findOne({ email });
    if (checks) {
      return res.send({
        error: "This  mail address already exist",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let isFan;
    let isTalent;
    if (talentSignup) {
      isFan = false;
      isTalent = true;
    }

    const user = await new User({
      firstname,
      lastname,
      username,
      email,
      timezone,
      password: cryptedPassword,
      isFan: isFan,
      isTalent: isTalent,
    }).save();

    console.log("data saved");
    res.send({
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      message: "Register Successfully Completed !",
    });
  } catch (error) {
    console.log("error message", error);
    res.send({ message: error.message });
  }
};
