import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { consultarCep, calcularPrecoPrazo, rastrearEncomendas } from 'correios-brasil';

import ProductItem from '../../components/ProductItem';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import toReal from '../../utils/toReal';
import { cepSanitization } from '../../utils/sanatizations';
import api from '../../services/api';
import { useShoppingCart } from '../../context/shoppingCart';

import './styles.css';

function Cart() {
  const history = useHistory();
  const { addedItems } = useShoppingCart();

  const [amount, setAmount] = useState(0);
  const [isShippingVisible,setIsShippingVisible] = useState(false);
  const [zipCode,setZipCode] = useState('');
  const [pacCorreios,setPacCorreios] = useState(0);
  const [sedexCorreios,setSedexCorreios] = useState(0);
  const [prasoPacCorreios,setPrasoPacCorreios] = useState(0);
  const [prasoSedexCorreios,setPrasoSedexCorreios] = useState(0);

  useEffect(() => {

    if(addedItems.length !== 0) {
      const subtotalList = addedItems.map(item =>item.price*item.quantity);
      const total = subtotalList.reduce((total, currentItem) => total + currentItem);
      setAmount(total);
    }
    else{
      setAmount(0);
    }

  }, [addedItems]);

  function handleGoToSendData() {
    history.replace('/send-data');
  }

  function handleGoToHome() {
    history.push('/');
  }

  async function handleCalculateShippingCost(event: FormEvent) {
    event.preventDefault();

    const  args = {
      sCepOrigem:  process.env.REACT_APP_CEP_ORIGEM || '13561000',
      sCepDestino:  cepSanitization(zipCode),
      nVlPeso:  '1',
      nCdFormato:  '1',
      nVlComprimento:  '20',
      nVlAltura:  '20',
      nVlLargura:  '20',
      nCdServico:  ["04014", "04510"],
      nVlDiametro:  '0',
    };

    try {
      const response = await api.post('/preco', args);
      setSedexCorreios( Number(response.data[0].Valor.replace(",", ".")) );
      setPacCorreios( Number(response.data[1].Valor.replace(",", ".")) );
      setPrasoSedexCorreios(response.data[0].PrazoEntrega);
      setPrasoPacCorreios(response.data[1].PrazoEntrega);
    }
    catch (err) {
      console.log(err);
    }
    setIsShippingVisible(true);
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
              <p>Só aqui na Alira você tem <b>10%</b> de desconto no Frete de seus produtos. Confira!</p>
            </div>
            <p>Digite seu CEP no campo abaixo para estimar o frete e saber o prazo de entrega estimados</p>
            <form className="zip-code" onSubmit={handleCalculateShippingCost} >
              <input
                type="text"
                placeholder="13561-000"
                onChange={ (e) => { setZipCode(e.target.value) } }
              />
              <button type="submit">Estimar Frete</button>
            </form>
            { isShippingVisible && (
              <div>
                <div className="shipping-cost">
                  <div className="correio-price">
                    <div>
                      <h5>PAC</h5>
                      <span>Entrega em até {prasoPacCorreios} dias úteis</span>
                    </div>
                    <h6 id="strike">{toReal(pacCorreios)}</h6>
                  </div>
                  <div className="alira-price">
                    <p>Na ALIRA somente por</p>
                    <h6>{toReal(pacCorreios * 0.9)}</h6>
                  </div>
                </div>
                <div className="shipping-cost">
                  <div className="correio-price">
                    <div>
                      <h5>SEDEX</h5>
                      <span>Entrega em até {prasoSedexCorreios} dias úteis</span>
                    </div>
                    <h6 id="strike">{toReal(sedexCorreios)}</h6>
                  </div>
                  <div className="alira-price">
                    <p>Na ALIRA somente por</p>
                    <h6>{toReal(sedexCorreios * 0.9)}</h6>
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
