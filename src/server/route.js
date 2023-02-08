const app = require("./express-app")

const userRoute = require("../routes/user.route");
const categoryRoute = require("../routes/category.route")
const productRoute = require('../routes/products.route')
const orderRoute = require("../routes/order.route");
const adminRoute = require("../routes/admin.routes")

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/admin", adminRoute)

module.exports = app;

