const db = require("../../config/config")

class UserRepository {
    static async createUser(credencial) {
        try {
            let { customer_name, customer_email, customer_password } = credencial;

            const result = await db.query(
                "INSERT INTO customer (customer_name, customer_email, customer_password) VALUES ($1,$2, $3) RETURNING *",
                [customer_name, customer_email, customer_password]
            );
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserRepository;