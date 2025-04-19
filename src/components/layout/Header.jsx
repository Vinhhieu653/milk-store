import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../components/css/Header.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [language, setLanguage] = useState(i18n.language || 'vi');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm(t('logout_confirm'));
    if (confirmed) {
      logout();
      toast.success(t('logout_success'));
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  return (
    <header className='site-header'>
      <div className='site-header__container'>
        <div className='site-header__logo'>
          <Link to='/' className='site-header__logo-link'>
            <img src='/img/logo.jpg' alt='Logo' className='site-header__logo-img' />
            <h1 className='site-header__title'>{t('site_title')}</h1>
          </Link>
        </div>

        <button
          className={`site-header__mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label='Toggle menu'
        >
          <span className='site-header__mobile-bar'></span>
          <span className='site-header__mobile-bar'></span>
          <span className='site-header__mobile-bar'></span>
        </button>

        <nav className={`site-header__nav ${mobileMenuOpen ? 'site-header__nav--open' : ''}`}>
          <ul className='site-header__menu'>
            <li className={`site-header__menu-item ${currentPath === '/' ? 'site-header__menu-item--active' : ''}`}>
              <Link to='/' className='site-header__menu-link'>
                {t('home')}
              </Link>
            </li>
            <li
              className={`site-header__menu-item ${currentPath === '/products' ? 'site-header__menu-item--active' : ''}`}
            >
              <Link to='/products' className='site-header__menu-link'>
                {t('products')}
              </Link>
            </li>
            <li
              className={`site-header__menu-item ${currentPath === '/knowledge' ? 'site-header__menu-item--active' : ''}`}
            >
              <Link to='/knowledge' className='site-header__menu-link'>
                {t('knowledge')}
              </Link>
            </li>
            <li
              className={`site-header__menu-item ${currentPath === '/about' ? 'site-header__menu-item--active' : ''}`}
            >
              <Link to='/about' className='site-header__menu-link'>
                {t('about')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className='site-header__actions'>
          <div className='site-header__language-selector' ref={langMenuRef}>
            <button
              className='site-header__button site-header__button--language'
              onClick={toggleLangMenu}
              aria-label={t('change_language')}
            >
              <span className='site-header__lang-icon'>
                {language === 'vi' ? (
                  <img src='/img/flag-vietnam.svg' alt='Tiếng Việt' className='site-header__flag-icon' />
                ) : (
                  <img src='/img/flag-usa.svg' alt='English' className='site-header__flag-icon' />
                )}
              </span>
              <span className='site-header__lang-text'>{language === 'vi' ? 'VI' : 'EN'}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='site-header__dropdown-arrow'
              >
                <polyline points='6 9 12 15 18 9'></polyline>
              </svg>
            </button>

            {langMenuOpen && (
              <div className='site-header__language-dropdown'>
                <button
                  className={`site-header__language-option ${language === 'vi' ? 'site-header__language-option--active' : ''}`}
                  onClick={() => toggleLanguage('vi')}
                >
                  <img src='/img/flag-vietnam.svg' alt='Tiếng Việt' className='site-header__flag-icon' />
                  <span>{t('vietnamese')}</span>
                </button>
                <button
                  className={`site-header__language-option ${language === 'en' ? 'site-header__language-option--active' : ''}`}
                  onClick={() => toggleLanguage('en')}
                >
                  <img src='/img/flag-usa.svg' alt='English' className='site-header__flag-icon' />
                  <span>{t('english')}</span>
                </button>
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <div className='site-header__auth-buttons'>
              <Link to='/login' className='site-header__button site-header__button--login'>
                {t('login')}
              </Link>
              <Link to='/register' className='site-header__button site-header__button--register'>
                {t('register')}
              </Link>
            </div>
          ) : (
            <div className='site-header__user-actions'>
              <Link to='/cart' className='site-header__cart' aria-label={t('shopping_cart')}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='9' cy='21' r='1'></circle>
                  <circle cx='20' cy='21' r='1'></circle>
                  <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
                </svg>
              </Link>

              <div className='site-header__user-profile'>
                <Link to='/profile' className='site-header__user'>
                  {user?.avatar ? (
                    <img src={user.avatar} alt='Avatar' className='site-header__avatar' />
                  ) : (
                    <div className='site-header__avatar-placeholder'>{user?.username?.charAt(0).toUpperCase()}</div>
                  )}
                </Link>

                <button className='site-header__button site-header__button--logout' onClick={handleLogout}>
                  {t('logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
