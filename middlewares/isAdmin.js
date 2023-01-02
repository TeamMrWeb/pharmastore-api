const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

// const { ROLES } = require('../constants');

module.exports = {
    isAdmin: catchAsync(
        async(req, res, next) => {
            try {
                // TODO: verify if user is admin
                next();
            } catch (err) {
                console.log(err)
                next(createHttpError(err.statusCode,`[Error on user authenticate] ${err.message}`));
            }
        }
    )
}