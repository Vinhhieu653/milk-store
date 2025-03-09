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
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 */
router.get('/', commentController.getAllComments)

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 */
router.post('/', commentController.createComment)

module.exports = router
