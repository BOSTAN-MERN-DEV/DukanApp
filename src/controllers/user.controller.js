const { body } = require("express-validator");
const UserService = require("../app/services/user.service");
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constant")

class UserController {
    static async createUser(req, res) {
        try {
            const { customer_name, customer_email, customer_password } = req.body;
            const createdUser = await UserService.createUser({ customer_name, customer_email, customer_password });
            // console.log(createdUser)
            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: createdUser })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            throw err;
        }
    }
}

module.exports = UserController;