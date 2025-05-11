import React, { useRef, useState } from 'react';
import '../../components/css/Footer.css';
import { toast } from 'react-toastify';

export const Footer = () => {
  const formSend = useRef();
  const [form, setForm] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm({
      user_name: '',
      user_email: '',
      message: ''
    });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (form.user_name.length < 5) {
      toast.error('Tên phải có ít nhất 5 ký tự');
      return;
    }
    if (!validateEmail(form.user_email)) {
      toast.error('Vui lòng nhập email hợp lệ');
      return;
    }
    if (form.message.length < 3) {
      toast.error('Lời nhắn phải có ít nhất 3 ký tự');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/change-password/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Email đã được gửi thành công!');
        resetForm();
      } else {
        toast.error(data.error || 'Gửi email thất bại');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Lỗi kết nối đến server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-info'>
          <h2 className='footer-title'>Mẹ Bầu và Bé</h2>
          <p className='footer-description'>
            Chúng tôi cung cấp các sản phẩm sữa chất lượng cao cho mẹ bầu và em bé. Luôn luôn vì sức khỏe của bạn và gia
            đình.
          </p>
          <div className='contact-info'>
            <p>
              <i className='phone-icon'></i> 123-456-789
            </p>
            <p>
              <i className='email-icon'></i> info@sua.com
            </p>
          </div>
          <div className='social-links'>
            <a href='#' aria-label='Facebook'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='#' aria-label='Instagram'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='#' aria-label='Twitter'>
              <i className='fab fa-twitter'></i>
            </a>
          </div>
        </div>

        <div className='footer-contact'>
          <h2 className='contact-title'>Liên hệ chúng tôi</h2>
          <form ref={formSend} onSubmit={sendEmail} className='contact-form'>
            <div className='form-group'>
              <input
                type='text'
                name='user_name'
                placeholder='Họ và tên'
                value={form.user_name}
                onChange={handleChange}
                required
                autoComplete='name'
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                name='user_email'
                placeholder='Email của bạn'
                value={form.user_email}
                onChange={handleChange}
                required
                autoComplete='email'
              />
            </div>
            <div className='form-group'>
              <textarea
                name='message'
                placeholder='Lời nhắn'
                value={form.message}
                onChange={handleChange}
                required
                rows='4'
              ></textarea>
            </div>
            <div className='send-btn'>
              <button type='submit' disabled={isLoading}>
                {isLoading ? 'Đang gửi...' : 'Gửi'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='footer-bottom'>© 2024 Mẹ Bầu và Bé - All Rights Reserved</div>
    </footer>
  );
};
