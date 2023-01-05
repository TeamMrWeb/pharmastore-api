const createHttpError = require('http-errors')
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');
const errorObject = require('../helpers/errorObject');

const userService = require('../services/user');
const authService = require('../services/auth');

module.exports = {
    register: catchAsync(async (req, res, next) => {
        // TODO: view if this method is correct here or should be in the user service
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
            const response = await authService.login(req.body.email, req.body.password);
            successResponse({
                res,
                message: 'User logged in successfully',
                body: response
            });
        } catch (err) {
            next(createHttpError(err.statusCode || 404,`[Error logging in] - [login - POST]: ${err.message}`))
        }
    }),
    refresh: catchAsync(async (req, res, next) => {
        try {
            const refreshToken = req.body.refreshToken;
            const accessToken = req.headers.authorization.split(' ')[1];
            if (!refreshToken) throw new errorObject({ statusCode: 400, message: 'Refresh token is required' });
            const response = await authService.refresh(accessToken, refreshToken);
            successResponse({
                res,
                message: 'Token refreshed successfully',
                body: response
            });
        } catch (err) {
            next(createHttpError(err.statusCode || 404,`[Error refreshing token] - [refresh - POST]: ${err.message}`))
        }
    })
}