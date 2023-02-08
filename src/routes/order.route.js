const express = require("express");
const OrderController = require("../controllers/order.controller")
const router = express.Router();

//GET ALL ORDER DETAILS
router.get("/orders", OrderController.getOrders);
//CREATE ORDER
router.post("/", OrderController.createOrder);
//GET ALL ORDERS
router.get("/", OrderController.getAllOrder);
//GET ORDER BY ORDER ID
router.get("/:order_id", OrderController.orderById)

router.get("/customer/:customer_id", OrderController.orderByCustomerId)

module.exports = router;