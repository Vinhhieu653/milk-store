const express = require('express');
const router = express.Router();
const { getAllProducts, getMilkProducts, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/milk-products', getMilkProducts);
router.get('/:id', getProductById);

module.exports = router;
