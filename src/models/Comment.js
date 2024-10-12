const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('comment', commentSchema);
