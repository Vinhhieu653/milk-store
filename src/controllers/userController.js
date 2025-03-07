const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { v4: uuidv4 } = require('uuid')

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      userId: uuidv4(), // Đảm bảo userId luôn có giá trị
      username,
      email,
      password: hashedPassword // Lưu password đã mã hóa
    })

    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ message: 'Login successful', token, userId: user._id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
