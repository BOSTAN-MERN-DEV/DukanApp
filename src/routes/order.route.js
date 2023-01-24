const express = require("express");
const OrderController = require("../controllers/order.controller")
const router = express.Router();

router.get("/", OrderController.getAllOrder);
router.get("/orders", OrderController.getOrders);
router.get("/:customer_id", OrderController.orderByCustomerId)

module.exports = router;