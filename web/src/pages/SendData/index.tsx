import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiMail, FiTruck, FiClipboard } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { CEPInput, CNPJInput, CPFInput, PhoneInput } from '../../components/MaskedInputs';

import progressImg from '../../assets/images/progress1.png';

import './styles.css';
import CartList from '../../components/CartList';
import Radio from '../../components/Radio';
import CheckBox from '../../components/CheckBox';

function SendData() {
  const [isDeliveryVisible,setIsDeliveryVisible] = useState(true);
  const [isInvoiceAdressEqual,setIsInvoiceAdressEqual] = useState(false);

  const history = useHistory()

  function handleContinue() {
    history.push('/shipping-select');
  }

  function handleToggleDeliveryVisible (event: ChangeEvent<HTMLInputElement> ) {

    setIsDeliveryVisible( event.target.value === 'true' ? true : false );
    setIsInvoiceAdressEqual(false);
  }

  function handleToggleInvoiceForm() {
    setIsInvoiceAdressEqual(!isInvoiceAdressEqual);
  }


  function handleCopyForm() {
    console.log('copia as informações');
  }

  useEffect(() => {
    if(isInvoiceAdressEqual) {
      handleCopyForm();
    }

  },[isInvoiceAdressEqual]);


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
                <PhoneInput required name="phone" placeholder="Celular" />
              </fieldset>
            </div>

            <div className="send-type">
                <Radio required name="send-type" value="false" onChange={handleToggleDeliveryVisible}>
                  <b>Retirar os produtos diretamento com o VENDEDOR</b>
                  <span>(Caso resida em São Carlos-SP)</span>
                </Radio>
                <Radio required name="send-type" value="true" onChange={handleToggleDeliveryVisible}>
                  <b>Receber os produtos em casa pelos </b><em>CORREIOS</em>
                  <span>(Informe o endereço de entrega a seguir)</span>
                </Radio>
            </div>

            { isDeliveryVisible && (
              <div id="delivery-adress" className="form-group">
                <fieldset >
                  <legend>
                    <FiTruck /><h3>Nome e Endereço de Entrega</h3>
                  </legend>
                  <Input required type="text" name="name" placeholder="Nome" />
                  <Input required type="text" name="lastname" placeholder="Sobrenome" />
                  <CEPInput required name="cep" placeholder="CEP" />
                  <div className="field-group">
                    <Input required type="text" name="street" placeholder="Endereço" />
                    <Input required type="text" name="number" placeholder="Número" />
                  </div>
                  <Input required type="text" name="complement" placeholder="Complemento: (ex: casa, apart. nº 3, etc.)" />
                  <Input required type="text" name="neighborhood" placeholder="Bairro" />
                  <div className="field-group">
                    <Input required type="text" name="city" placeholder="Cidade" />
                    <Input required type="text" name="state" placeholder="Estado" />
                    <Input required type="text" name="country" placeholder="País" />
                  </div>
                </fieldset>
              </div>
            )}

            <div className="form-group">

              <fieldset>
                <legend>
                  <FiClipboard /><h3>Dados para a Nota Fiscal</h3>
                </legend>
                <div className="field-group">
                  <CPFInput type="text" name="CPF" placeholder="CPF" />
                  <CNPJInput type="text" name="CNPJ" placeholder="CNPJ" />
                </div>
                { isDeliveryVisible && (
                  <CheckBox name="repeat" onChange={ handleToggleInvoiceForm } >
                    Minhas informações da Nota Fiscal e da Entrega são as mesmas
                  </CheckBox>
                )}
                {!isInvoiceAdressEqual && (
                  <div id="invoice-adress" >
                    <Input required type="text" name="iname" placeholder="Nome" />
                    <Input required type="text" name="ilastname" placeholder="Sobrenome" />
                    <CEPInput required name="icep" placeholder="CEP" />
                    <div className="field-group">
                      <Input required type="text" name="istreet" placeholder="Endereço" />
                      <Input required type="text" name="inumber" placeholder="Número" />
                    </div>
                    <Input required type="text" name="icomplement" placeholder="Complemento: (ex: casa, apart. nº 3, fundos, etc.)" />
                    <Input required type="text" name="ineighborhood" placeholder="Bairro" />
                    <div className="field-group">
                      <Input required type="text" name="icity" placeholder="Cidade" />
                      <Input required type="text" name="istate" placeholder="Estado" />
                      <Input required type="text" name="icountry" placeholder="País" />
                    </div>
                  </div>
                )}
              </fieldset>

            </div>
          </main>

          <div className="right-bar">
            <CartList>
              <button type="submit" onClick={handleContinue} >Continuar</button>
            </CartList>
          </div>

        </form>

      </div>
      <img className="progress" src={progressImg} alt="Etapa 1 de 3"/>

    </div>
  );
}

export default SendData;
