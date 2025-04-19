import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlideShow from '../layout/SlideShow';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import Login from '../auth/Login';
import Register from '../auth/Register';
import About from './About';
import Products from '../features/products/Products';
import Knowledge from '../features/knowledge/Knowledge';
import KnowledgeDetail from '../features/knowledge/KnowledgeDetail';
import { AuthProvider } from '../context/AuthContext';
import ProductDetail from '../features/products/ProductDetail';
import Cart from '../features/products/Cart';
import Profile from './Profile';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <AuthProvider>
        <Router>
          <Header />

          <Routes>
            <Route path='/' exact element={<SlideShow />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/knowledge' element={<Knowledge />} />
            <Route path='/knowledge/:id' element={<KnowledgeDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>

          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default LandingPage;
