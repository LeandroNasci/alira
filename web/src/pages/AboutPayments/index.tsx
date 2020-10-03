import React from 'react';

import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

import moneyImg from '../../assets/images/dinheiro-pagseguro.png'
import correiosImg from '../../assets/images/correios.png'

import './styles.css';

function AboutPayments() {
  return (
    <div id="page-about-payments" className="container">
      <PageHeader/>

      <div className="about-payments-content">

        <div className="payments">
          <h2>PAGAMENTO DOS PRODUTOS</h2>
          <p className="first">Nosso pagamento é realizado de maneira segura por meio da plataforma do <em>PagSeguro</em>. As formas de pagamento são:</p>
          <img src={moneyImg} alt="Logo PagSeguro"/>
          <ul>
            <li><b>Cartão de crédito</b> (Dividido em varias parcelas);</li>
            <li><b>Boleto bancário</b> (Leva até 3 dias úteis para compensação).</li>
          </ul>
          <br />
          <p>A compra é finalizada no site do <em>PagSeguro</em> (Fique tranquilo), depois de concluído você receberá um e-mail de confirmação do seu pagamento.</p>
        </div>

        <div className="shipping">
          <h2>ENVIO DE PRODUTOS</h2>
          <p className="first">Para que os produtos cheguem até você, nós utilizamos o Envio Fácil, que trata-se de uma parceria do <em>PagSeguro</em> com os <em>Correios</em> e disponibiliza duas formas de envio, ambas com opção de rastreio:</p>
          <img src={correiosImg} alt="Logo Correios"/>
          <ul>
            <li><b>Sedex:</b> é a entrega expressa  e mais cara dos Correios, no qual, o prazo varia de acordo a localidade de origem e destino de segunda a sábado. Contudo é mais rápido que o PAC.</li>
            <li><b>PAC:</b> é uma entrega mais econômica dos Correios, na qual o prazo também varia de acordo o local de origem e de entrega de segunda a sexta-feira.</li>
            <br />
            <li><b>Retirada diretamente com o Vendedor:</b> Essa opção é para clientes que residam nas proximidades da cidade de São Carlos - SP e queiram retirar os produtos diretamente com o vendedor, pra que assim, não precise gastar com frete! Para isso, basta selecionar  a  opção logo que estiver preenchendo seu dados. Depois que efetuar o pagamento, você receberá as instruções com o endereço para nos encontrar. Legal, né? :)</li>
          </ul>
          <p></p>
          <p>O prazo vai depender da sua localização e da forma de envio que você escolherá no momento do checkout. O produto será postado em, no máximo, 24 horas após a confirmação do pagamento.</p>
          <p><em>OBS: Os prazos podem sofrer alterações em caso de  eventuais greves do Correios.</em></p>
        </div>


      </div>

      <Footer />

    </div>
  );
}

export default AboutPayments;
