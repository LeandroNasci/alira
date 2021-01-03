import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const DesktopNavbar: React.FC = () => {
  return (
    <nav id="desktop-navbar">
      <div className="nav-bar-container">
        {/* <Link to="/">Menu</Link> */}
        <Link to="/">Início</Link>

        <Link to="/?type=bloquinho">Bloquinhos</Link>
        <Link to="/?type=caderno">Cadernos</Link>
        <Link to="/?type=post-it">Post-its</Link>
        <Link to="/?type=caneta">Canetas</Link>
        <Link to="/?type=prendedor">Prendedores</Link>

        <Link to="/about">Quem Somos</Link>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
