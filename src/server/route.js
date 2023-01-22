const app = require("./express-app")
const userRoute = require("../routes/user.route")
const productRoute = require('../routes/products.route')
app.use("/api/user", userRoute);
app.use("/api/products", productRoute)

module.exports = app;