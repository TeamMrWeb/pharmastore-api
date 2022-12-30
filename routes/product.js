const express = require('express');
const router = express.Router();

const productSchemas = require('../schemas/product');
const categorySchema = require('../schemas/category');

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const schemaValidator = require('../middlewares/schemaValidator');

router.get('/', productController.getProducts);
router.post('/', schemaValidator(productSchemas.create), productController.postProducts);

router.get('/categories', categoryController.getCategories);
router.post('/categories', schemaValidator(categorySchema.create), categoryController.createCategory);


module.exports = router;