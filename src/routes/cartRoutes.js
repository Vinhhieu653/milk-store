const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.post('/add', cartController.addToCart)
router.get('/all', cartController.getAllCartItems) // 🆕 Lấy tất cả giỏ hàng
router.get('/:userId', cartController.getCartByUser)
router.put('/:cart_item_id', cartController.updateCartItem)
router.delete('/:cart_item_id', cartController.removeCartItem)
router.delete('/clear/:user_id', cartController.clearCart)

module.exports = router
