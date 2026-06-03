const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id/publish", productController.togglePublishStatus);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
