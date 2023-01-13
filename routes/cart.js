const express = require('express')
const router = express.Router()

const { authenticate } = require('../middlewares/authenticate')
const { isAdmin } = require('../middlewares/isAdmin')

const cartController = require('../controllers/cart')

router.get('/', authenticate, cartController.getCartProducts)
router.get('/total', authenticate, cartController.getCartTotal)
router.post('/', authenticate, cartController.addCartProduct)
// implement ownership authorization
router.patch('/:id', authenticate, cartController.updateCartProduct)
router.delete('/:id', authenticate, cartController.deleteCartProduct)

module.exports = router
