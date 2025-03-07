const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid') // Đúng cách

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true, default: uuidv4 }, // Tạo ID mặc định
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)
