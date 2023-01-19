const app = require("./express-app")
const userRoute = require("../routes/user.route")
app.use("/api/user", userRoute);


module.exports = app;