const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');

router.get('/', productController.getProducts);
router.get('/categories', categoryController.getCategories);

module.exports = router;