const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1] // Lấy token từ header
  try {
    // Kiểm tra và giải mã token
    req.user = jwt.verify(token, process.env.JWT_SECRET) // Nếu token không hợp lệ hoặc hết hạn, nó sẽ ném lỗi

    next() // Tiến hành với middleware tiếp theo nếu token hợp lệ
  } catch (error) {
    console.error('JWT verification failed:', error)

    // Kiểm tra nếu lỗi là do token hết hạn
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again' })
    }

    // Kiểm tra nếu lỗi là do token không hợp lệ
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

module.exports = authMiddleware
