import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { toast } from 'react-toastify';
import { useAuth } from '../authentication/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setPasswordError('');

        // Validate inputs
        if (!email) {
            setEmailError('Email không được để trống');
            return;
        }
        if (!password) {
            setPasswordError('Mật khẩu không được để trống');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Đăng nhập thành công');
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                login();  // Cập nhật trạng thái đăng nhập
                navigate('/');
            } else {
                if (data.message === "User not found") {
                    setEmailError('Email không tồn tại');
                } else if (data.message === "Invalid credentials") {
                    setPasswordError('Mật khẩu không chính xác');
                } else {
                    toast.error(data.message || 'Đăng nhập thất bại');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <button type="submit" className="btn login-btn">Đăng nhập</button>
            </form>
            <div className="register-link">
                <span>Bạn chưa có tài khoản? </span>
                <Link to="/register">Đăng ký</Link>
            </div>
        </div>
    );
};

export default Login;