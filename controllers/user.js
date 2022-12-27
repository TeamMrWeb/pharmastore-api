const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const userService = require('../services/user');

module.exports = {
    get: catchAsync(async (req, res, next) => {
        try {
            const page = req.query.page || 0;
            if (page < 0) throw new errorObject({ statusCode: 400, message: 'Page cannot be less than 0' });
            const results = await userService.get({ page });
            successResponse({
                res,
                message: 'Users fetched successfully',
                body: {
                    users: results,
                    previous: page > 0 ? `/v1/user?page=${page - 1}` : null,
                    next: results.length > 0 ? `/v1/user?page=${parseInt(page)+1}` : null
                }
            });
        } catch (err) {
            next(createHttpError(err.statusCode,`[Error retrieving users] - [users - GET]: ${err.message}`))
        }
    }),
    getOne: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) throw new errorObject({ statusCode: 400, message: 'User ID is required' });
            const user = await userService.getOne(id);
            if (!user) throw new errorObject({ statusCode: 404, message: 'User not found' });
            successResponse({
                res,
                message: 'Users fetched successfully',
                body: {
                    user
                }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving user] - [user - GET]: ${err.message}`))
        }
    })
}