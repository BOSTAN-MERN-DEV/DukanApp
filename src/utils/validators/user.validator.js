const { body, validationResult } = require('express-validator');
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require('../../constants/constant');
const hashPassword = require('../hash-password');


class UserValidator {
    static async createUserValidator(req, res, next) {
        const { customer_name, customer_email, customer_password } = req.body;

        //CHECK VALIDATION
        body("customer_name", { message: "customer name must be string" }).isString();
        body("customer_email", { message: "customer email must be follow email standard" }).isEmail();
        body("customer_password", { message: "password must be strong" }).isStrongPassword();

        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(API_STATUS_CODES.ERROR_CODE).json({ result: "Invalid request" });
        }

        const hashedPassword = await hashPassword(customer_password);
        req.body.customer_password = hashedPassword;
        next();
    }
}

module.exports = UserValidator;