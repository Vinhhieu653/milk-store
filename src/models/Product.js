const mongoose = require('mongoose');

const milkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    info: { type: String, default: "" }
});

module.exports = mongoose.model('Milk', milkSchema); // Đổi thành 'Milk'
