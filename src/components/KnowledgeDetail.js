import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/KnowledgeDetail.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const KnowledgeDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [milkProducts, setMilkProducts] = useState([]);

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
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/knowledge/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu bài viết:', error);
            }
        };

        const fetchMilkProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/milk-products`);
                setMilkProducts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm sữa:', error);
            }
        };

        fetchArticle();
        fetchMilkProducts();
    }, [id]);

    if (!article) {
        return <div className="knowledge-detail-container">Đang tải...</div>;
    }

    return (
        <div className="knowledge-detail-container">
            <h1 className="knowledge-detail-title">{article.title}</h1>
            <p className="knowledge-detail-content">{article.content}</p>
            <p className="knowledge-detail-date">{article.date}</p>

            <div className="milk-products">
                <h2>Sản phẩm sữa gợi ý</h2>
                <div>
                    {milkProducts.map(product => (
                        <div key={product._id} className="milk-product">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Giá: {product.price}</p>
                            <button onClick={() => addToCartHandler(product._id)}>Thêm vào giỏ hàng</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default KnowledgeDetail;
