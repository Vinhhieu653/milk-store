const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMilkProducts = async (req, res) => {
    try {
        const milkProducts = await Product.aggregate([{ $sample: { size: 3 } }]);
        res.json(milkProducts);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm sữa:', error.message);
        res.status(500).json({ message: "Lỗi máy chủ" });
    }
};
