const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Increase the maximum allowed request size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());


app.use(bodyParser.json());
app.use(cors())

module.exports = app;