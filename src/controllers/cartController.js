const CartItem = require("../models/CartItem");
const mongoose = require("mongoose");

// Thêm sản phẩm vào giỏ hàng
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

exports.getCartByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const cartItems = await CartItem.find({ userId }).populate({
            path: "productId",
            model: "Milk" // Trùng với model sản phẩm
        });

        res.status(200).json(cartItems);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: err.message });
    }
};



// Lấy danh sách giỏ hàng theo user_id
exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate("milk_id"); // Lấy tất cả + populate milk_id

        res.status(200).json(cartItems);
    } catch (err) {
        console.error("❌ Error fetching all cart items:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.params;
        const { quantity } = req.body;

        console.log("🔹 Received request to update cart item:", cart_item_id, "with quantity:", quantity);

        if (!quantity || typeof quantity !== "number" || quantity <= 0) {
            console.error("❌ Invalid quantity:", quantity);
            return res.status(400).json({ message: "Quantity must be a number greater than 0" });
        }

        const cartItem = await CartItem.findByIdAndUpdate(
            cart_item_id,
            { quantity },
            { new: true, runValidators: true }
        );

        if (!cartItem) {
            console.error("❌ CartItem not found:", cart_item_id);
            return res.status(404).json({ message: "CartItem not found" });
        }

        console.log("✅ Updated cart item successfully:", cartItem);
        return res.status(200).json({ message: "CartItem updated", cartItem });
    } catch (err) {
        console.error("🔥 Server error:", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


// Xóa một mục khỏi giỏ hàng
exports.removeCartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.params;

        const cartItem = await CartItem.findByIdAndDelete(cart_item_id);

        if (!cartItem) {
            return res.status(404).json({ message: "CartItem not found" });
        }

        return res.status(200).json({ message: "CartItem removed" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Xóa toàn bộ giỏ hàng của một user
exports.clearCart = async (req, res) => {
    try {
        const { user_id } = req.params;

        const deletedItems = await CartItem.deleteMany({ user_id });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({ message: "No cart items found for this user" });
        }

        return res.status(200).json({ message: "Cart cleared" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};