const app = require("./express-app")
const userRoute = require("../routes/user.route");
const categoryRoute = require("../routes/category.route")
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);



module.exports = app;

