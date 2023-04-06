// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Integration tests for Express JSON shopping list app. */

process.env.NODE_ENV = "test";

const request = require("supertest");

const { app } = require("./app");
const { items } = require("./fakeDb");


let reeses = {
    name: "Reeses",
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
            {name: "Reeses", price: 2.99},
            {name: "FruitLoops", price: 4.98}
        ]);
    });
});

describe("Tests for POST /items", () => {

    test("POST /items should return the appropriate status code and response body: " +
    "{added: {name: <name>, price: ...}}",
    async () => {
        const resp = await request(app)
            .post("/items")
            .send({
                name: "NewItem",
                price: 7.99
            })

        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            added: {
                name: "NewItem",
                price: 7.99
            }
        })
    })

    test("POST /items should successfully add a new item to the shopping list", async () => {
        await request(app)
            .post("/items")
            .send({
                name: "NewItem",
                price: 7.99
            })

        expect(items.length).toEqual(3);
        expect(items[2]).toEqual({
            name: "NewItem",
            price: 7.99
        })
    })
})

describe("Tests for GET /items/:name", () => {

    test("GET /items/:name should result in a 404 status code and correct response body for a " +
    "nonexistent given item",
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

    test("PATCH /items/:name should return a 404 status code and correct response body for a " +
    "nonexistent given item",
    async () => {
        const resp = await request(app)
            .patch("/items/nonexistent")
            .send({
                name: "NewName",
                price: 10
            });

        expect(resp.statusCode).toEqual(404);
        expect(resp.body).toEqual({
            error: {
                message: "Page not found!",
                status: 404
            }
        })
    })

    test("PATCH /items/:name should not change the original shopping list if a nonexistent item" +
    "is given",
    async () => {
        const origList = structuredClone(items);  // Make deep copy of items list

        await request(app)
            .patch("/items/nonexistent")
            .send({
                name: "NewName",
                price: 10
            });

        expect(items).toEqual(origList);
    })

    test("PATCH /items/:name should return the correct status code and response body for an " +
    "existing given item",
    async () => {
        const updated = {
            name: "NewReeses",
            price: 15
        };

        const resp = await request(app)
            .patch("/items/Reeses")
            .send(updated);

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({ updated });
    })

    test("PATCH /items/:name should correctly update an existing item in the shopping list",
    async () => {
        const origSecond = Object.assign(items[1])  // Copy of second list item

        const updatedFirst = {
            name: "NewReeses",
            price: 15
        };

        await request(app)
            .patch("/items/Reeses")
            .send(updatedFirst);

        expect(items[0]).toEqual(updatedFirst);
        expect(items[1]).toEqual(origSecond);
    })

})

// describe("Tests for DELETE /items/:name", () => {

//     test("DELETE /items/:name should return a 404 status code and correct response body for a " +
//     "nonexistent given item", async () => {

//     })

//     test("DELETE /items/:name should return the correct status code and response body for an " +
//     "existing given item",
//     async () => {

//     })

//     test("DELETE /items/:name should successfully delete an existing item from the shopping " +
//     "list",
//     async () => {

//     })

// })

