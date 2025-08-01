import React from 'react';
import '../styles/style.css';

function Navbar() {
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
        <div className="search-wrapper">
          <button id="searchToggle" className="search-icon">🔍</button>
          <input type="text" id="searchInput" placeholder="Buscar..." autoComplete="off" spellCheck="false" />
          <div id="suggestions"></div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;