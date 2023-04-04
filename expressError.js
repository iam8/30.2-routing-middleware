// Ioana A Mititean
// Exercise 30.2 - Express JSON Shopping List

/** Custom error class for Express. */


class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}


module.exports = ExpressError;
