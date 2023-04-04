// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Routes for JSON Shopping List app. */

const express = require("express");
const router = new express.Router();

const { items } = require("./fakeDb");

/** GET /items: get list of items on shopping list. */
router.get("/", (req, res, next) => {
    return res.json(items);
})

/** POST /items: add new item (JSON data input) to shopping list. */
// router.post("/", (req, res, next) => {
    // return res.json({
    //     added: {
    //         name: "newitem",
    //         price: 1.99
    //     }
    // });
// })

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


/** DELETE /items/:name: delete a specific item from the shopping list. */
router.delete("/:name", (req, res, next) => {
    const name = req.params.name;

    return res.json({ message: "Deleted"});
})


module.exports = {
    router,
};
