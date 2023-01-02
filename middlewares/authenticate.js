const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

// const tokenService = require('../services/token');

module.exports = {
    authenticate: catchAsync(
        async(req, res, next) => {
            try {
                // TODO: verification and validation
                next();
            } catch (err) {
                console.log(err)
                next(createHttpError(err.statusCode,`[Error on authenticate] ${err.message}`));
            }
        }
    )
}