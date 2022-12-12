const createHttpError = require('http-errors')
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');
const errorObject = require('../helpers/errorObject');

const userService = require('../services/user');
const cryptService = require('../services/crypt');

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
            next(createHttpError(err.statusCode || 404,`[Error registering in] - [register - POST]: ${err.message}`))
        }
    }),
    login: catchAsync(async (req, res, next) => {
        try {
            const user = await userService.getByEmail(req.body.email);
            if (!user)
                throw new errorObject({ statusCode: 400, message: 'User not found' });
            const isPasswordValid = await cryptService.comparePassword(req.body.password, user.password);
            if (!isPasswordValid)
                throw new errorObject({ statusCode: 400, message: 'Invalid credentials' });
            successResponse({
                res,
                message: 'User logged in successfully',
                accessToken: {
                    value: 'token',
                    expiresIn: 0,
                },
                refreshToken: {
                    value: 'token',
                    expiresIn: 0,
                }
            });
        } catch (err) {
            next(createHttpError(err.statusCode || 404,`[Error logging in] - [login - POST]: ${err.message}`))
        }
    })
}