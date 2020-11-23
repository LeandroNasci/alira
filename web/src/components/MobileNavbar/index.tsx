import React, { useRef, useState } from 'react';
import { HamburgerButton } from 'react-hamburger-button';
import { Link } from 'react-router-dom';

import './styles.css';

const MobileNavbar: React.FC = () => {
  //Dropdown
  const [displayMenu,setDisplayMenu] = useState(false);

  function handleToggleMenu() {
    setDisplayMenu(!displayMenu);
  }

  return (
    <nav>
      <button type="button" onClick={handleToggleMenu} >
        <HamburgerButton
          open={displayMenu}
          onClick={handleToggleMenu}
          width={24}
          height={20}
          strokeWidth={1}
          color='#404040'
          animationDuration={0.5}
        />
        <h3>MENU</h3>
      </button>

      { displayMenu
        ? (
        <div className="nav-bar-container">
          <Link to="/">Início</Link>

          <Link to="/?type=bloquinhos">Bloquinhos</Link>
          <Link to="/?type=cadernos">Cadernos</Link>
          <Link to="/?type=post-its">Post-its</Link>
          <Link to="/?type=canetas">Canetas</Link>
          <Link to="/?type=prendedores">Prendedores</Link>
          <Link to="/?type=kits">Kits</Link>

          <Link to="/about">Quem Somos</Link>
        </div>
      )
      : (
        null
      )
      }

    </nav>
  );
}

export default MobileNavbar;
