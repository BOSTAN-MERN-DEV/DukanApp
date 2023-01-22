const app = require("./express-app")
const userRoute = require("../routes/user.route")
const orderRoute = require("../routes/order.route");

app.use("/api/user", userRoute);
app.use("/api/order", orderRoute)


module.exports = app;