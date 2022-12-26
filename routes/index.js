// required modules
const express = require('express');
const router = express.Router();

// setting up routes
router.get('/', (req, res) => res.send('Parches Pharmastore API v1'));

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/product', require('./product'));

module.exports = router;
