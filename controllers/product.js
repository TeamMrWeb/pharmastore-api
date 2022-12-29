const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const productService = require('../services/product');
const categoryControllers = require('./category');
const inventoryControllers = require('./inventory');
const discountControllers = require('./discount');

module.exports = {
    getProducts: catchAsync(async (req, res, next) => {
        try {
            const page = req.query.page || 0;
            const category = req.query.category || null;
            const rating = req.query.rating || null;
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
            const categoryIdExists = await categoryControllers.categoryIdExists(payload.categoryId);
            console.log(categoryIdExists);
            if(categoryIdExists != undefined) throw categoryIdExists;

            const inventoryIdExists = await inventoryControllers.inventoryIdExists(payload.inventoryId);
            if(inventoryIdExists != undefined) throw inventoryIdExists;

            const discountIdExists = await discountControllers.discountIdExists(payload.discountId);
            if(discountIdExists != undefined) throw discountIdExists;

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
    })
}