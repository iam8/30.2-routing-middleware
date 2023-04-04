// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Start Express server for app. */

const { app } = require("./app");


app.listen(3000, "127.0.0.1", () => {
    console.log("App running on 127.0.0.1, port 3000");
})
