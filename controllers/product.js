const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const productService = require('../services/product');

module.exports = {
    getProducts: catchAsync(async (req, res, next) => {
        try {
            const page = req.query.page || 0;
            const category = req.query.category || null;
            const name = req.query.name || null;
            
            if (page < 0) throw new errorObject({ statusCode: 400, message: 'Page cannot be less than 0' });
            const results = await productService.get({ page, category, rating });
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
    }),
    postProducts: catchAsync(async (req, res, next) => {
        try {
            const payload = req.body;
            console.log(payload);
            //verifications
           await productService.validateProduct(payload);

            const product = await productService.create(payload);

            successResponse({
                res,
                message: 'Products fetched successfully',
                body: {
                    result: product
                }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving products] - [products - POST]: ${err.message}`))
        }
    }),
    update: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) throw new errorObject({ statusCode: 400, message: 'Product ID is required' });
            let payload = {};
            const method = req.method
            if (method === 'PUT')
                payload = req.body;
            else
            {
                const attributes = await productService.getAttributes();
                attributes.forEach(attr => {
                // If any attr is provided, update it
                if (method === 'PATCH' && req.body[attr])
                    payload[attr] = req.body[attr]; 
                })
            }
            if (Object.keys(payload).length === 0) throw new errorObject({ statusCode: 400, message: 'No valid attributes provided' });
            const product = await productService.update(id, payload);
            if (!product) throw new errorObject({ statusCode: 404, message: 'Product not found' });
            successResponse({
                res,
                message: 'Product updated successfully',
                body: product
            });
        } catch (err) {
            next(createHttpError(err.statusCode,`[Error updating product] - [product - ${req.method}]: ${err.message}`))
        }
    })
}