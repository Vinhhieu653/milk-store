import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Register.css';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset errors
        setNameError('');
        setEmailError('');
        setPasswordError('');

        // Validate inputs
        let isValid = true;

        if (name.length < 5) {
            setNameError('Họ và tên phải từ 5 ký tự trở lên');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Email không đúng định dạng');
            isValid = false;
        }

        if (password.length < 3) {
            setPasswordError('Mật khẩu phải từ 3 ký tự trở lên');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('http://localhost:4000/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success('Đăng ký thành công');
                    navigate('/login');
                } else {
                    toast.error(data.message || 'Đăng ký thất bại');
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra, vui lòng thử lại');
            }
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response;

            const res = await fetch('http://localhost:4000/users/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId: credential }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Đăng nhập thành công');
                navigate('/');
            } else {
                toast.error(data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google login failed:', error);
        toast.error('Đăng nhập bằng Google thất bại');
    };

    return (
        <div className="register-container">
            <h2>Đăng ký</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {nameError && <p className="error-message">{nameError}</p>}
                </div>
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
                <button type="submit" className="btn register-btn">Đăng ký</button>
            </form>
            <div className="google-login">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </div>
            <div className="login-link">
                <span>Bạn đã có tài khoản? </span>
                <Link to="/login">Đăng nhập</Link>
            </div>
        </div>
    );
};

export default Register;
