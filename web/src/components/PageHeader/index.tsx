import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLogIn, FiShoppingCart } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';
import notesImg from '../../assets/images/notes.png';

import './styles.css';

interface PageHeaderProps {
  back?: boolean;
  compact?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

   return (
    <header>
      <div className="top-bar-container">
        {props.back
          ?<Link to="/"><FiArrowLeft /><span> Voltar</span></Link>
          :<span />
        }
        {props.compact
          ? <div className="top-bar-session"></div>
          : <div className="top-bar-session">
              {props.children}
              <Link to="/cart">
                <span>Carrinho </span>
                <FiShoppingCart />
              </Link>
              <Link to="/login">
                <span>Login </span>
                <FiLogIn />
              </Link>
            </div>
        }
      </div>

      <div className="header-content">
        {props.compact
          ?<img src="" alt=""/>
          :<img src={notesImg} alt="postite"/>
        }

        <div className="logo-container">
          <h2>Sua vida mais planejada com fofuras</h2>
          <img src={logoImg} alt="Alira Notes"/>
        </div>
      </div>

      {props.compact
        ? <nav className="nav-bar-container"></nav>
        : <nav className="nav-bar-container">
            <Link to="/">Início</Link>

            <Link to="/?type=bloquinhos">Bloquinhos</Link>
            <Link to="/?type=cadernos">Cadernos</Link>
            <Link to="/?type=marcadores">Marcadores</Link>

            <Link to="/about">Quem Somos</Link>
          </nav>
      }
    </header>
  );
}

export default PageHeader;
