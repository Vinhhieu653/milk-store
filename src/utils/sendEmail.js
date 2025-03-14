const nodemailer = require('nodemailer')

const sendEmail = async (user_name, user_email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user_email, // Gửi vào email khách nhập
    subject: `Tin nhắn từ ${user_name}`,
    text: `Tên: ${user_name}\nEmail: ${user_email}\nNội dung: ${message}\nThời gian gửi: ${now}`
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendEmail }
