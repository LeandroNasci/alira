import React from 'react';
import { FiLogIn, FiShoppingCart } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';
import notesImg from '../../assets/images/notes.png';
import bannerImg from '../../assets/images/banner.png';

import facebookIcon from '../../assets/images/icons/facebook.svg';
import intagramIcon from '../../assets/images/icons/instagram.svg';

import './styles.css';

function Home() {
  return (
    <div id="page-home" className="container">
      <div className="top-bar-container">
          <span />
          <div className="top-bar-session">
            <a href="http://localhost:3000/">Carrinho <FiShoppingCart /></a>
            <a href="http://localhost:3000/">Login <FiLogIn /></a>
          </div>
        </div>
        <header className="page-header">


          <img src={notesImg} alt="postite"/>
          <div className="logo-container">
            <h2>Sua vida mais planejada com fofuras</h2>
            <img src={logoImg} alt="Alira Notes"/>
          </div>


        </header>
      <nav className="nav-bar-container">
          <a href="http://localhost:3000/">Início</a>
          <a href="http://localhost:3000/">Bloquinhos</a>
          <a href="http://localhost:3000/">Cadernos</a>
          <a href="http://localhost:3000/">Adesivos</a>
          <a href="http://localhost:3000/">Quem Somos</a>
        </nav>
      <div className="banner">
        <img src={bannerImg} alt="banner"/>
      </div>
      <h1>PRODUTOS</h1>
      <div id="page-home-content">

        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>
        <table><tr><td>Produto</td></tr></table>

      </div>
      <footer id="footer">
        <div className="upper-footer">
          <div className="links">
            <a href="http://localhost:3000/">Quem Somos</a>
            <a href="http://localhost:3000/">Pagamento e envio de produtos</a>
            <a href="http://localhost:3000/">Trocas e devoluções de produtos</a>
            <a href="http://localhost:3000/">Contato</a>
          </div>
          <div className="social-media">
            <h3>Redes Sociais</h3>
            <div className="media-logos">
              <a href="https://www.facebook.com/aliranotes/"><img src={facebookIcon} alt="facebook: @aliranotes"/></a>
              <a href="https://www.instagram.com/aliranotes/"><img src={intagramIcon} alt="instagram: @aliranotes"/></a>
            </div>
          </div>
        </div>
        <div className="lower-footer">
          <p>Alira notes - papelaria criativa<br />
          CNPJ: 11.222.333/0001-44<br />
          São Carlos - SP - 2020</p>
        </div>

      </footer>


    </div>
  );
}

export default Home;
