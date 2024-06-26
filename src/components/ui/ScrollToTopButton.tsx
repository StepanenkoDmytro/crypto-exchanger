import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import Arrow from './form-controls/Arrow';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button 
            className={`scroll-to-top ${isVisible ? 'show' : ''}`} 
            onClick={scrollToTop}
        >
            {/* <div className='scroll-arrow-container'>
                <div className='scroll-arrow-up'></div>
                <div className='scroll-arrow-down'></div>
            </div> */}
            <div className='scroll-arrow-container'><Arrow direction='up' color='var(--onsurface)' width={20}/></div>
        </button>
    );
};

export default ScrollToTopButton;
