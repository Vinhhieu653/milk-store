const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, required: true }
});

module.exports = mongoose.model('cartitem', cartItemSchema);
