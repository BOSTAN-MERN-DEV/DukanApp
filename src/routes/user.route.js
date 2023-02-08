const express = require("express");

const UserController = require("../controllers/user.controller");
const authMiddleware = require("../utils/validators/authMiddleware");
const UserValidator = require("../utils/validators/user.validator");
const router = express.Router();

router.use("/register", UserValidator.createUserValidator, UserController.createUser);
router.use("/login", UserValidator.authenticate, UserController.loginUser);

module.exports = router; 