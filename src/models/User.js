const mongoose = require('mongoose');

const User = mongoose.model('user', new mongoose.Schema({
    googleId: String,
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}).index({ email: 1 }, { unique: true }));

module.exports = User;
