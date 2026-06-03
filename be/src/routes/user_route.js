const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_controller");

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/verify-signup-otp", controller.verifySignupOtp);
router.post("/verify-login-otp", controller.verifyLoginOtp);
router.get("/profile", controller.getProfile);

module.exports = router;
