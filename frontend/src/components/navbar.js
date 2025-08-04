import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import '../styles/style.css';

function Navbar({ title = "Music Gallery", videos = [] }) {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q')?.trim();

  const fuse = new Fuse(videos, {
    keys: ['title', 'description'],
    threshold: 0.3,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
        setQuery('');
        setResults([]);
      }
    }
    function handleEsc(event) {
      if (event.key === 'Escape') {
        setShowInput(false);
        setQuery('');
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }
    const matches = fuse.search(value).map(res => res.item);
    setResults(matches);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/videos?q=${encodeURIComponent(query.trim())}`);
      setShowInput(false);
      setQuery('');
      setResults([]);
    }
  };

  // Mapa de subtitles usando traduções
  const subtitlesMap = {
    '/': '',
    '/videos': t('navbar.videos'),
    '/about': t('navbar.about'),
    '/suggestions': t('navbar.suggestions'),
  };

  // subtitle final, com tradução e parâmetro q
  let subtitle = subtitlesMap[pathname] || '';
  if (pathname === '/videos' && q) {
    subtitle = t('navbar.results_for', { query: q });
  }

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
            <>
              <input
                type="text"
                id="searchInput"
                placeholder={t('navbar.search_placeholder')}
                autoComplete="off"
                spellCheck="false"
                autoFocus
                value={query}
                onChange={handleInput}
                onKeyDown={handleSearchSubmit}
              />
              {results.length > 0 && (
                <div id="suggestions">
                  {results.slice(0, 5).map(video => (
                    <div
                      key={video.id}
                      className="suggestion-item"
                      onClick={() => {
                        navigate(`/videos?q=${encodeURIComponent(video.title)}`);
                        setShowInput(false);
                        setQuery('');
                        setResults([]);
                      }}
                    >
                      {video.title}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;