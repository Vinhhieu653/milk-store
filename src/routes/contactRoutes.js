const express = require('express')
const { createContact } = require('../controllers/contactController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API liên hệ người dùng
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Gửi thông tin liên hệ
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "Nguyen Van A"
 *               user_email:
 *                 type: string
 *                 example: "hieudvse172738@fpt.edu.vn"
 *               message:
 *                 type: string
 *                 example: "Tôi muốn tư vấn về sữa cho bé"
 *     responses:
 *       201:
 *         description: Gửi liên hệ thành công
 *       400:
 *         description: Thiếu thông tin hoặc request sai
 *       500:
 *         description: Lỗi server
 */

router.post('/', createContact)

module.exports = router
