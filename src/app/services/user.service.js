const UserFactory = require("../factories/user.factory");
const UserRepository = require("../repositories/user.repository");
const LoginFactory = require("../factories/login.factory")

class UserService {
    //CREATE USER
    static async createUser(data) {
        try {
            const creatUser = await UserRepository.createUser(data);
            const formatedUser = await UserFactory.createUser(creatUser);
            console.log("formated user>>>>>>>>>>>", formatedUser)
            return formatedUser;
        } catch (err) {

        }
    }

    //LOGIN USER
    static async loginUser(data) {
        try {
            const { customer_email, customer_password } = data;
            let foundUser = await UserRepository.findUserByEmail(customer_email);
            foundUser = foundUser.rows[0];
            const loginUser = await LoginFactory.prepareLogin({ customer_email, customer_password, foundUser })
            return loginUser;
        } catch (err) {

        }
    }
}

module.exports = UserService;