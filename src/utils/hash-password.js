const bcrypt = require("bcrypt");

const hashPassword = async (psw) => {
    const hashPassword = bcrypt.hash(psw, 10);
    return hashPassword;
}

module.exports = hashPassword;