const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const productService = require('../services/product');

module.exports = {
    getProducts: catchAsync(async (req, res, next) => {
        try {
            const page = req.query.page || 0;
            if (page < 0) throw new errorObject({ statusCode: 400, message: 'Page cannot be less than 0' });
            const results = await productService.get({ page });
            successResponse({
                res,
                message: 'Products fetched successfully',
                body: {
                    products: results,
                    previous: page > 0 ? `/v1/product?page=${page - 1}` : null,
                    next: results.length > 0 ? `/v1/product?page=${parseInt(page)+1}` : null
                }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving products] - [products - GET]: ${err.message}`))
        }
    })
}