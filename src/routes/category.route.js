const express = require("express");
const CategoryController = require("../controllers/category.controller");
const router = express.Router();



router.get("/", CategoryController.getCategory);
router.get("/:id", CategoryController.getCategoryByID)
router.post("/", CategoryController.createCategory);
router.put("/:category_id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
module.exports = router;