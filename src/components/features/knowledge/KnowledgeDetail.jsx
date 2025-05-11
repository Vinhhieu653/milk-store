import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../css/KnowledgeDetail.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const KnowledgeDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [milkProducts, setMilkProducts] = useState([]);
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const [articleResponse, productsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/knowledge/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/milk-products`)
        ]);

        setArticle(articleResponse.data);
        setMilkProducts(productsResponse.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        toast.error('Không thể tải dữ liệu bài viết!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className='knowledge-detail-container loading'>
        <div className='loader'></div>
        <p>Đang tải bài viết...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className='knowledge-detail-container error'>
        <p>Không tìm thấy bài viết!</p>
        <Link to='/knowledge' className='back-button'>
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Format price
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  // Format content for better readability
  const formatContent = (content) => {
    // Phân đoạn nội dung nếu không có xuống dòng
    if (!content.includes('\n')) {
      // Chia nội dung thành các câu (kết thúc bằng dấu chấm, hỏi, than...)
      const sentences = content.split(/(?<=[.!?])\s+/);
      // Nhóm câu thành đoạn, mỗi đoạn có khoảng 2-3 câu
      const paragraphs = [];
      for (let i = 0; i < sentences.length; i += 3) {
        paragraphs.push(sentences.slice(i, i + 3).join(' '));
      }
      return paragraphs;
    }
    // Nếu đã có xuống dòng, giữ nguyên định dạng
    return content.split('\n');
  };

  const contentParagraphs = formatContent(article.content);

  return (
    <div className='knowledge-page'>
      <Link to='/knowledge' className='back-button'>
        ← Quay lại danh sách bài viết
      </Link>

      <div className='knowledge-detail-container'>
        <article className='knowledge-article'>
          <h1 className='knowledge-detail-title'>{article.title}</h1>
          <div className='knowledge-detail-date'>Đăng ngày: {formatDate(article.date)}</div>
          <div className='knowledge-detail-content'>
            {contentParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className='milk-products-section'>
          <h2 className='section-title'>Sản phẩm sữa gợi ý</h2>
          <div className='milk-products-grid'>
            {milkProducts.map((product) => (
              <div key={product._id} className='milk-product-card'>
                <div className='product-image-container'>
                  <Link to={`/products/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
                <div className='product-info'>
                  <h3 className='product-name'>{product.name}</h3>
                  <p className='product-price'>{formatPrice(product.price)}</p>
                  <button className='add-to-cart-button' onClick={() => addToCartHandler(product._id)}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KnowledgeDetail;
