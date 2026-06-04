const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const { auth } = require("../middlewares/auth");

router.get("/", auth, productController.getAllProducts);
router.post("/", auth, productController.createProduct);
router.put("/:id", auth, productController.updateProduct);
router.patch("/:id/publish", auth, productController.togglePublishStatus);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
