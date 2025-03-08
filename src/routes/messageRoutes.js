const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')

/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: User messages
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Message]
 */
router.get('/', messageController.getAllMessages)

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Message]
 */
router.post('/', messageController.createMessage)

module.exports = router
