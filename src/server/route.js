const app = require("./express-app")
const userRoute = require("../routes/user.route")
const adminRoute = require("../routes/admin.routes")
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

module.exports = app;