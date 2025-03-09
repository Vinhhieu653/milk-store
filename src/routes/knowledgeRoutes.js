const express = require('express')
const router = express.Router()
const knowledgeController = require('../controllers/knowledgeController')

/**
 * @swagger
 * tags:
 *   name: Knowledge
 *   description: API for knowledge articles
 */

/**
 * @swagger
 * /api/knowledge:
 *   get:
 *     summary: Get all knowledge articles
 *     tags: [Knowledge]
 *     responses:
 *       200:
 *         description: Successfully retrieved knowledge articles
 *       500:
 *         description: Internal server error
 */
router.get('/', knowledgeController.getAllKnowledgeArticles)

/**
 * @swagger
 * /api/knowledge/{id}:
 *   get:
 *     summary: Get a knowledge article by ID
 *     tags: [Knowledge]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the knowledge article
 *     responses:
 *       200:
 *         description: Successfully retrieved the article
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', knowledgeController.getKnowledgeArticleById)

module.exports = router
