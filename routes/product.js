const express = require('express');
const router = express.Router();

const productSchemas = require('../schemas/product');

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const schemaValidator = require('../middlewares/schemaValidator');

router.get('/', productController.getProducts);
router.get('/categories', categoryController.getCategories);
router.post('/', schemaValidator(productSchemas.create), productController.postProducts);


module.exports = router;