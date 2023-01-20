const { validateLength, validateEmail } = require("../helpers/userValidation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");

exports.fanSignUp = async (req, res) => {
  try {
    console.log("a call from backend.......");
    const {
      firstname,
      lastname,
      username,
      email,
      timezone,
      password,
      talentSignup,
    } = req.body;

    console.log(req.body);

    if (!validateEmail(email)) {
      return res.send({
        error: "invalid email address.",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.send({
        error:
          "This email address already exists,try with a different email address",
      });
    }

    if (!validateLength(firstname, 3, 30)) {
      return res.json({
        error: "first name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(lastname, 3, 30)) {
      return res.json({
        error: "last name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.json({
        error: "password must be atleast 6 characters.",
      });
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

    // const token = generateToken({ id: user._id.toString() }, "7d");

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
