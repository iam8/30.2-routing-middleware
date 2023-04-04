// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** JSON API application for storing and modifying a simple shopping list. */

const express = require("express");
const app = express();

const { router } = require("./routes");
const { ExpressError } = require("./expressError");


app.use(express.json());
app.use("/items", router);

// ERROR HANDLERS ---------------------------------------------------------------------------------

// Handler for 404 errors
app.use((req, res, next) => {
    const notFoundError = new ExpressError("Page not found!", 404);
    return next(notFoundError);
})

// Global error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;

    // Set status and alert the user
    return res.status(status).json({
        error: {message, status}
    })
})

// ------------------------------------------------------------------------------------------------


module.exports = {
    app,
};
