const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_controller");
const { auth } = require("../middlewares/auth");

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.post("/verify-signup-otp", controller.verifySignupOtp);
router.post("/verify-login-otp", controller.verifyLoginOtp);
router.get("/profile", auth, controller.getProfile);

module.exports = router;
