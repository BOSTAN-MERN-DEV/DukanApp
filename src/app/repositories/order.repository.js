const db = require("../../config/config");

class OrderRepository {
    //CREATE ORDER
    static async createOrder(data) {
        try {
            const { order, product } = data;
            const { product_id } = product;
            const { customer_id, order_status, order_number } = order;


            let createOrder
            let productOrderDetail
            let placedOrderDetails

            let order_id;
            createOrder = await db.query(
                "INSERT INTO orders (customer_id, order_status, order_number) VALUES ($1,$2, $3) RETURNING *",
                [customer_id, order_status, order_number]
            );


            if (createOrder && createOrder.rows.length > 0) {
                order_id = createOrder.rows[0].order_id;
                productOrderDetail = await db.query(
                    "INSERT INTO order_detail (order_id, product_id) VALUES ($1,$2) RETURNING *",
                    [order_id, product_id]
                );
            }


            placedOrderDetails = await db.query(
                `SELECT * FROM customer cust
                join orders ord on cust.customer_id=ord.customer_id
                join order_detail od on ord.order_id = od.order_id
                join products prod on prod.product_id = od.product_id
                join seller s on s.seller_id = prod.seller_id
                where ord.order_id = $1
                `,
                [order_id]
            );
            return (placedOrderDetails.rows);
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