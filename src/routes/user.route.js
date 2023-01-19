const express = require("express");
const UserController = require("../controllers/user.controller");
const UserValidator = require("../utils/validators/user.validator");
const router = express.Router();

router.use("/singup", UserValidator.createUserValidator, UserController.createUser)

module.exports = router;