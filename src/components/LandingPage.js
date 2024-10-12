import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SlideShow from './SlideShow';
import { Header } from './Header';
import { Footer } from './Footer';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import About from '../components/About';
import Products from '../components/Products';
import Knowledge from '../components/Knowledge';
import KnowledgeDetail from './KnowledgeDetail';
import { AuthProvider } from './authentication/AuthContext';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import ChatComponent from './Chat/ChatComponent';



const LandingPage = () => {
    return (
        <div className="landing-page">
            <AuthProvider>
                <Router>
                    <Header />

                    <Routes>
                        <Route path='/' exact element={<SlideShow />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/knowledge" element={<Knowledge />} />
                        <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/chat' element={<ChatComponent />} />




                    </Routes>

                    <Footer />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default LandingPage;
