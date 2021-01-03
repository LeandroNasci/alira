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
          <p className="first">Para que sua experiência seja perfeita, você pode trocar de produto ou desistir da compra! Legal né?</p>
          <br />
          <p>A <b>ALIRA notes</b> realizará a troca do produto ou devolução integral do seu dinheiro em caso de arrependimento ou no recebimento de um produto que não esteja em perfeito estado. Para isso você deverá nos avisar no período de 7 dias após o recebimento. Esta é a lei do arrependimento do CDC (Código de Defesa do Consumidor), que permite que você desista do produto e notifique o vendedor dentro do prazo informado. O custo do reenvio será por conta da Alira.</p>
          <br />
          <p>No caso de bater a vontade de apenas realizar a troca, ela pode ser feita por um outro produto igual (caso o produto não esteja esgotado) ou outro produto do nosso site ao qual o valor seja abatido. Seu produto deverá ser devolvido em perfeitas condições (estará sujeito à análise) o custo de reenvio é por conta do cliente.</p>
          <br />
          <p>Para maiores informações mande um e-mail para <em>aliranotes@gmail.com</em> nos dizendo o que aconteceu e, desta forma, teremos o maior prazer em tirar sua dúvida e resolver o seu problema da forma mais rápida possível, tá? :)</p>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AboutExchanges;
