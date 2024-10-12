import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Products.css';
import ProductReview from './Comment/ProductReview';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Unable to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = event => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    };

    const addToCartHandler = async (productId) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {

                alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
                return;
            }
            const confirmed = window.confirm('Bạn có muốn thêm sản phẩm này vào giỏ hàng không?');
            if (!confirmed) return;

            const response = await axios.post('http://localhost:4000/cart/add', {
                userId,
                productId
            });

            // Update local state
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === productId ? { ...product, addedToCart: true } : product
                )
            );

            toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Thêm sản phẩm vào giỏ hàng thất bại!');
        }
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="products-container">
            <h2>Các sản phẩm sữa</h2>
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="products-list">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                        </Link>
                        <p><strong>Giá:</strong> {product.price}</p>
                        {product.addedToCart ? (
                            <button disabled>Đã thêm vào giỏ hàng</button>
                        ) : (
                            <button onClick={() => addToCartHandler(product._id)}>Thêm vào giỏ hàng</button>
                        )}
                    </div>
                ))}
            </div>
            <div><ProductReview /></div>
        </div>
    );
};

export default Products;
