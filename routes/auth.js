const express = require('express');
const router = express.Router();

const userSchemas = require('../schemas/user');
const authController = require('../controllers/auth');
const schemaValidator = require('../middlewares/schemaValidator');

//router.post('/login', schemaValidator(userSchemas.login), authController.login);
router.post('/register', schemaValidator(userSchemas.create), authController.register);

module.exports = router;