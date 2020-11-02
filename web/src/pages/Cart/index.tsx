import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { consultarCep, calcularPrecoPrazo, rastrearEncomendas } from 'correios-brasil';

import ProductItem from '../../components/ProductItem';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import toReal from '../../utils/toReal';

import { useShoppingCart } from '../../context/shoppingCart';

import './styles.css';


interface ConsultarCep {
  cep: number;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: number;
  gia: number;
}

interface CalcularPrecoPrazo {
  Codigo: number;
  Valor: number;
  PrazoEntrega: number;
  ValorSemAdicionais: number;
  ValorMaoPropria: number;
  ValorAvisoRecebimento: number;
  ValorValorDeclarado: number;
  EntregaDomiciliar: string;
  EntregaSabado: string;
  obsFim: string;
  Erro: string;
  MsgErro: string;
}

interface RastrearEncomendas {
  data: Array<{
    status: string;
    data: string;
    hora: string;
    local?: string;
    origem?: string;
    destino?: string;
  }>
}





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


// const cep = '14177260';

// consultarCep(cep).then((response: ConsultarCep) => {
//   console.log(response);
// });



// const  args = {
//   sCepOrigem:  '13561049',
//   sCepDestino:  '14177260',
//   nVlPeso:  '1',
//   nCdFormato:  '1',
//   nVlComprimento:  '20',
//   nVlAltura:  '20',
//   nVlLargura:  '20',
//   nCdServico:  '04510',
//   nVlDiametro:  '0',
// };

// calcularPrecoPrazo(args).then((response: CalcularPrecoPrazo) => {
//   console.log(response);
// });





// const  codRastreio = ['PW639018542BR', 'PW935793588BR'] // array de códigos de rastreios

// rastrearEncomendas(codRastreio).then((response: RastrearEncomendas) => {
//   console.log(response);
// });







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
              <span className="shop-total">{toReal(amount)}</span>
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
