// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** JSON API application for storing and modifying a simple shopping list. */

const express = require("express");
const app = express();

const routes = require("./routes");


app.use("/items", routes);


module.exports = {
    app,
};
