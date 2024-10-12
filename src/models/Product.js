const mongoose = require('mongoose');

module.exports = mongoose.model('milk', new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    weight: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    info: { type: String, required: true }
}));
