import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import '../../css/ProductReview.css'; // Import CSS file
import { toast } from 'react-toastify';

const ProductReview = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load comments from server when component is mounted
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error.message);
    }
  };

  const handleAddComment = async (newComment) => {
    if (newComment.text.trim() === '') return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      // Thêm bình luận mới vào danh sách hiển thị
      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      toast.success('Thêm bình luận thành công!');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div className='product-review-container'>
      <h2 className='review-heading'>Đánh giá của khách hàng</h2>
      <div className='comment-form'>
        <CommentForm onSubmit={handleAddComment} />
      </div>
      <div className='comment-list'>
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default ProductReview;
