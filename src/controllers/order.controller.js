const OrderService = require("../app/services/order.service")
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constant");
const { CONTROLLER_ERROR } = require("../constants/error")

class OrderController {
    //CRREATE ORDER
    static async createOrder(req, res) {
        try {
            const { order, product } = req.body;
            const orderCreated = await OrderService.createOrder({ order, product });
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: orderCreated })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            throw err;
        }
    }

    // //GET ALL ORDERS
    // static async getAllOrder(req, res) {
    //     try {
    //         const orders = await OrderService.getAllOrder();
    //         res.status(API_STATUS_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.SUCCESS, body: orders })
    //     } catch (err) {
    //         if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
    //             return res.status({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
    //         }

    //         return res.json(CONTROLLER_ERROR);
    //     }
    // }

    //GET ORDER BY ID
    static async orderById(req, res) {
        try {
            console.log("border by id")
            const { order_id } = req.params;

            const order = await OrderService.orderById(order_id);
            res.status(API_STATUS_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.SUCCESS, body: order })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.status({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            return res.json(CONTROLLER_ERROR);
        }
    }

    //GET ORDERS INFORMATION
    static async getOrders(req, res) {
        try {
            const orders = await OrderService.getOrders();
            res.status(API_STATUS_CODES.SUCCESS).json({ message: RESPONSE_MESSAGES.SUCCESS, body: orders })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.status({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            return res.json(CONTROLLER_ERROR);
        }
    }

    //GET ALL ORDER BY CUSTOMER ID
    static async orderByCustomerId(req, res) {
        try {
            const { customer_id } = req.params;

            const customerOrder = await OrderService.orderByCustomerId(customer_id);
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: customerOrder })
        } catch (error) {
            if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }
            return res.json(CONTROLLER_ERROR);
        }
    }
}

module.exports = OrderController;