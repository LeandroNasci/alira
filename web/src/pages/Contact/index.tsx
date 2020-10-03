import React from 'react';

import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

import facebookImg from '../../assets/images/facebook-desktop.png';
import instagramImg from '../../assets/images/smartphone.png';

import './styles.css';

function Contact() {
  return (
    <div id="page-contact" className="container">
      <PageHeader/>

      <div className="contact-content">

        <div className="contact">
          <h2>CONTATO</h2>

          <p className="first">Em caso de dúvidas, sugestões ou reclamações, vocês podem nos contactar através do e-mail:</p>

          <em>aliranotes@gmail.com</em>

          <p className="last">Nas redes sociais vocês podem nos encontrar assim:</p>

          <br />
          <h3>FACEBOOK</h3>

          <div className="desktop">
            <img src={facebookImg} alt="Facebook"/>
          </div>

          <h3>INSTAGRAM</h3>

          <div className="mobile">
            <img src={instagramImg} alt="Instagram"/>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Contact;
