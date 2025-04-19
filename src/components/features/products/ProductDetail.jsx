import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/ProductDetail.css';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToCartHandler = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
        return;
      }

      // Confirm before adding to cart
      const confirmed = window.confirm('Bạn có muốn thêm sản phẩm này vào giỏ hàng không?');
      if (!confirmed) return;

      await axios.post('http://localhost:4000/api/cart/add', {
        userId,
        productId
      });
      toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Đã xảy ra lỗi khi thêm vào giỏ hàng.');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productUrl = `http://localhost:4000/api/products/${id}`;
        const response = await axios.get(productUrl);
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        toast.error('Không thể tải sản phẩm!');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className='product-detail-container loading'>
        <div className='loader'></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='product-detail-container error'>
        <p>Không tìm thấy sản phẩm!</p>
        <Link to='/' className='back-button'>
          ← Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Format price with commas for better readability
  const formattedPrice = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <div className='product-detail-page'>
      <Link to='/' className='back-button'>
        ← Quay lại trang chủ
      </Link>

      <div className='product-detail-container'>
        <div className='product-detail-image-container'>
          <img className='product-detail-image' src={product.image} alt={product.name} />
        </div>

        <div className='product-detail-info'>
          <h1 className='product-name'>{product.name}</h1>
          <div className='product-meta'>
            <p className='product-weight'>
              <strong>Trọng lượng:</strong> {product.weight}
            </p>
            <p className='product-price'>
              <strong>Giá:</strong> {formattedPrice}
            </p>
          </div>
          <div className='product-description'>
            <h3>Thông tin sản phẩm</h3>
            <p>{product.info}</p>
          </div>
          <button className='add-to-cart-button' onClick={() => addToCartHandler(product._id)}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
