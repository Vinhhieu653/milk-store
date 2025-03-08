const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API for user management
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: example
 *               password:
 *                 type: string
 *                 example: 123
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', userController.register)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: 123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', userController.login)

module.exports = router
