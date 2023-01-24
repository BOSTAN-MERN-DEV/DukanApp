const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = require("../../constants/error")
require("dotenv").config();
class LoginFactory {
    constructor(customer_email, token, userFound) {
        try {
            this.customer_email = customer_email;
            this.customer_name = userFound.customer_name;
            this.token = token;
        } catch (error) {
            throw error;
        }
    }

    //FORMATE USER DATA
    static async prepareLogin(credentials) {
        const { customer_email, customer_password, foundUser } = credentials;
        let userObject = { customer_id: '', customer_name: '', token: '' };
        let token = '';

        if (foundUser && (await bcrypt.compare(customer_password, foundUser.customer_password))) {
            token = jwt.sign({ customer_id: foundUser.customer_id, customer_email, customer_name: foundUser.customer_name }, process.env.MY_SECRET, { expiresIn: '20 days' });
            userObject = new LoginFactory(customer_email, token, foundUser);
        }
        return userObject;
    }
}

module.exports = LoginFactory;
