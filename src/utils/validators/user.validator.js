// const { body, validationResult } = require('express-validator');
const validator = require('validator');
const { INVALID_REQUEST, CONTROLLER_ERROR } = require('../../constants/error');
require("dotenv").config();

const hashPassword = require('../hash-password');


class UserValidator {

    static async createUserValidator(req, res, next) {
        try {
            const { customer_name, customer_email, customer_password } = req.body;
            if (typeof customer_password === 'string' && typeof customer_email === 'string' && typeof customer_name === 'string' && customer_password && customer_name && customer_email && customer_password.length >= 2) {
                let isValidEmail = validator.isEmail(customer_email);

                if (isValidEmail) {
                    const hashedPassword = await hashPassword(customer_password);
                    req.body.customer_password = hashedPassword;
                    next();

                } else {
                    res.json(INVALID_REQUEST);
                }

            } else {
                res.json(INVALID_REQUEST)
            }

        } catch (error) {
            console.log(error);
            res.json(CONTROLLER_ERROR);
        }
    }

    verifyToken(userToken) {
        try {
            const bearer = userToken.split(" ");
            const token = bearer[1];
            return jwt.verify(token, process.env.MY_SECRET);
        } catch (error) {
            return false;
        }
    }

    static async authenticate(req, res, next) {
        try {
            const { authorization } = req.headers;
            const { customer_email, customer_password } = req.body;
            const isValidEmail = validator.isEmail(customer_email);

            if (isValidEmail && typeof customer_password === 'string' && authorization) {
                const userObj = new UserValidator();
                const user = userObj.verifyToken(authorization);

                if (!user) {
                    return res.status(400).send('Invalid token.');
                }

                req.user = user;
                next();
            } else {
                return res.status(401).send('Access denied. Invalid credencial.');
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }


        // const token = req.headers.authorization;

        // if (!token) {
        //     return res.status(401).send('Access denied. No token provided.');
        // }

        // const userObj = new UserValidator();
        // const user = userObj.verifyToken(token);

        // if (!user) {
        //     return res.status(400).send('Invalid token.');
        // }

        // req.user = user;
        // next();
    }


}

module.exports = UserValidator;