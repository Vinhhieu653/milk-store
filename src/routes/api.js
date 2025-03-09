const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Test API
 *     description: Returns a test message.
 *     tags: [App]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World 123567!"
 */
router.get('/', (req, res) => {
  res.send('Hello World 123567!')
})

module.exports = router
