import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsLoggedIn(true);
      setUser({ id: userId }); // Nếu sau này có API user, có thể fetch thêm thông tin
    }

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // 🔥 Tự động lưu `cart` vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const clearStorage = () => {
    ['token', 'userId', 'cart'].forEach((key) => localStorage.removeItem(key));
  };

  const logout = () => {
    clearStorage();
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, cart, setCart }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
