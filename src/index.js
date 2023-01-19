const app = require("../src/server/express-app")
require("dotenv").config();
require("../src/server/route")

app.listen(`${process.env.PORT}`, () => console.log(`Server running on port: ${process.env.PORT}`))