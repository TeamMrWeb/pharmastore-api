// required modules
const express = require('express');
const router = express.Router();

// setting up routes
router.get('/', (req, res) => res.send('Parches Pharmastore API v1'));

router.use('/user', require('./user'));

module.exports = router;
