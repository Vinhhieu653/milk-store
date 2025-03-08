const express = require('express')
const router = express.Router()
const { getAllProducts, getMilkProducts, getProductById } = require('../controllers/productController')

/**
 * @swagger
 * tags:
 *   - name: Milk
 *     description: API for managing milk products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (including all categories)
 *     tags: [Milk]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products.
 */
router.get('/', getAllProducts)

/**
 * @swagger
 * /products/milk-products:
 *   get:
 *     summary: Get 3 random milk products
 *     tags: [Milk]
 *     responses:
 *       200:
 *         description: Successfully retrieved 3 random milk products.
 *       404:
 *         description: Not enough products available.
 */
router.get('/milk-products', getMilkProducts)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Milk]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the product.
 *       404:
 *         description: Product not found.
 */
router.get('/:id', getProductById)

module.exports = router
