import React, { useState } from 'react';
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

          <Link to="/?type=bloquinho" onClick={handleToggleMenu} >Bloquinhos</Link>
          <Link to="/?type=caderno" onClick={handleToggleMenu}>Cadernos</Link>
          <Link to="/?type=post-it" onClick={handleToggleMenu}>Post-its</Link>
          <Link to="/?type=caneta" onClick={handleToggleMenu}>Canetas</Link>
          <Link to="/?type=prendedor" onClick={handleToggleMenu}>Prendedores</Link>
          <Link to="/?type=kit" onClick={handleToggleMenu}>Kits</Link>

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
