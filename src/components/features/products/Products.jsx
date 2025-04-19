import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductReview from '../comment/ProductReview';
import '../../css/Products.css'; // Make sure the path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const addToCartHandler = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
        return;
      }
      const confirmed = window.confirm('Bạn có muốn thêm sản phẩm này vào giỏ hàng không?');
      if (!confirmed) return;

      await axios.post('http://localhost:4000/api/cart/add', {
        userId,
        productId
      });

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? { ...product, addedToCart: true } : product))
      );

      toast.success('Đã thêm sản phẩm vào giỏ hàng thành công!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Thêm sản phẩm vào giỏ hàng thất bại!');
    }
  };

  if (loading)
    return (
      <div className='loading-spinner'>
        <div className='spinner'></div>
      </div>
    );

  if (error)
    return (
      <div className='error-message'>
        <strong>Lỗi!</strong> {error}
      </div>
    );

  return (
    <div className='products-container'>
      <h2>Các sản phẩm sữa</h2>

      <div className='search-container'>
        <input type='text' placeholder='Tìm kiếm sản phẩm...' value={searchTerm} onChange={handleSearch} />
      </div>

      {filteredProducts.length === 0 ? (
        <div className='empty-message'>Không tìm thấy sản phẩm phù hợp.</div>
      ) : (
        <div className='products-list'>
          {filteredProducts.map((product) => (
            <div key={product.id} className='product-card'>
              <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </Link>

              <div className='content'>
                <Link style={{ textDecoration: 'none' }} to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>

                <p className='price'>{product.price} VNĐ</p>

                {product.addedToCart ? (
                  <button disabled>Đã thêm vào giỏ hàng</button>
                ) : (
                  <button onClick={() => addToCartHandler(product._id)}>Thêm vào giỏ hàng</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='reviews-section'>
        <ProductReview />
      </div>
    </div>
  );
};

export default Products;
