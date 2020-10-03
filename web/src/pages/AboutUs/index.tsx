import React from 'react';

import jessicaImg from '../../assets/images/jessica.png'
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';

import './styles.css';

function AboutUs() {

  const now = new Date();
  const year = now.getFullYear();

  return (
    <div id="page-about-us" className="container">
      <PageHeader />
      <div className="about-content">
        <img src={jessicaImg} alt="jessica"/>

        <div className="info">
          <h2>QUEM SOMOS?</h2>
          <p className="first">Olá!<br /><br /></p>
          <p>A <em>ALIRA notes</em> surgiu em 2020 por meio de um sonho da criadora, Jessica Lima, de {year-1995} anos, formada em Processos Gerenciais, futura Gestora em RH e que sempre quis ter seu próprio negócio e conquistar sua indenpendência.</p>
          <p>A empresa está "localizada" na cidade de São Carlos-SP (cidade maravilhosa, por sinal), que é a cidade da Jessica.</p>
          <p>A aquariana é apaixonada por artigos de papelaria e organização, decidiu disponibilizar sua marca para qualquer pessoa que também cultive o mesmo amor por esses produtinhos maravilhosos.</p><br />
          <p>Esperamos que no futuro, nossa marca cresça e conquiste muitos clientes, que acreditem em nossa empresa!</p><br /><br />
          <p className="last">Sejam bem vindos!</p>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
