const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 'asc' });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createMessage = async (req, res) => {
    const { text } = req.body;
    try {
        const newMessage = new Message({ text, fromUser: true });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};
