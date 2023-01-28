const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller')

router.post("/", ProductController.addProducts);
router.get("/", ProductController.getAllProducts);
router.get("/:product_id", ProductController.getProductById);
router.delete("/deleteAll/:id", ProductController.deleteAllProducts);
router.delete("/:id", ProductController.deleteProductById);
router.put("/:product_id", ProductController.editProduct);

module.exports = router;