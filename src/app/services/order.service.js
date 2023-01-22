const OrderRepository = require("../repositories/order.repository");
const OrderFactory = require("../factories/order.factory")

class OrderService {
    //GET ALL ORDER
    static async getAllOrder() {
        try {
            const orders = await OrderRepository.getAllOrder();
            const formateOrder = await OrderFactory.formateOrder(orders);

            return formateOrder;
        } catch (error) {
            throw error;
        }
    }

    //GET ORDERS INFORMATION
    static async getOrders() {
        try {
            const orders = await OrderRepository.getOrders();
            const prepareRes = await OrderFactory.getOrders(orders);

            return prepareRes;
        } catch (error) {
            throw error;
        }
    }

    //GET ORDER BY CUSTOMER ID
    static async orderByCustomerId(customer_id) {
        try {
            const customerOrder = await OrderRepository.orderByCustomerId(customer_id);
            const orders = await OrderFactory.formateCustomerOrder(customerOrder);

            return orders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService;