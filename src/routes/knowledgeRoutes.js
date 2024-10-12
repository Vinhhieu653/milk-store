const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');

router.get('/', knowledgeController.getAllKnowledgeArticles);
router.get('/:id', knowledgeController.getKnowledgeArticleById);

module.exports = router;
