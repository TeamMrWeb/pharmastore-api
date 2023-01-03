const express = require('express');
const router = express.Router();

const userSchema = require('../schemas/user');

const userController = require('../controllers/user');
const schemaValidator = require('../middlewares/schemaValidator');

const { authenticate } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', userController.get)
router.get('/:id', userController.getOne)

router.put('/:id', schemaValidator(userSchema.update), authenticate, isAdmin, userController.update)
router.patch('/:id', authenticate, isAdmin, userController.update)

module.exports = router;