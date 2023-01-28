const db = require("../../config/config");

class OrderRepository {
    //CREATE ORDER
    static async createOrder(data) {
        try {
            let result = [];
            const { order, product } = data;
            const { customer_id, order_status, order_number } = order;
            const { product_id } = product;

            result = await db.query(
                "INSERT INTO orders (customer_id, order_status, order_number) VALUES ($1,$2, $3) RETURNING *",
                [customer_id, order_status, order_number]
            );

            if (result && result.rows.length > 0) {
                let order_id = result.rows[0].order_id;

                result = await db.query(
                    "INSERT INTO order_detail (order_id, product_id) VALUES ($1,$2) RETURNING *",
                    [order_id, product_id]
                );

            }

            result = await db.query(
                `SELECT * FROM customer c
                join orders o on c.customer_id=o.customer_id
                join order_detail od on o.order_id = od.order_id
                join products p on p.product_id = od.product_id
                join seller s on s.seller_id = p.seller_id
                where c.customer_id = $1
                `,
                [customer_id]
            );

            return (result.rows);
        } catch (err) {
            throw err;
        }
    }

    //GET ALL ORDERS
    static async getAllOrder() {
        try {
            const result = await db.query("SELECT * FROM orders");
            return result.rows;
        } catch (err) {

        }
    }

    //GET ORDER BY ID
    static async orderById(id) {
        try {
            const result = await db.query(`SELECT * FROM orders JOIN order_detail ON orders.order_id=order_detail.order_id
            JOIN products ON order_detail.product_id=products.product_id
            JOIN customer ON orders.customer_id=customer.customer_id where orders.order_id=$1`, [id]);
            return result.rows;
        } catch (err) {

        }
    }

    //GET ORDER, PRODUCT AND SELLER INFORMATION
    static async getOrders() {
        try {
            const orders = await db.query(`SELECT * FROM products p
             join order_detail od ON p.product_id = od.product_id 
             join orders o on od.order_id = o.order_id
             join seller s on p.seller_id = s.seller_id`);

            return (orders.rows)
        } catch (err) {

        }
    }

    //GET SPECIFIC Customer ORDERS
    static async orderByCustomerId(id) {
        try {
            const orders = await db.query(`SELECT * FROM customer join orders ON customer.customer_id = orders.customer_id WHERE customer.customer_id = $1`, [id]);

            return (orders.rows)
        } catch (err) {

        }
    }
}

module.exports = OrderRepository;