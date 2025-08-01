import React, { useRef, useState, useEffect } from 'react';
import '../styles/style.css';

function Navbar() {
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
        <h1>Music Gallery</h1>
        <p className="tagline">Assista covers de músicas incríveis com visuais únicos.</p>
      </div>
      <div className="header-right">
        <nav className="menu">
          <a href="/">Início</a> | <a href="/videos">Vídeos</a> | <a href="/sobre">Sobre</a> | <a href="/sugestoes">Sugestões</a>
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