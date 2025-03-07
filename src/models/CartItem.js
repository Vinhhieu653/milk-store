const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Milk', required: true }, // Ref đúng với model 'Milk'
  quantity: { type: Number, default: 1, required: true }
})

module.exports = mongoose.model('CartItem', cartItemSchema)
