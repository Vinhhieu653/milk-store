const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { v4: uuidv4 } = require('uuid')

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Hash password bằng Argon2
    const hashedPassword = await argon2.hash(password)

    const newUser = new User({
      userId: uuidv4(),
      username,
      email,
      password: hashedPassword
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

    // Kiểm tra mật khẩu bằng Argon2
    const isMatch = await argon2.verify(user.password, password)
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

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    // Kiểm tra nếu các trường mật khẩu cũ và mới không có
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Tất cả các trường là bắt buộc' })
    }

    // Kiểm tra độ dài mật khẩu mới (Ví dụ: ít nhất 3 ký tự)
    if (newPassword.length < 3) {
      return res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 3 ký tự' })
    }

    const userId = req.user.userId // Lấy userId từ thông tin người dùng đã được xác thực
    const user = await User.findById(userId) // Tìm người dùng theo userId

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' })
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await argon2.verify(user.password, oldPassword)
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng' })
    }

    // Kiểm tra mật khẩu mới có trùng với mật khẩu cũ không
    const isSameAsOldPassword = await argon2.verify(user.password, newPassword)
    if (isSameAsOldPassword) {
      return res.status(400).json({ message: 'Mật khẩu mới không được trùng với mật khẩu cũ' })
    }

    // Cập nhật mật khẩu mới
    user.password = await argon2.hash(newPassword)
    await user.save()

    res.json({ message: 'Đổi mật khẩu thành công!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' })
  }
}
