import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/ProductDetail.css';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const addToCartHandler = async (productId) => {
        try {
            const userId = localStorage.getItem('userId');

            // Confirm before adding to cart
            const confirmed = window.confirm('Bạn có muốn thêm sản phẩm này vào giỏ hàng không?');
            if (!confirmed) return;

            const response = await axios.post('http://localhost:4000/cart/add', {
                userId,
                productId
            });
            toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!');

        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="product-detail-container">Đang tải...</div>;
    }

    return (
        <div className="product-detail-container">
            <img className="product-detail-image" src={product.image} alt={product.name} />
            <div className="product-detail-info">
                <h1>{product.name}</h1>
                <p><strong>Trọng lượng:</strong> {product.weight}</p>
                <p><strong>Giá:</strong> {product.price}</p>
                <p><strong>Thông tin cơ bản:</strong> {product.info}</p>
                <button onClick={() => addToCartHandler(product._id)}>Thêm vào giỏ hàng</button>

            </div>
        </div>
    );
}

export default ProductDetail;
