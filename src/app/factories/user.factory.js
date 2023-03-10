const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserFactory {
    constructor(user, jwt_token) {
        this.customer_name = user.customer_name;
        this.customer_email = user.customer_email;
        this.customer_password = user.customer_password;
        this.token = jwt_token;

    }

    static async createUser(userInfo) {
        const { customer_name, customer_email, customer_password } = userInfo
        let token = "";
        if (userInfo) {
            token = jwt.sign({ customer_name: customer_name, customer_email: customer_email, customer_password: customer_password }, process.env.MY_SECRET, { expiresIn: 60 * 60 });
        }
        const user = new UserFactory(userInfo, token);
        return user;
    }

}

module.exports = UserFactory;