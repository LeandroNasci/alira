import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const DesktopNavbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-bar-container">
        {/* <Link to="/">Menu</Link> */}
        <Link to="/">Início</Link>

        <Link to="/?type=bloquinhos">Bloquinhos</Link>
        <Link to="/?type=cadernos">Cadernos</Link>
        <Link to="/?type=post-its">Post-its</Link>
        <Link to="/?type=canetas">Canetas</Link>
        <Link to="/?type=prendedores">Prendedores</Link>
        <Link to="/?type=kits">Kits</Link>

        <Link to="/about">Quem Somos</Link>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
