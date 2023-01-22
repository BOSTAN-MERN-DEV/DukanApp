const db = require("../../config/config");

class OrderRepository {
    //GET ALL ORDERS
    static async getAllOrder() {
        try {
            const result = await db.query("SELECT * FROM orders");
            return result.rows;
        } catch (err) {

        }
    }

    //GET ORDER, PRODUCT AND SELLER INFORMATION
    static async getOrders() {
        try {
            console.log("inside getOrders")
            const orders = await db.query(`SELECT * FROM products p join order_detail od ON p.product_id = od.product_id join seller s on p.seller_id = s.seller_id`);

            return (orders.rows)
        } catch (err) {

        }
    }

    //GET SPECIFIC SELLER ORDERS
    static async orderByCustomerId(id) {
        try {
            const orders = await db.query(`SELECT * FROM customer join orders ON customer.customer_id = orders.customer_id WHERE customer.customer_id = $1`, [id]);

            return (orders.rows)
        } catch (err) {

        }
    }
}

module.exports = OrderRepository;