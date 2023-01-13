const createHttpError = require('http-errors')
const errorObject = require('../helpers/errorObject')
const catchAsync = require('../helpers/catchAsync')
const successResponse = require('../helpers/successResponse')

const userService = require('../services/user')
const productService = require('../services/product')
const cartService = require('../services/cart')

module.exports = {
    getCartProducts: catchAsync(async (req, res, next) => {
        try {
            const results = await cartService.getAll()
            if (!results)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Error getting cart products',
                })
            successResponse({
                res,
                message: 'Cart products retrieved successfully',
                body: results,
            })
        } catch (err) {
            console.log(err)
            next(
                createHttpError(
                    err.statusCode,
                    `[Error getting cart products] - [cart - GET]: ${err.message}`
                )
            )
        }
    }),
    addCartProduct: catchAsync(async (req, res, next) => {
        try {
            const { userId } = req.payload
            const { productId } = req.body
            if (!productId)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Product ID is required',
                })
            const product = await productService.getOne(productId)
            if (!product)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Product not found',
                })
            const user = await userService.getOne(userId)
            if (!user)
                throw new errorObject({
                    statusCode: 400,
                    message: 'User not found',
                })
            const existingCart = await cartService.findByUserIdAndProductId(
                userId,
                productId
            )
            if (existingCart) {
                throw new errorObject({
                    statusCode: 400,
                    message: 'Product already in cart',
                })
            }
            const cart = await cartService.create({
                userId,
                productId,
                quantity: 1,
            })
            if (!cart)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Error adding product to cart',
                })
            successResponse({
                res,
                message: 'Product added to cart successfully',
                body: cart,
            })
        } catch (err) {
            console.log(err)
            next(
                createHttpError(
                    err.statusCode,
                    `[Error adding product to cart] - [cart - POST]: ${err.message}`
                )
            )
        }
    }),
    deleteCartProduct: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params
            const cart = await cartService.findById(id)
            if (!cart)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Cart product not found',
                })
            const deletedCart = await cartService.delete(id)
            if (!deletedCart)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Error deleting cart product',
                })
            successResponse({
                res,
                message: 'Cart product deleted successfully',
                body: deletedCart,
            })
        } catch (err) {
            console.log(err)
            next(
                createHttpError(
                    err.statusCode,
                    `[Error deleting cart product] - [cart - DELETE]: ${err.message}`
                )
            )
        }
    }),
    getCartTotal: catchAsync(async (req, res, next) => {
        try {
            const { userId } = req.payload
            const cart = await cartService.finByUserId(userId)
            if (!cart)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Cart not found',
                })
            let total = 0
            cart.forEach((item) => {
                total += item.quantity * item.Product.price
            })
            successResponse({
                res,
                message: 'Cart total estimated successfully',
                body: { total },
            })
        } catch (err) {
            console.log(err)
            next(
                createHttpError(
                    err.statusCode,
                    `[Error estimating cart total] - [cart - GET]: ${err.message}`
                )
            )
        }
    }),
    updateCartProduct: catchAsync(async (req, res, next) => {
        try {
            const { id } = req.params
            const { quantity } = req.body
            const cart = await cartService.findById(id)
            if (!quantity)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Quantity is required',
                })
            if (!cart)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Cart product not found',
                })
            const updatedCart = await cartService.update(id, { quantity })
            if (!updatedCart)
                throw new errorObject({
                    statusCode: 400,
                    message: 'Error updating cart product',
                })
            successResponse({
                res,
                message: 'Cart product updated successfully',
                body: updatedCart,
            })
        } catch (err) {
            console.log(err)
            next(
                createHttpError(
                    err.statusCode,
                    `[Error updating cart product] - [cart - PUT]: ${err.message}`
                )
            )
        }
    }),
}
