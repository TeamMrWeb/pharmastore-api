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
    categoryIdExists: async (id) => {
        try{
            const categoryId = await categoryService.findCategoryById(id);
            if(!categoryId) throw new errorObject({ statusCode: 404, message: 'CategoryId doesnt exists' });
        } catch(err) {
            //console.log(err);
            return err;
        }
        
    }
    
}