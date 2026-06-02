const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const productController = require("../controllers/product_controller");

router.get("/all", auth, productController.all);
