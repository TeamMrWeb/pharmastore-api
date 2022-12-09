const createHttpError = require('http-errors')
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');
const errorObject = require('../helpers/errorObject');

const userService = require('../services/user');

module.exports = {
    register: catchAsync(async (req, res, next) => {
        try {
            const user = await userService.create(req.body);
            if (!user)
                throw new errorObject({ statusCode: 400, message: 'Cannot create user' });
            successResponse({
                res,
                message: 'User registered successfully',
                body: user
            });
        } catch (err) {
            next(createHttpError(err.statusCode || 404,`[Error registering user] - [auth - POST]: ${err.message}`))
        }
    })
}