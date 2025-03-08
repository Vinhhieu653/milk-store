const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

/**
 * @swagger
 * tags:
 *   - name: Comment
 *     description: Product comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 */
router.get('/', commentController.getAllComments)

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 */
router.post('/', commentController.createComment)

module.exports = router
