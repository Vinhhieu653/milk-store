const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: 'asc' });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createComment = async (req, res) => {
    const { name, text, rating } = req.body;
    try {
        const newComment = new Comment({ name, text, rating });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};
