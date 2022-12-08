// required modules
const express = require('express');
const router = express.Router();

// setting up routes
router.use('/', (req, res) => {
    res.send('Parches pharmastore API v1');
});

module.exports = router;
