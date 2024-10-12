const KnowledgeArticle = require('../models/KnowledgeArticle');

exports.getAllKnowledgeArticles = async (req, res) => {
    try {
        const articles = await KnowledgeArticle.find();
        res.json(articles);
    } catch (error) {
        console.error('Error fetching knowledge articles:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getKnowledgeArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await KnowledgeArticle.findOne({ id });
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};
