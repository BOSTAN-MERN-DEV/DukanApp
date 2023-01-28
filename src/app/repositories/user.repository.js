const db = require("../../config/config")

class UserRepository {
    //INSERT USER
    static async createUser(credencial) {
        try {
            let { customer_name, customer_email, customer_password } = credencial;
            const result = await db.query(
                "INSERT INTO customer (customer_name, customer_email, customer_password) VALUES ($1,$2, $3) RETURNING *",
                [customer_name, customer_email, customer_password]
            );
            return (result.rows[0]);
        } catch (err) {
            throw err;
        }
    }

    //GET USER BY EMAIL 
    static async findUserByEmail(customer_email) {
        try {
            console.log("inside repo", customer_email)
            const result = await db.query("SELECT * FROM customer WHERE customer_email = $1", [customer_email]);
            console.log("frondend>>>>>>>>>>>>>>>>>>>>>>>", result.rows)

            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserRepository;