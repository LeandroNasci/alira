import React from 'react';

import ProductItem from '../../components/ProductItem';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';


import './styles.css';

function Cart() {
  return (
    <div id="page-cart">
      <PageHeader back />

      <main>
        <div className="product-list">
          <h2>Itens do carrinho</h2>

          <ProductItem />
          <ProductItem />
          <ProductItem />

          <button type="button">Adicionar outros produtos</button>

        </div>

        <div className="cart-bar">
          <div className="cart-info">
            <h3>Valor do carrinho</h3>
            <div className="shop-value">
              <div>Valor total</div>
              <span className="shop-total">R$ 100</span>
            </div>
            <p>Escolha o modo de envio e o FRETE nas próximas etapas</p>
            <button type="button">Vou levar esse carrinho</button>
          </div>
          <div className="send-info">
            <div className="off">
              <h4>DESCONTO ALIRA!</h4>
              <p>Só aqui na Alira você tem <b>15%</b> de desconto no Frete de seus produtos. Confira!</p>
            </div>
            <p>Digite seu CEP no campo abaixo para estimar o frete e saber o prazo de entrega estimados</p>
            <form action="" className="zip-code">
              <input type="text" placeholder="13561-000" />
              <button>Estimar Frete</button>
            </form>
            <div className="shipping-cost">
              <div>
                <h5>PAC</h5>
                <span>Entrega em até 11 dias úteis</span>
                <p>Na ALIRA somente por</p>
              </div>
              <div>
                <h6 id="strike">R$ 24,30</h6>
                <h6>R$ 21,87</h6>
              </div>
            </div>
            <div className="shipping-cost">
              <div>
                <h5>SEDEX</h5>
                <span>Entrega em até 6 dias úteis</span>
                <p>Na ALIRA somente por</p>
              </div>
              <div>
                <h6 id="strike">R$ 25,80</h6>
                <h6>R$ 21,93</h6>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
