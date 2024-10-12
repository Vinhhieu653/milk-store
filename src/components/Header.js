import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../components/css/Header.css';
import { useAuth } from '../components/authentication/AuthContext';

export const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <img src="/img/logo.jpg" alt="Logo" />
                    <h1><Link to="/" style={{ textDecoration: 'none' }}>Mẹ Bầu và Bé</Link></h1>
                </div>
                <nav className="nav">
                    <ul>
                        <li className={currentPath === '/' ? 'active' : ''}><Link to="/">Trang chủ</Link></li>
                        <li className={currentPath === '/products' ? 'active' : ''}><Link to="/products">Sản phẩm</Link></li>
                        <li className={currentPath === '/knowledge' ? 'active' : ''}><Link to="/knowledge">Kiến thức</Link></li>
                        <li className={currentPath === '/about' ? 'active' : ''}><Link to="/about">Giới thiệu</Link></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none' }} className="btn login">Đăng nhập</Link>
                            <Link to="/register" style={{ textDecoration: 'none' }} className="btn register">Đăng ký</Link>
                            <Link to="/cart" style={{ textDecoration: 'none' }}>
                                <img src="/img/cart_icon.jpg" alt="Cart" className="cart-icon" />
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <button className="btn logout" onClick={handleLogout}>Đăng xuất</button>
                            <Link to='/cart' style={{ textDecoration: 'none' }}>
                                <img src="/img/cart_icon.jpg" alt="Cart" className="cart-icon" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
