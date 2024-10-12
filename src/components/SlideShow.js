import React, { useState, useEffect } from 'react';
import './css/SlideShow.css';
import Products from './Products'; // Import component Products


const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        '/img/banner1.jpg',
        '/img/banner2.jpg',
        '/img/banner3.jpg',
        '/img/banner4.jpg',
        '/img/banner5.jpg'
    ];

    useEffect(() => {
        // Thiết lập interval để tự động chuyển slide mỗi 5 giây
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="slideshow-container">
            <div className="slideshow">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={index === currentSlide ? 'slide active' : 'slide'}
                        style={{ backgroundImage: `url(${slide})` }}
                    ></div>
                ))}
                <div className="pagination">
                    {slides.map((slide, index) => (
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
}

export default SlideShow;
