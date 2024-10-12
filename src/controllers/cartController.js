const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cartItem = await CartItem.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = new CartItem({ userId, productId, quantity: 1 });
        }

        await cartItem.save();
        res.status(201).json({ message: "Added product to cart", cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await CartItem.find({ userId }).populate('productId');
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        res.status(500).json({ message: "Server error" });
    }
};
