const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserFactory {
    constructor(user, jwt_token) {
        this.customer_id = user.customer_id
        this.customer_name = user.customer_name;
        this.customer_email = user.customer_email;
        this.customer_password = user.customer_password;
        this.token = jwt_token;

    }

    static async createUser(userInfo) {
        const { customer_name, customer_email, customer_password, customer_id } = userInfo
        let token = "";
        if (userInfo) {
            token = jwt.sign({ customer_id: customer_id, customer_name: customer_name, customer_email: customer_email, customer_password: customer_password }, process.env.MY_SECRET, { expiresIn: 60 * 60 });
        }
        const user = new UserFactory(userInfo, token);
        return user;
    }

    static async login(credentials) {
        const { customer_email, customer_password, foundUser } = credentials;
        // let userObject = { customer_id: '', customer_name: '', token: '' };
        let token = '';

        if (foundUser && (await bcrypt.compare(customer_password, foundUser.customer_password))) {
            token = jwt.sign({ customer_id: foundUser.customer_id, customer_email, customer_name: foundUser.customer_name }, process.env.MY_SECRET, { expiresIn: '20 days' });
            // userObject = new LoginFactory(customer_email, token, foundUser);

        }
        return { customer_email, customer_name: foundUser.customer_name, token };
    }

}

module.exports = UserFactory;