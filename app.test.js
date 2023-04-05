// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Integration tests for Express JSON shopping list app. */

process.env.NODE_ENV = "test";

const request = require("supertest");

const { app } = require("./app");
const { items } = require("./fakeDb");


let reeses = {
    name: "Reese's",
    price: 2.99
};

let fruitLoops = {
    name: "FruitLoops",
    price: 4.98
};

beforeEach(() => {
    items.length = 0;
    items.push(reeses, fruitLoops);
});

afterEach(() => {
    items.length = 0;
});

describe("Tests for GET /items", () => {

    test("GET /items should return a list of items: [{name: <name>, price: <price>}, ...]",
    async () => {
        const resp = await request(app).get("/items");

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual([
            {name: "Reese's", price: 2.99},
            {name: "FruitLoops", price: 4.98}
        ]);
    });
});

describe("Tests for POST /items", () => {

    test("POST /items should return the appropriate status code and response body: " +
    "{added: {name: <name>, price: ...}}",
    async () => {

    })

    test("POST /items should successfully add a new item to the shopping list", async () => {

    })
})

describe("Tests for GET /items/:name", () => {

    test("GET /items/:name should result in a 404 status code for a nonexistent item name",
    async () => {
        const resp = await request(app).get("/items/nonexistent");

        expect(resp.statusCode).toEqual(404);
        expect(resp.body).toEqual({
            error: {
                message: "Page not found!",
                status: 404
            }
        })
    })

    test("GET /items/:name should return all the info for the item with the given name",
    async () => {
        const resp = await request(app).get("/items/FruitLoops");

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            name: "FruitLoops",
            price: 4.98
        });
    });
});

describe("Tests for PATCH /items/:name", () => {

})

describe("Tests for DELETE /items/:name", () => {

})

