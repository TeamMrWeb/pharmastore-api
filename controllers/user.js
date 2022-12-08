const createHttpError = require('http-errors')
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const userService = require('../services/user');

module.exports = {
    get: catchAsync(async (req, res, next) => {
        try {
            const results = await userService.getAll();
            successResponse({
                res,
                message: 'Users fetched successfully',
                body: results
            });
        } catch (err) {
            next(createHttpError(err.statusCode,`[Error retrieving users] - [users - GET]: ${err.message}`))
        }
    })
}