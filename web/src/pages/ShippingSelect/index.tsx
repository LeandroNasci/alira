import React from 'react';
import { FiMail, FiTruck, FiClipboard, FiPackage, FiArrowLeft, FiUsers } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Radio from '../../components/Radio';

import progressImg from '../../assets/images/progress2.png';
import pagSeguroImg from '../../assets/images/logo-pagseguro.png'

import './styles.css';
import CartList from '../../components/CartList';
import CheckBox from '../../components/CheckBox';

function ShippingSelect () {

  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  function handleCheckout () {
    console.log('redireciona para o PagSeguro');
  }

  return (
    <div id="page-shipping-select" className="container">
      <PageHeader compact/>

      <img className="progress" src={progressImg} alt="Etapa 2 de 3"/>

      <div className="shipping-select-content">

        <form action="">
          <main>

            <div className="form-group">
              <fieldset className="send-method" >
                <legend>
                  <FiPackage /><h3>Escolha o método de entrega oferecido pelos Correios</h3>
                </legend>
                <div>
                  <Radio required name="send-category" value="PAC" defaultChecked>
                    <b>PAC</b>
                    <span>Entrega em até 10 dias úteis</span>
                  </Radio>
                  <strong>R$ 21,87</strong>
                </div>
                <div>
                  <Radio required name="send-category" value="SEDEX">
                    <b>SEDEX</b>
                    <span>Entrega em até 4 dias úteis</span>
                  </Radio>
                  <strong>R$ 21,93</strong>
                </div>
              </fieldset>
            </div>

            <div className="form-group">
              <fieldset className="send-method" >
                <legend>
                  <FiPackage /><h3>Método de entrega dos produtos escolhido</h3>
                </legend>
                <div>
                  <Radio required name="send-category" value="VENDEDOR" defaultChecked>
                    <b>Retirada dos produtos com o VENDEDOR</b>
                    <span>(São Carlos - SP)</span>
                  </Radio>
                  <strong>Gratuito</strong>
                </div>
              </fieldset>
            </div>

            <div className="form-group">

              <h3>Conferência das Informações</h3>
              <p>Por favor confirme se as informações abaixo estão corretas {':)'} Se estiverem corretas, marque <em>OK, corretas!</em>, caso contrário, clique em <em>Corrigir informações</em> para voltar à tela alterior e alterá-las</p>

              <fieldset >
                <legend>
                  <FiMail /><h3>Dados para Contato</h3>
                </legend>

                <div className="box-container">
                  <div className="box">
                    <p><b>E-mail: </b>aliranotes@gmail.com</p>
                    <p><b>Telefone: </b>(16) 99555-4343</p>
                  </div>

                  <CheckBox required name="st"><em>OK, corretas!</em></CheckBox>
                </div>
              </fieldset>

              <fieldset >
                <legend>
                  <FiTruck /><h3>Dados para Entrega</h3>
                </legend>

                <div className="box-container">
                  <div className="box">
                    <p><b>Nome:</b> Jessica Lima Brito</p>
                    <p><b>CEP: </b>13560-049</p>
                    <p><b>Endereço: </b>Rua Episcopal, 2827, kitnet nº2</p>
                    <p><b>Bairro: </b>Jardim Ltfalla</p>
                    <p><b>Cidade: </b>São Carlos</p>
                    <p><b>Estado: </b>São Paulo</p>
                    <p><b>País: </b>Brasil</p>
                  </div>

                  <CheckBox required name="nd"><em>OK, corretas!</em></CheckBox>
                </div>

                <legend>
                  <FiUsers /><h3>Dados para Entrega</h3>
                </legend>

                <div className="box-container">
                  <div className="box">
                    <p><b>Nome:</b> Jessica Lima Brito</p>
                    <br />
                    <p>Você escolheu o método de retirada dos produtos diretamente com o vendedor, ou seja, não será cobrado o valor do frete. Você deverá combinar com o vendedor o local e hora de retirada do produto no email: <em>aliranotes@gmail.com</em></p>
                  </div>

                  <CheckBox required name="nd"><em>OK, corretas!</em></CheckBox>
                </div>

              </fieldset>

              <fieldset >
                <legend>
                  <FiClipboard /><h3>Dados para a Nota Fiscal</h3>
                </legend>

                <div className="box-container">
                  <div className="box">
                    <p><b>CPF: </b>111.222.333-44</p>
                    <p hidden ><b>CNPJ: </b>11.222.333/0001-44</p>
                    <p><b>Nome: </b>Jessica Lima Brito</p>
                    <p><b>CEP: </b>13560-049</p>
                    <p><b>Endereço: </b>Rua Episcopal, 2827, kitnet nº2</p>
                    <p><b>Bairro: </b>Jardim Ltfalla</p>
                    <p><b>Cidade: </b>São Carlos</p>
                    <p><b>Estado: </b>São Paulo</p>
                    <p><b>País: </b>Brasil</p>
                  </div>

                  <CheckBox required name="rd"><em>OK, corretas!</em></CheckBox>
                </div>
              </fieldset>

              <button className="link" type="button" onClick={handleGoBack} ><FiArrowLeft />Corrigir informações</button>

            </div>
          </main>

          <div className="right-bar">
            <CartList>
              <button type="submit" onSubmit={handleCheckout} >Finalizar compra</button>
            </CartList>
          </div>

        </form>

      </div>

     <div className="bottom-bar">
      <h3>Como funciona o Pagamento</h3>
      <strong>Depois de clicar em “Finalizar Compra”, você será redirecionado para a página de checkout do <em>PagSeguro</em> para finalizar sua compra com toda segurança</strong>
      <img src={pagSeguroImg} alt="PagSeguro"/>
     </div>

      <img className="progress" src={progressImg} alt="Etapa 2 de 3"/>

    </div>
  );
}

export default ShippingSelect;
