const express = require('express');
const router = express.Router();

const userController = require('../controllers/rol');

router.get('/', userController.getRoles);

module.exports = router;