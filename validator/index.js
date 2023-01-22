const { check } = require("express-validator");

exports.RegisterValidation = [
  check("firstname")
    .isLength({ min: 4 })
    .withMessage("first name must between 4 and 30 characters."),
  check("lastname")
    .isLength({ min: 4 })
    .withMessage("last name must between 4 and 30 characters."),
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters"),
];
