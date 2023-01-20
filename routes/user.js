const express = require("express");
const { fanSignUp } = require("../controllers/user");
const router = express.Router();

router.post("/signup",fanSignUp)


module.exports = router
