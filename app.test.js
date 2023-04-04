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
    name: "Fruit Loops",
    price: 4.98
};

beforeEach(() => {
    items.length = 0;
    items.push(reeses, fruitLoops);
});

afterEach(() => {
    items.length = 0;
})

describe("Tests for GET /items", () => {

    test("GET /items should return a list of items: [{name: <name>, price: <price>}, ...]",
        async () => {
            const resp = await request(app).get("/items");

            expect(resp.statusCode).toEqual(200);
            expect(resp.body).toEqual([
                {name: "Reese's", price: 2.99},
                {name: "Fruit Loops", price: 4.98}
            ]);
        })
})

