const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');

// const { ROLES } = require('../constants');

module.exports = {
    authenticate: catchAsync(
        async(req, res, next) => {
            try {
                // TODO: verify if user is admin
                const user = req.user;
                if (!user)
                    throw new errorObject(401, 'Unauthorized');
                next();
            } catch (err) {
                next(createHttpError(err.statusCode,`[Error on authenticate] ${err.message}`));
            }
        }
    )
}