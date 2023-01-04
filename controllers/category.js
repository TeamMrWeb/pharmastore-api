const createHttpError = require('http-errors');
const errorObject = require('../helpers/errorObject');
const catchAsync = require('../helpers/catchAsync');
const successResponse = require('../helpers/successResponse');

const categoryService = require('../services/category');

module.exports = {
    getCategories: catchAsync(async (req, res, next) => {
        try {
            const results = await categoryService.getAll();
            successResponse({
                res,
                message: 'Categories fetched successfully',
                body: { categories: results }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error retrieving categories] - [categories - GET]: ${err.message}`))
        }
    }),
    createCategory: catchAsync(async (req, res, next) => {
        try {
            const category = await categoryService.create(req.body);
            await category.save();
            successResponse({
                res,
                message: 'Category created successfully',
                body: { category }
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error creating categories] - [categories - POST]: ${err.message}`))
        }
    }),
    update: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) throw new errorObject({ statusCode: 400, message: 'Category ID is required' });
            let payload = {};
            const method = req.method
            if (method === 'PUT')
                payload = req.body;
            else
            {
                const attributes = await categoryService.getAttributes();
                attributes.forEach(attr => {
                // If any attr is provided, update it
                if (method === 'PATCH' && req.body[attr])
                    payload[attr] = req.body[attr]; 
                })
            }
            if (Object.keys(payload).length === 0) throw new errorObject({ statusCode: 400, message: 'No valid attributes provided' });
            console.log(payload)
            const category = await categoryService.update(id, payload);
            if (!category) throw new errorObject({ statusCode: 404, message: 'Category not found' });
            successResponse({
                res,
                message: 'Category updated successfully',
                body: category
            });
        } catch (err) {
            console.log(err)
            next(createHttpError(err.statusCode,`[Error updating category] - [category - ${req.method}]: ${err.message}`))
        }
    })
}