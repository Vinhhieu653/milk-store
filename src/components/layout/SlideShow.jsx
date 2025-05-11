import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../css/SlideShow.css';
import Products from '../features/products/Products';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const slides = useMemo(
    () => ['/img/banner1.webp', '/img/banner2.webp', '/img/banner3.webp', '/img/banner4.webp', '/img/banner5.webp'],
    []
  );

  const intervalRef = useRef(null);

  const startSlideshow = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  const stopSlideshow = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const promises = slides.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
      });

      try {
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    preloadImages();

    if (!isHovered && !isLoading) {
      startSlideshow();
    }

    return () => stopSlideshow();
  }, [isHovered, isLoading, slides, startSlideshow, stopSlideshow]);

  const handleDotClick = useCallback(
    (index) => {
      stopSlideshow();
      setCurrentSlide(index);
      if (!isHovered) startSlideshow();
    },
    [isHovered, startSlideshow, stopSlideshow]
  );

  const handleArrowClick = useCallback(
    (direction) => {
      stopSlideshow();
      if (direction === 'next') {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      } else {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
      }
      if (!isHovered) startSlideshow();
    },
    [slides.length, isHovered, startSlideshow, stopSlideshow]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopSlideshow();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isLoading) startSlideshow();
  };

  return (
    <div className='slideshow-wrapper'>
      <div className='slideshow' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isLoading ? (
          <div className='slideshow-loading'>Đang tải...</div>
        ) : (
          <>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slideshow-slide ${index === currentSlide ? 'slideshow-slide--active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
                aria-hidden={index !== currentSlide}
              ></div>
            ))}

            <button
              className='slideshow-arrow slideshow-arrow--left'
              onClick={() => handleArrowClick('prev')}
              aria-label='Previous slide'
            >
              ❮
            </button>

            <button
              className='slideshow-arrow slideshow-arrow--right'
              onClick={() => handleArrowClick('next')}
              aria-label='Next slide'
            >
              ❯
            </button>

            <div className='slideshow-indicators'>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slideshow-indicator ${index === currentSlide ? 'slideshow-indicator--active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : 'false'}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className='product-section'>
        <Products />
      </div>
    </div>
  );
};

export default SlideShow;
