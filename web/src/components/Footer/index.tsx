import React from 'react';
import { Link } from 'react-router-dom';

import facebookIcon from '../../assets/images/icons/facebook.svg';
import intagramIcon from '../../assets/images/icons/instagram.svg';

import './styles.css';

function Footer() {
  return (
    <footer id="footer">
      <div className="upper-footer">
        <div className="links">
          <Link to="/about">Quem Somos</Link>
          <Link to="/payments">Pagamento e envio de produtos</Link>
          <Link to="/exchanges">Trocas e devoluções de produtos</Link>
          <Link to="/contact">Contato</Link>
        </div>
        <div className="social-media">
          <h3>Redes Sociais</h3>
          <div>
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
  );
}

export default Footer;
