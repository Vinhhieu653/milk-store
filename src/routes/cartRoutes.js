const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middlewares/authMiddleware')
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing shopping cart
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *                 example: 67c324e7a4a233dc4baa1875
 *               productId:
 *                 type: string
 *                 description: ID of the product
 *                 example: 67c2db29b154071a30fbecc6
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/add', authMiddleware, cartController.addToCart)

/**
 * @swagger
 * /cart/all:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully retrieved all cart items
 *       500:
 *         description: Internal server error
 */
router.get('/all', authMiddleware, cartController.getAllCartItems)

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get cart items by user ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', authMiddleware, cartController.getCartByUser)

/**
 * @swagger
 * /cart/{cart_item_id}:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cart_item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the product
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
router.put('/:cart_item_id', authMiddleware, cartController.updateCartItem)

/**
 * @swagger
 * /cart/{cart_item_id}:
 *   delete:
 *     summary: Remove a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cart_item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cart item
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:cart_item_id', authMiddleware, cartController.removeCartItem)

/**
 * @swagger
 * /cart/clear/{user_id}:
 *   delete:
 *     summary: Clear all cart items for a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/clear/:user_id', authMiddleware, cartController.clearCart)

module.exports = router
