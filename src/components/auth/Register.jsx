import { useState, React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;

    if (username.trim().length < 5) {
      toast.error('Họ và tên phải từ 5 ký tự trở lên');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email không đúng định dạng');
      return false;
    }

    if (password.trim().length < 3) {
      toast.error('Mật khẩu phải từ 3 ký tự trở lên');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Đăng ký thành công');
        navigate('/login');
      } else {
        toast.error(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className='register-container'>
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <div className='form-group'>
          <label>Họ và tên</label>
          <input type='text' name='username' value={formData.username} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label>Mật khẩu</label>
          <input type='password' name='password' value={formData.password} onChange={handleChange} required />
        </div>
        <button type='submit' className='btn register-btn'>
          Đăng ký
        </button>
      </form>

      <div className='login-link'>
        <span>Bạn đã có tài khoản? </span>
        <Link to='/login'>Đăng nhập</Link>
      </div>
    </div>
  );
};

export default Register;
