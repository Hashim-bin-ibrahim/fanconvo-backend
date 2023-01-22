const express = require("express");
const { fanSignUp } = require("../controllers/user");
const { RegisterValidation } = require("../validator");

const router = express.Router();


router.post("/signup", RegisterValidation, fanSignUp);

module.exports = router;
