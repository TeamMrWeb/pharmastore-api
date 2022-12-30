const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

// const tokenService = require('../services/token');

module.exports = {
    authenticate: catchAsync(
        async(req, res, next) => {
            try {
                // TODO: verification and validation
                const token = req.headers.authorization.split(' ')[1];
                console.log(token)
                next();
            } catch (err) {
                next(createHttpError(err.statusCode,`[Error on authenticate] ${err.message}`));
            }
        }
    )
}