class OrderFactory {
    constructor(order) {
        this.customer_id = order.customer_id;
        this.order_status = order.customer_status;
        this.order_date = order.order_date
    }

    //PREPARE ORDER
    static async prepareOrder(data) {
        let orders = data.map(item => {
            return { seller_name: item.seller_name, customer_name: item.customer_name, product_title: item.product_title, order_number: item.order_number }
        })

        return orders;
    }

    static async prepareOrderById(data) {
        let order = data.map(item => {
            return { product_title: item.product_title, customer_name: item.customer_id, order_status: item.order_status, order_date: item.order_date }
        })

        return order;
    }

    //FORMATE ORDER AND CUSTOMER DATA
    static async formateCustomerOrder(data) {
        const customerOrder = data.map(item => {
            return ({ customer_name: item.customer_name, customer_email: item.customer_email, order_status: item.order_status, order_number: item.order_number });
        });

        return customerOrder;
    }

    //FORMATE ORDER, PRODUCT AND SELLER INFORMATION
    static async getOrders(data) {
        const formateOrder = data.map(item => {
            return ({ product_title: item.product_title, seller_name: item.seller_name, order_number: item.order_number, order_status: item.order_status });
        });

        return formateOrder;
    }

}

module.exports = OrderFactory;