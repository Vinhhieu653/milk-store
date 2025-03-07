const Product = require('../models/Product')
const mongoose = require('mongoose')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Hàm kiểm tra xem id có phải là ObjectId hợp lệ hay không
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && id.length === 24
}

exports.getProductById = async (req, res) => {
  const { id } = req.params

  // Kiểm tra nếu id không hợp lệ
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' })
  }

  try {
    // Khởi tạo ObjectId với giá trị hợp lệ
    const productId = new mongoose.Types.ObjectId(id)

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getMilkProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments() // Kiểm tra số lượng sản phẩm
    if (count < 3) {
      return res.status(404).json({ message: 'Không đủ sản phẩm để chọn ngẫu nhiên' })
    }

    const milkProducts = await Product.aggregate([{ $sample: { size: 3 } }])
    res.json(milkProducts)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm sữa:', error.message)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
