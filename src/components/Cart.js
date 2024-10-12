import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authentication/AuthContext';

const Cart = () => {
    const { isLoggedIn, cart, setCart } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItemsWithDetails, setCartItemsWithDetails] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    setCart([]);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:4000/cart/${userId}`);
                setCart(response.data);
                setLoading(false);

                // Lấy chi tiết sản phẩm từ productId trong cart
                const promises = response.data.map(async (item) => {
                    try {
                        const productResponse = await axios.get(`http://localhost:4000/products/${item.productId}`);
                        return { productId: productResponse.data, quantity: item.quantity };
                    } catch (error) {
                        console.error(`Error fetching product details for productId ${item.productId}:`, error);
                        return { productId: null, quantity: item.quantity }; // Xử lý lỗi nếu cần
                    }
                });

                const cartItemsWithDetails = await Promise.all(promises);
                setCartItemsWithDetails(cartItemsWithDetails);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Unable to fetch cart items');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [isLoggedIn, setCart]);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            const confirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?');
            if (!confirmed) return;

            await axios.delete(`http://localhost:4000/cart/delete/${cartItemId}`);
            setCart(prevItems => prevItems.filter(item => item._id !== cartItemId));
        } catch (error) {
            console.error('Error removing from cart:', error);
            setError('Failed to remove item from cart');
        }
    };

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        try {
            const response = await axios.put(`http://localhost:4000/cart/update/${cartItemId}`, { quantity: newQuantity });
            setCart(prevItems => prevItems.map(item =>
                item._id === cartItemId ? { ...item, quantity: response.data.quantity } : item
            ));
        } catch (error) {
            console.error('Error updating quantity:', error);
            setError('Failed to update quantity');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!isLoggedIn) return <p>Vui lòng đăng nhập để xem giỏ hàng của bạn</p>;

    return (
        <div className="cart-container">
            <h2>Giỏ hàng</h2>
            {cartItemsWithDetails.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <div>
                    {cartItemsWithDetails.map(item => (
                        <div key={item.productId._id} className="cart-item">
                            <div className="item-details">
                                {item.productId.image && <img src={item.productId.image} alt={item.productId.name} />}
                                <div className="item-info">
                                    <h3>{item.productId.name}</h3>
                                    <p>Giá: ${item.productId.price}</p>
                                    <p>Số lượng:
                                        <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                        {item.quantity}
                                        <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                                    </p>
                                    <button onClick={() => handleRemoveFromCart(item.productId._id)}>Xóa khỏi giỏ hàng</button>
                                    <p>Thông tin chi tiết: {item.productId.info}</p>
                                    <p>Trọng lượng: {item.productId.weight}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="total">Tổng: ${cartItemsWithDetails.reduce((total, item) => total + (item.productId.price * item.quantity), 0).toFixed(2)}</p>
                    <button className="btn checkout-button">Thanh toán</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
