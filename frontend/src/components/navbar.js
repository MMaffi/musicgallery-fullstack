import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/style.css';

function Navbar({ title = "Music Gallery", subtitle }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    }
    function handleEsc(event) {
      if (event.key === 'Escape') setShowInput(false);
    }
    if (showInput) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showInput]);

  return (
    <header>
      <div className="header-left">
        <h1>
          {title}
          {subtitle && (
            <>
              <span className="separator"> | </span>
              <span className="navbar-subtitle">{subtitle}</span>
            </>
          )}
        </h1>
      </div>
      <div className="header-right">
        <nav className="menu">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.home')}
          </NavLink>
          {' | '}
          <NavLink to="/videos" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.videos')}
          </NavLink>
          {' | '}
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.about')}
          </NavLink>
          {' | '}
          <NavLink to="/suggestions" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.suggestions')}
          </NavLink>
        </nav>
        <div className="search-wrapper" ref={inputRef}>
          <button
            id="searchToggle"
            className="search-icon"
            onClick={() => setShowInput((v) => !v)}
            aria-label={t('navbar.search_aria_label')}
          >
            🔍
          </button>
          {showInput && (
            <input
              type="text"
              id="searchInput"
              placeholder={t('navbar.search_placeholder')}
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          )}
          <div id="suggestions"></div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;