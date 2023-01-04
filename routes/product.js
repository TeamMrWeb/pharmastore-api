const express = require('express');
const router = express.Router();

const productSchema = require('../schemas/product');
const categorySchema = require('../schemas/category');

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const schemaValidator = require('../middlewares/schemaValidator');

const { authenticate } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', authenticate, productController.getProducts);
router.post('/', schemaValidator(productSchema.create), authenticate, isAdmin, productController.postProducts);
router.put('/:id', schemaValidator(productSchema.update), authenticate, isAdmin, productController.update);
router.patch('/:id', authenticate, isAdmin, productController.update);


router.get('/categories', authenticate, categoryController.getCategories);
router.post('/categories', schemaValidator(categorySchema.create), authenticate, isAdmin, categoryController.createCategory);
router.put('/categories/:id', schemaValidator(categorySchema.update), authenticate, isAdmin, categoryController.update);
router.patch('/categories/:id', authenticate, isAdmin, categoryController.update);


module.exports = router;