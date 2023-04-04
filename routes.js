// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Routes for JSON Shopping List app. */


const express = require("express");
const router = new express.Router();
const { ExpressError } = require("./expressError");

const { items } = require("./fakeDb");

/** GET /items: get list of items on shopping list. */
router.get("/", (req, res, next) => {
    return res.json(items);
})

/** POST /items: add new item (JSON data input) to shopping list. */
router.post("/", (req, res, next) => {
    const item = {
        name: req.body.name,
        price: req.body.price
    };

    items.push(item);

    return res.json({
        added: item
    });
})

/** GET /items/:name: display the info for a single item on the shopping list. */
router.get("/:name", (req, res, next) => {

    for (let item of items) {
        if (item.name === req.params.name) {
            return res.json(item);
        }
    }
})

/** PATCH /items/:name: modify the info (JSON data input) for a single item on the shopping
 * list.
 */
router.patch("/:name", (req, res, next) => {

    let updated;

    for (let item of items) {
        if (item.name === req.params.name) {

            for (let attr in req.body) {
                item[`${attr}`] = req.body[`${attr}`];
            }

            updated = item;
        }
    }

    return res.json({ updated });
})


/** DELETE /items/:name: delete a specific item from the shopping list. */
router.delete("/:name", (req, res, next) => {
    const idx = items.findIndex((item) => {item.name === req.params.name});

    if (idx < 0) {
        return res.json({ message: "No item with the given name exists in list."});
    }

    items.splice(idx, 1);
    return res.json({ message: "Deleted"});
})


module.exports = {
    router,
};
