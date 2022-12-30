const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.get)
router.get('/filterByName', userController.getFilterByName)
router.get('/:id', userController.getOne)


module.exports = router;