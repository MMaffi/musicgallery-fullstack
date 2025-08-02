import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

function Navbar({ title = "Music Gallery", subtitle }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

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
          <Link to="/">Início</Link> | <Link to="/videos">Vídeos</Link> | <Link to="/sobre">Sobre</Link> | <a href="/sugestoes">Sugestões</a>
        </nav>
        <div className="search-wrapper" ref={inputRef}>
          <button
            id="searchToggle"
            className="search-icon"
            onClick={() => setShowInput((v) => !v)}
            aria-label="Buscar"
          >
            🔍
          </button>
          {showInput && (
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar..."
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