import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../css/Cart.css';
import { toast } from 'react-toastify';

const Cart = () => {
  const { isLoggedIn, cart, setCart } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      try {
        let userId = localStorage.getItem('userId');
        if (!userId || userId.length !== 24) {
          console.error('Invalid userId:', userId);
          setCart([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/cart/${userId}`);
        setCart(response.data || []);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Unable to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, setCart]);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const confirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng không?');
      if (!confirmed) return;

      setUpdating(true);
      await axios.delete(`http://localhost:4000/api/cart/${cartItemId}`);

      setCart((prevCart) => prevCart.filter((item) => item._id !== cartItemId));
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError('Failed to remove item from cart');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdating(true);
      const response = await axios.put(`http://localhost:4000/api/cart/${cartItemId}`, { quantity: newQuantity });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === cartItemId ? { ...item, quantity: response.data.cartItem.quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!isLoggedIn) return <p>Vui lòng đăng nhập để xem giỏ hàng của bạn</p>;
  // Giỏ hàng sẽ tính tổng số lượng sản phẩm
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className='cart-container'>
      <h2>Giỏ hàng ({totalQuantity} sản phẩm)</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <div>
          {cart.map((item) => {
            const product = item.productId || {};
            const price = product.price || 0;
            const quantity = item.quantity || 1;
            const totalItemPrice = price * quantity;

            return (
              <div key={item._id} className='cart-item'>
                <div className='item-details'>
                  {product.image && <img src={product.image} alt={product.name || 'Sản phẩm'} />}
                  <div className='item-info'>
                    <h3>{product.name || 'Không có tên'}</h3>
                    <p>Giá: {price.toLocaleString()} VNĐ</p>
                    <p>
                      Số lượng:
                      <button
                        onClick={() => handleUpdateQuantity(item._id, quantity - 1)}
                        disabled={quantity <= 1 || updating}
                      >
                        -
                      </button>
                      {quantity}
                      <button onClick={() => handleUpdateQuantity(item._id, quantity + 1)} disabled={updating}>
                        +
                      </button>
                    </p>
                    <p className='item-total'>Tổng: {totalItemPrice.toLocaleString()} VNĐ</p>
                    <button onClick={() => handleRemoveFromCart(item._id)} disabled={updating}>
                      Xóa khỏi giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <p className='total'>
            Tổng cộng:{' '}
            {cart.reduce((total, item) => total + (item.productId?.price || 0) * item.quantity, 0).toLocaleString()} VNĐ
          </p>
          <button className='btn checkout-button' disabled={updating}>
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
