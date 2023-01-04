const express = require('express');
const router = express.Router();

const productSchemas = require('../schemas/product');
const categorySchema = require('../schemas/category');

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const schemaValidator = require('../middlewares/schemaValidator');

const { authenticate } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', authenticate, productController.getProducts);
router.post('/', schemaValidator(productSchemas.create), authenticate, isAdmin, productController.postProducts);

router.get('/categories', authenticate, categoryController.getCategories);
router.post('/categories', schemaValidator(categorySchema.create), authenticate, isAdmin, categoryController.createCategory);


module.exports = router;