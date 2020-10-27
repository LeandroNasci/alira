import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ProductItem from '../../components/ProductItem';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';

import { useShoppingCart } from '../../context/shoppingCart';

import './styles.css';

function Cart() {
  const history = useHistory();
  const { addedItems } = useShoppingCart();

  const [amount, setAmount] = useState(0);
  const [isShippingVisible,setIsShippingVsible] = useState(false);


  useEffect(() => {

    if(addedItems.length !== 0) {
      const subtotalList = addedItems.map(item =>item.price*item.quantity);
      const total = subtotalList.reduce((total, currentItem) => total + currentItem);
      setAmount(total);
    }

  }, [addedItems]);

  function handleGoToSendData() {
    history.push('/send-data');
  }

  function handleGoToHome() {
    history.push('/');
  }

  function handleCalculateShippingCost(event: FormEvent) {
    event.preventDefault();

    /* Calculo de frete */

    setIsShippingVsible(true);
  }

  return (
    <div id="page-cart" className="container" >
      <PageHeader />

      <main>
        <div className="product-list">
          <h2>Itens do carrinho</h2>
          {addedItems.map(item => {
            return (
              <ProductItem
                key={item.code}
                id={item.id}
                code={item.code}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                stock={item.stock}
                image={item.images[0]}
              />
            );
          })}



          <button type="button" onClick={handleGoToHome}>Adicionar outros produtos</button>

        </div>

        <div className="cart-bar">
          <div className="cart-info">
            <h3>Valor do carrinho</h3>
            <div className="shop-value">
              <div>Valor total</div>
              <span className="shop-total">
                {
                  Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(amount)
                }
              </span>
            </div>
            <p>Escolha o MODO DE ENVIO e o FRETE nas próximas etapas</p>
            <button type="button" onClick={handleGoToSendData}>Vou levar esse carrinho</button>
          </div>
          <div className="send-info">
            <div className="off">
              <h4>DESCONTO ALIRA!</h4>
              <p>Só aqui na Alira você tem <b>15%</b> de desconto no Frete de seus produtos. Confira!</p>
            </div>
            <p>Digite seu CEP no campo abaixo para estimar o frete e saber o prazo de entrega estimados</p>
            <form className="zip-code" onSubmit={handleCalculateShippingCost} >
              <input type="text" placeholder="13561-000" />
              <button type="submit">Estimar Frete</button>
            </form>
            { isShippingVisible && (
              <div>
                <div className="shipping-cost">
                  <div className="correio-price">
                    <div>
                      <h5>PAC</h5>
                      <span>Entrega em até 11 dias úteis</span>
                    </div>
                    <h6 id="strike">R$ 24,30</h6>
                  </div>
                  <div className="alira-price">
                    <p>Na ALIRA somente por</p>
                    <h6>R$ 21,87</h6>
                  </div>
                </div>
                <div className="shipping-cost">
                  <div className="correio-price">
                    <div>
                      <h5>SEDEX</h5>
                      <span>Entrega em até 6 dias úteis</span>
                    </div>
                    <h6 id="strike">R$ 25,80</h6>
                  </div>
                  <div className="alira-price">
                    <p>Na ALIRA somente por</p>
                    <h6>R$ 21,93</h6>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
