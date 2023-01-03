const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authenticate')
const { isAdmin } = require('../middlewares/isAdmin')

const userController = require('../controllers/rol');

router.get('/', authenticate, isAdmin, userController.getRoles);

module.exports = router;