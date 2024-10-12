const mongoose = require('mongoose');

const knowledgeArticleSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('knowledge', knowledgeArticleSchema);
