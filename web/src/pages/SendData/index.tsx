import React, { useState } from 'react';
import { FiMail, FiTruck, FiClipboard, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import CartItem from '../../components/CartItem';
import parseStringAsBoolean from '../../utils/parseStringAsBoolean';

import progressImg from '../../assets/images/progress1.png';

import './styles.css';

function SendData() {
  const [isDeliveryVisible,setIsDeliveryVisible] = useState(true);
  const [isInvoiceAdressEqual,setIsInvoiceAdressEqual] = useState(false);

  const history = useHistory()

  function handleContinue () {
    history.push('/shipping-select');
  }

  function handleGoBack () {
    history.goBack();
  }

  function handleToggleDeliveryVisible (value: string) {
    const state = parseStringAsBoolean(value);

    setIsDeliveryVisible( Boolean(state) );
    setIsInvoiceAdressEqual(false);
  }

  function handleToggleInvoiceForm () {
    setIsInvoiceAdressEqual(!isInvoiceAdressEqual);
  }

  return (
    <div id="page-send-data" className="container">
      <PageHeader compact/>

      <img className="progress" src={progressImg} alt="Etapa 1 de 3"/>

      <div className="send-data-content">

        <form action="">
          <main>

            <div id="user-contact" className="form-group">
              <fieldset>
                <legend>
                  <FiMail /><h3>Meus dados para Contato</h3>
                </legend>
                <Input required type="email" name="email" placeholder="E-mail: (ex: exemplo@gmail.com)" />
                <Input required type="tel" name="phone" placeholder="Telefone: (ex: 11 99999-2222)" pattern="[0-9]{2} [0-9]{4}-[0-9]{4}" />
              </fieldset>
            </div>

            <div className="send-type">
              <div>
                <input required type="radio" name="send-type" value="false" onChange={ e => { handleToggleDeliveryVisible(e.target.value)} } />
                <label className="control" htmlFor="vendedor" >
                  <b>Retirar os produtos diretamento com o VENDEDOR</b>
                  <span>(Caso resida em São Carlos-SP)</span>
                </label>
              </div>
              <div>
                <input required type="radio" name="send-type" value="true" onChange={ e => { handleToggleDeliveryVisible(e.target.value) } } />
                <label className="control" htmlFor="correios" >
                  <b>Receber os produtos em casa pelos </b><em>CORREIOS</em>
                  <span>(Informe o endereço de entrega a seguir)</span>
                </label>
              </div>

            </div>

            { isDeliveryVisible && (
              <div id="delivery-adress" className="form-group">
                <fieldset >
                  <legend>
                    <FiTruck /><h3>Nome e Endereço de Entrega</h3>
                  </legend>
                  <Input required type="text" name="name" placeholder="Nome" />
                  <Input required type="text" name="lastname" placeholder="Sobrenome" />
                  <Input required type="text" name="cep" placeholder="CEP: (ex: 11222-000)" />
                  <Input required type="text" name="street" placeholder="Endereço" />
                  <Input required type="text" name="number" placeholder="Número: (ex: 200)" />
                  <Input required type="text" name="complement" placeholder="Complemento: (ex: casa, apart. nº 3, etc.)" />
                  <Input required type="text" name="neighborhood" placeholder="Bairro" />
                  <Input required type="text" name="city" placeholder="Cidade" />
                  <Input required type="text" name="state" placeholder="Estado" />
                  <Input required type="text" name="country" placeholder="País" />
                </fieldset>
              </div>
            )}

            <div className="form-group">

              <fieldset>
                <legend>
                  <FiClipboard /><h3>Dados para a Nota Fiscal</h3>
                </legend>
                <Input required type="text" name="CPF" placeholder="CPF ou CNPJ" />
                { isDeliveryVisible && (
                  <div className="checkbox-group">
                    <Input type="checkbox" name="repeat" id="repeat" onClick={ handleToggleInvoiceForm } />
                    <label className="control" htmlFor="repeat" >Minhas informações da Nota Fiscal e da Entrega são as mesmas</label>
                  </div>
                )}
                {!isInvoiceAdressEqual && (
                  <div id="invoice-adress" >
                    <Input required type="text" name="iname" placeholder="Nome" />
                    <Input required type="text" name="ilastname" placeholder="Sobrenome" />
                    <Input required type="text" name="icep" placeholder="CEP: (ex: 11222-000)" />
                    <Input required type="text" name="istreet" placeholder="Endereço" />
                    <Input required type="text" name="inumber" placeholder="Número: (ex: 200)" />
                    <Input required type="text" name="icomplement" placeholder="Complemento: (ex: casa, apart. nº 3, fundos, etc.)" />
                    <Input required type="text" name="ineighborhood" placeholder="Bairro" />
                    <Input required type="text" name="icity" placeholder="Cidade" />
                    <Input required type="text" name="istate" placeholder="Estado" />
                    <Input required type="text" name="icountry" placeholder="País" />
                  </div>
                )}
              </fieldset>

            </div>
          </main>

          <div className="right-bar">

            <div className="cart-list">
              <header><FiShoppingCart /><h4>Carrinho com seus pedidos</h4></header>

              <CartItem />
              <CartItem />
              <CartItem />

              <div className="cart-value"><h5>Valor do Carrinho</h5> <span>R$ 128,20</span></div>
              <div className="shipping-value"><h5>Valor do Frete</h5> <span>R$ 21,93</span></div>
              <div className="total-value"><h5>Total</h5> <span>R$ 149,73</span></div>
              <button type="submit" onSubmit={handleContinue} >Continuar</button>
            </div>

            <button className="link" type="button" onClick={handleGoBack} ><FiArrowLeft />Voltar para o carrinho</button>
          </div>

        </form>

      </div>
      <img className="progress" src={progressImg} alt="Etapa 1 de 3"/>

    </div>
  );
}

export default SendData;
