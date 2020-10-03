import React from 'react';

import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

import './styles.css';

function AboutExchanges() {
  return (
    <div id="page-about-exchanges" className="container">
      <PageHeader/>

      <div className="about-exchanges-content">

        <div className="exchanges">
          <h2>TROCAS E DEVOLUÇÕES DE PRODUTOS</h2>
          <p className="first">A <b>ALIRA notes</b> realizará a troca ou devolução do seu produto, que deverá nos ser notificado no período de 7 dias após o recebimento. Esta é a lei do arrependimento do CDC (Código de Defesa do Consumidor), que permite que você desista do produto e notifique o vendedor dentro do prazo informado. Seu produto deverá ser devolvido em perfeitas condições (estará sujeito à análise). O custo do reenvio não será por conta do cliente.</p>
          <br />
          <p>A devolução poderá ser realizada no caso em que o recebimento do produto que não esteja em perfeito estado, ou pelo o arrependimento da compra. A devolução é em dinheiro.</p>
          <br />
          <p>A troca é realizada por um outro produto igual (caso o produto não esteja esgotado) ou outro produto do nosso site ao qual o valor seja abatido. </p>
          <br />
          <p>Para maiores informações mande um e-mail para <em>aliranotes@gmail.com</em> explicando sua situação e, desta forma, teremos o maior prazer em tirar sua dúvida e resolver o seu problema  :)</p>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AboutExchanges;
