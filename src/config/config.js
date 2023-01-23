const Pool = require("pg").Pool;
require("dotenv").config();

const db = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
});

db.connect((error) => {
    if(error) throw error;
    console.warn("Datbase Connected.")
})

module.exports = db;
