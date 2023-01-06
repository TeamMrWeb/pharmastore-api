const express = require('express');
const router = express.Router();

const userSchema = require('../schemas/user');

const userController = require('../controllers/user');
const schemaValidator = require('../middlewares/schemaValidator');

const { authenticate } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/isAdmin');

// TODO: payment routes, some routes require a schema validator
router.get('/payment', authenticate, userController.getPayment)
router.post('/payment', (req, res) => { res.send('Payment post route') } )
router.put('/payment', (req, res) => { res.send('Payment update route') } ) 
router.patch('/payment', (req, res) => { res.send('Payment patch route') } )

router.get('/', authenticate, userController.get)
router.get('/:id', authenticate, userController.getOne)

router.put('/:id', schemaValidator(userSchema.update), authenticate, isAdmin, userController.update)
router.patch('/:id', authenticate, isAdmin, userController.update)

// NOTE: remove foreign key constraints before deleting a user
router.delete('/:id', authenticate, isAdmin, userController.delete)



module.exports = router;