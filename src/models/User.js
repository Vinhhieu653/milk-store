const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    address: { type: String },
    phone_number: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
