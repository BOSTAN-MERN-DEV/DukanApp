const express = require("express");
const OrderController = require("../controllers/order.controller")
const router = express.Router();

//CREATE ORDER
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
//GET ALL ORDERS
// router.get("/", OrderController.getAllOrder);
//GET SPECIFIC ORDER
router.get("/:order_id", OrderController.orderById)
router.get("/:customer_id", OrderController.orderByCustomerId)

module.exports = router;