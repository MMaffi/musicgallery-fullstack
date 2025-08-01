import './styles/navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">MUSIC <span>GALLERY</span></div>
      <nav>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Vídeos</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Sugestões</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;