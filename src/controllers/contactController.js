const { sendEmail } = require('../utils/sendEmail')

const createContact = async (req, res) => {
  try {
    const { user_name, user_email, message } = req.body

    if (user_name.length < 5) return res.status(400).json({ error: 'Tên phải có ít nhất 5 ký tự' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email)) return res.status(400).json({ error: 'Email không hợp lệ' })
    if (message.length < 3) return res.status(400).json({ error: 'Lời nhắn phải có ít nhất 3 ký tự' })

    await sendEmail(user_name, user_email, message)
    res.status(201).json({ message: 'Gửi thành công' })
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' })
  }
}

module.exports = { createContact }
