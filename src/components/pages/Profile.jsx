import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Password visibility states
  const [passwordVisibility, setPasswordVisibility] = useState({
    old: false,
    new: false,
    confirm: false
  });

  // Hàm toggle visibility
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp!');
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Không có thông tin xác thực. Vui lòng đăng nhập lại.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:4000/api/users/change-password',
        { oldPassword, newPassword, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success(res.data.message || 'Đổi mật khẩu thành công!');
      oldPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
      confirmPasswordRef.current.value = '';
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Lỗi server!');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='profile-container'>
      <div className='profile-card'>
        <div className='profile-header'>
          <div className='profile-avatar'>
            {user?.avatar ? (
              <img src={user.avatar} alt='Avatar' />
            ) : (
              <div className='profile-avatar-placeholder'>
                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>

          <h2 className='profile-username'>{user?.name || 'Unknown User'}</h2>
          <p className='profile-email'>{user?.email || 'No email provided'}</p>


        </div>

        <form className='password-form' onSubmit={handleChangePassword}>
          <h3>Đổi mật khẩu</h3>

          {['old', 'new', 'confirm'].map((field, index) => (
            <div className='password-input-group' key={index}>
              <input
                type={passwordVisibility[field] ? 'text' : 'password'}
                placeholder={
                  field === 'old' ? 'Mật khẩu cũ' : field === 'new' ? 'Mật khẩu mới' : 'Nhập lại mật khẩu mới'
                }
                ref={field === 'old' ? oldPasswordRef : field === 'new' ? newPasswordRef : confirmPasswordRef}
                required
              />
              <button
                type='button'
                className='password-toggle'
                onClick={() => togglePasswordVisibility(field)}
                aria-label={passwordVisibility[field] ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {passwordVisibility[field] ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          ))}

          <button type='submit' className='submit-button' disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </button>
        </form>

        <button className='profile-back' onClick={() => navigate('/')}>
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default Profile;
