// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Routes for JSON Shopping List app. */

const express = require("express");
const router = new express.Router();

const items = require("./fakeDb");


/** GET /items: get list of items on shopping list. */
router.get("/items", (req, res, next) => {
    return res.json(items);
})




module.exports = {
    router,
};
