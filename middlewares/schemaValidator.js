const createHttpError = require('http-errors');
const catchAsync = require('../helpers/catchAsync');
const errorObject = require('../helpers/errorObject');
const { validationResult, checkSchema } = require('express-validator');


module.exports = (schema) => [
    checkSchema(schema),
    catchAsync(async (req, res, next) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errors_array = errors.array().map(error => error.msg);
                throw new errorObject({
                    message: 'Invalid request data',
                    statusCode: 400,
                    errors: errors_array
                });
            }
            next();
        } catch (err) {
            next(createHttpError(err.statusCode, `[Error validating schema]: ${err.message}: ${err.errors}`))
        }
    })
]