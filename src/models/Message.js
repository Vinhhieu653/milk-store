const mongoose = require('mongoose');

module.exports = mongoose.model('message', new mongoose.Schema({
    text: { type: String, required: true },
    fromUser: { type: Boolean, required: true }
}, { timestamps: true }));
