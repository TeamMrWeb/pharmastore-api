module.exports = class ErrorObject extends Error {
    constructor({
        message,
        statusCode = 500,
        errors = []
    }) {
        super();

        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.errors = errors;
    
        Error.captureStackTrace(this, this.constructor);
    }
}