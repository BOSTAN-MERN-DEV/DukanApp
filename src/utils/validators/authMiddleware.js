const jwt = require("jsonwebtoken");

class authMiddleware {
    static async verifyToken(req, resp, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token
            next()

        } else {
            resp.send({
                result: "token is not valid"
            })
        }
    }

}

module.exports = authMiddleware;