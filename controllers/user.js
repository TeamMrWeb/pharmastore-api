const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const userService = require('../services/user');

module.exports = {
    /**
     * @description Get all users with pagination and filters by first name and last name
     */
    get: catchAsync(async (req, res, next) => {
        try {
            const page = req.query.page || 0;
            const firstName = req.query.firstName || '';
            const lastName = req.query.lastName || '';
            const deleted = req.query.deleted || false;
            const role = req.query.role || '';
            if (page < 0) throw new errorObject({ statusCode: 400, message: 'Page cannot be less than 0' });
            const results = await userService.get({ page, firstName, lastName, deleted, role });
            successResponse({
                res,
                message: Object.keys(results).length > 0 ? 'Users fetched successfully' : 'No users found',
                body: {
                    users: results,
                    previous: page > 0 ? `/v1/user?page=${page - 1}` : null,
                    next: results.length > 0 ? `/v1/user?page=${parseInt(page)+1}` : null
                }
            });
        } catch (err) {
            console.log(err)
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
                message: 'User fetched successfully',
                body: { user }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving user] - [user - GET]: ${err.message}`))
        }
    }),
    update: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) throw new errorObject({ statusCode: 400, message: 'User ID is required' });
            let payload = {};
            const method = req.method
            if (method === 'PUT')
                payload = req.body;
            else
            {
                const attributes = await userService.getAttributes();
                attributes.forEach(attr => {
                // If any attr is provided, update it
                if (method === 'PATCH' && req.body[attr])
                    payload[attr] = req.body[attr]; 
                })
            }
            if (Object.keys(payload).length === 0) throw new errorObject({ statusCode: 400, message: 'No valid attributes provided' });
            const user = await userService.update(id, payload);
            if (!user) throw new errorObject({ statusCode: 404, message: 'User not found' });
            successResponse({
                res,
                message: 'User updated successfully',
                body: user
            });
        } catch (err) {
            next(createHttpError(err.statusCode,`[Error updating user] - [user - ${req.method}]: ${err.message}`))
        }
    }),
    delete: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) throw new errorObject({ statusCode: 400, message: 'User ID is required' });
            const user = await userService.delete(id);
            if (!user) throw new errorObject({ statusCode: 404, message: 'User not found' });
            successResponse({
                res,
                message: 'User deleted successfully',
                body: user
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error deleting user] - [user - DELETE]: ${err.message}`))
        }
    }),
    getPayment: catchAsync(async (req, res, next) => {
        try {
            const { userId } = req.payload;
            console.log(userId)
            if (!userId) throw new errorObject({ statusCode: 400, message: 'User ID is required' });
            const user = await userService.getOne(userId);
            if (!user) throw new errorObject({ statusCode: 404, message: 'User not found' });
            const payment = await userService.getPayment(userId);
            if (!payment) throw new errorObject({ statusCode: 404, message: 'User payment not found' });
            successResponse({
                res,
                message: 'User payment fetched successfully',
                body: { payment }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving user payment] - [user - GET]: ${err.message}`))
        }
    })
}