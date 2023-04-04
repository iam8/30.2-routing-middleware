// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** JSON API application for storing and modifying a simple shopping list. */

const express = require("express");
const app = express();

const { router } = require("./routes");


app.use(express.json());
app.use("/items", router);


module.exports = {
    app,
};
