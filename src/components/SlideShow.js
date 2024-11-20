import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/SlideShow.css';
import Products from './Products'; // Import component Products

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/img/banner1.webp',
        '/img/banner2.webp',
        '/img/banner3.webp',
        '/img/banner4.webp',
        '/img/banner5.webp'
    ];
    const intervalRef = useRef(null); // Dùng ref để quản lý interval

    useEffect(() => {
        // Thiết lập interval để tự động chuyển slide
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalRef.current); // Xóa interval khi unmount
    }, [slides.length]);

    const handleDotClick = useCallback((index) => {
        clearInterval(intervalRef.current); // Dừng chuyển động tự động khi click
        setCurrentSlide(index);
    }, []);

    return (
        <div className="slideshow-container">
            <div className="slideshow">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={index === currentSlide ? 'slide active' : 'slide'}
                        style={{ backgroundImage: `url(${index === currentSlide ? slide : ''})` }}
                    ></div>
                ))}
                <div className="pagination">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={index === currentSlide ? 'dot active' : 'dot'}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>
            <div><Products /></div>
        </div>
    );
};

export default SlideShow;
