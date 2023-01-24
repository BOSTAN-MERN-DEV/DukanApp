const express = require("express");
const UserController = require("../controllers/user.controller");
const UserValidator = require("../utils/validators/user.validator");
const router = express.Router();

router.use("/singup", UserValidator.createUserValidator, UserController.createUser);
router.use("/login", UserController.loginUser);

module.exports = router;