import React from 'react';
import { FiMail, FiTruck, FiClipboard, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import progressImg from '../../assets/images/progress1.png';

import './styles.css';
import Input from '../../components/Input';

function SendData() {
  const history = useHistory()

  function handleContinue () {
    history.push('/shipping-select');
  }

  function handleGoBack () {

    history.goBack();
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
                <input type="radio" name="send-type" id="vendedor" value="vendedor" />
                <label className="control" htmlFor="vendedor" >
                  <b>Retirar os produtos diretamento com o VENDEDOR</b>
                  <span>(Caso resida em São Carlos-SP)</span>
                </label>
              </div>


              <div>
                <input type="radio" name="send-type" id="correios" value="correios" checked />
                <label className="control" htmlFor="correios" >
                  <b>Receber os produtos em casa pelos </b><em>CORREIOS</em>
                  <span>(Informe o endereço de entrega a seguir)</span>
                </label>
              </div>

            </div>

            <div id="delivery-adress" className="form-group">

              <fieldset >
                <legend>
                  <FiTruck /><h3>Nome e Endereço de Entrega</h3>
                </legend>
                <Input required type="text" name="name" placeholder="Nome: (ex: Jessica)" />
                <Input required type="text" name="lastname" placeholder="Sobrenome: (ex: Lima Brito)" />
                <Input required type="text" name="cep" placeholder="CEP: (ex: 11222-000)" />
                <Input required type="text" name="street" placeholder="Endereço (ex: Rua, Av, Alameda, etc)" />
                <Input required type="text" name="number" placeholder="Número: (ex: 200)" />
                <Input required type="text" name="complement" placeholder="Complemento: (ex: casa, apart. nº 3, fundos, etc.)" />
                <Input required type="text" name="neighborhood" placeholder="Bairro: (ex: Jardim Santa Maria)" />
                <Input required type="text" name="city" placeholder="Cidade: (ex: São Carlos)" />
                <Input required type="text" name="state" placeholder="Estado (ex: São Paulo)" />
                <Input required type="text" name="country" placeholder="País (ex: Brasil)" />
              </fieldset>

            </div>

            <div id="invoice-adress" className="form-group">

              <fieldset>
                <legend>
                  <FiClipboard /><h3>Dados para a Nota Fiscal</h3>
                </legend>
                <Input required type="text" name="CPF" placeholder="CPF: (ex: 111.222.333-44)" />
                <div>
                  <Input required type="checkbox" name="repeat" id="repeat" />
                  <label className="control" htmlFor="repeat" >Minhas informações da Nota Fiscal e da Entrega são as mesmas</label>
                </div>
                <Input required type="text" name="name" placeholder="Nome: (ex: Jessica)" />
                <Input required type="text" name="lastname" placeholder="Sobrenome: (ex: Lima Brito)" />
                <Input required type="text" name="cep" placeholder="CEP: (ex: 11222-000)" />
                <Input required type="text" name="street" placeholder="Endereço (ex: Rua, Av, Alameda, etc)" />
                <Input required type="text" name="number" placeholder="Número: (ex: 200)" />
                <Input required type="text" name="complement" placeholder="Complemento: (ex: casa, apart. nº 3, fundos, etc.)" />
                <Input required type="text" name="neighborhood" placeholder="Bairro: (ex: Jardim Santa Maria)" />
                <Input required type="text" name="city" placeholder="Cidade: (ex: São Carlos)" />
                <Input required type="text" name="state" placeholder="Estado (ex: São Paulo)" />
                <Input required type="text" name="country" placeholder="País (ex: Brasil)" />
              </fieldset>

            </div>
          </main>

          <div className="right-bar">

            <div className="cart-list">
              <header><FiShoppingCart /><h4>Carrinho com seus pedidos</h4></header>

              {/*componente*/}

              <div className="cart-value"><h5>Valor do Carrinho</h5> <span>R$128,20</span></div>
              <div className="shipping-value"><h5>Valor do Frete</h5> <span>R$21,93</span></div>
              <div className="total-value"><h5>Total</h5> <span>R$149,73</span></div>
              <button type="button" onClick={handleContinue} >Continuar</button>

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
