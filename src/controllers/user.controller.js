const UserService = require("../app/services/user.service");
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constant")
const { CONTROLLER_ERROR } = require("../constants/error")

class UserController {
    //SINGUP USER
    static async createUser(req, res) {
        try {
            const { customer_name, customer_email, customer_password } = req.body;
            const createdUser = await UserService.createUser({ customer_name, customer_email, customer_password });

            return res.json({ status: API_STATUS_CODES.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, body: createdUser })
        } catch (err) {
            if (err.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
                return res.json({ staus: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
            }

            throw err;
        }
    }

    //LOGIN USER
    static async loginUser(req, res) {
        try {
            // console.log('inside login user controller>>>>>>>>>>>>>>>>>')
            let { customer_email, customer_password } = req.body;
            let response = {};
            const loginUser = await UserService.loginUser({ customer_email, customer_password });
            response.message = loginUser.token ? RESPONSE_MESSAGES.SUCCESS : RESPONSE_MESSAGES.AUTHORIZATION_FAILED;
            response.body = loginUser;
            return res.json(response);
        } catch (err) {
            return res.json(CONTROLLER_ERROR);
        }
    }
}

module.exports = UserController;