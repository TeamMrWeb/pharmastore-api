const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

const { authenticate } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', userController.get)
router.get('/:id', userController.getOne)

router.put('/:id', authenticate, isAdmin, userController.update)
router.patch('/:id', authenticate, isAdmin, userController.update)

module.exports = router;