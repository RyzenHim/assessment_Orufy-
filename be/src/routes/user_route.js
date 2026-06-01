const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_controllers");

router.post("/login", controller.login);
