const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const rolService = require('../services/rol');

module.exports = {
    getRoles: catchAsync(async (req, res, next) => {
        try {
            const results = await rolService.getAll();
            successResponse({
                res,
                message: 'Roles fetched successfully',
                body: { roles: results }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving roles] - [roles - GET]: ${err.message}`))
        }
    })
}