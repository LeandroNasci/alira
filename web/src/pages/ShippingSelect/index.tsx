import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiMail, FiTruck, FiClipboard, FiPackage, FiArrowLeft, FiUsers } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import Radio from '../../components/Radio';
import CartList from '../../components/CartList';
import CheckBox from '../../components/CheckBox';

import api from '../../services/api';
import { cepSanitization } from '../../utils/sanatizations';
import toReal from '../../utils/toReal';

import { Shipping, useShippingType } from '../../context/shippingType';
import { useShoppingCart } from '../../context/shoppingCart';
import { useFormData } from '../../context/formData';

import progressImg from '../../assets/images/progress2.png';
import pagSeguroImg from '../../assets/images/logo-pagseguro.png'

import './styles.css';
import serializeCheckout from '../../utils/serializeCheckout';



function ShippingSelect () {

  const history = useHistory();
  const { shipping, updateShipping } = useShippingType();
  const { addedItems } = useShoppingCart();
  const { formData } = useFormData();
  const { cartLength, cartWidth, cartHeight, cartWeight } = useShoppingCart();

  const [pacValues,setPacValues] = useState<Shipping>({ category: 1, price: 21.87, days: 8 });
  const [sedexValues,setSedexValues] = useState<Shipping>({ category: 2, price: 24.93, days: 3 });

  useEffect(() => {
    if(!formData.shippingAddress.cep){
      return;
    }
    const args = {
      sCepOrigem: process.env.REACT_APP_CEP_ORIGEM || '13561000',
      sCepDestino: cepSanitization(formData.shippingAddress.cep),
      nVlPeso: cartWeight,
      nCdFormato: '1',             //1:caixa  2:cilindro
      nVlComprimento: cartLength,
      nVlAltura: cartHeight,
      nVlLargura: cartWidth,
      nCdServico: ["04510", "04014"],    // [PAC, SEDEX]
      nVlDiametro: '0',
    };

    try {
      api.post('/preco', args).then(response => {
        setPacValues({
          category: 1,
          price: Number(response.data[0].Valor.replace(",", ".")) * 0.9,
          days: Number(response.data[0].PrazoEntrega)
        });

        setSedexValues({
          category: 2,
          price: Number(response.data[1].Valor.replace(",", ".")) * 0.9,
          days: Number(response.data[1].PrazoEntrega)
        });
      });
    }
    catch (err) {
      console.log(err);
    }

  },[cartHeight, cartLength, cartWeight, cartWidth, formData.shippingAddress.cep]);

  function handleCalculateFrete (event: ChangeEvent<HTMLInputElement> ) {
    // setShippingType(event.target.value);
    if(event.target.value === 'PAC') {
      updateShipping(pacValues);
    }
    if(event.target.value === 'SEDEX') {
      updateShipping(sedexValues);
    }
  }

  async function handleCheckout (event: FormEvent) {
    event.preventDefault();

    // armazenamento no banco de dados
    const serializedOrder = {
      email: formData.email,
      phone: formData.phone,
      cpf: formData.cpf,
      invoice: formData.invoice,
      shippingType: shipping.category,
      shippingCost: shipping.price,
      shipping: formData.shippingAddress,
      items: addedItems,
    }
    try {
      const orderResponse = await api.post('/orders', serializedOrder);

      const { orderId } = orderResponse.data;

      // redirecionamento pagseguro
      const compactJson = serializeCheckout({ formData, shipping, addedItems, cartWeight, orderId });

      const checkoutResponse = await api.post('/checkout', compactJson);
      
      const code = checkoutResponse.data.checkout.code._text;

      window.location.replace(`https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=${code}`);

    }
    catch (error) {
      console.log(error);
      alert(error)
    }


  }

  function handleGoBack() {
    history.goBack();
  }

  return (
    <div id="page-shipping-select" className="container">
      <PageHeader compact/>

      <img className="progress" src={progressImg} alt="Etapa 2 de 3"/>

      <div className="shipping-select-content">

        <form onSubmit={handleCheckout}>
          <main>
            {shipping.category!==3 ? (
              <div className="form-group">
                <fieldset className="send-method" >
                  <legend>
                    <FiPackage /><h3>Escolha o método de entrega oferecido pelos Correios</h3>
                  </legend>
                  <div>
                    <Radio required name="send-category" value="PAC" onChange={handleCalculateFrete}>
                      <b>PAC</b>
                      <span>Entrega em até {pacValues?.days} dias úteis</span>
                    </Radio>
                    <strong>{toReal(pacValues.price)}</strong>
                  </div>
                  <div>
                    <Radio required name="send-category" value="SEDEX" onChange={handleCalculateFrete}>
                      <b>SEDEX</b>
                      <span>Entrega em até {sedexValues?.days} dias úteis</span>
                    </Radio>
                    <strong>{toReal(sedexValues.price)}</strong>
                  </div>
                </fieldset>
              </div>
            ) : (
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
            )}

            <div className="form-group">

              <h3>Conferência das Informações</h3>
              <p>Por favor confirme se as informações abaixo estão corretas {':)'} Se estiverem corretas, marque <em>OK, corretas!</em>, caso contrário, clique em <em>Corrigir informações</em> para voltar à tela alterior e alterá-las</p>

              <fieldset >
                <legend>
                  <FiMail /><h3>Dados para Contato</h3>
                </legend>

                <div className="box-container">
                  <div className="box">
                    <p><b>E-mail: </b>{formData.email}</p>
                    <p><b>Telefone: </b>{formData.phone}</p>
                  </div>

                  <CheckBox required name="st"><em>OK, corretas!</em></CheckBox>  {/* Check contact */}
                </div>
              </fieldset>

              <fieldset >
                {shipping.category!==3 ? (
                  <>
                    <legend>
                      <FiTruck /><h3>Dados para Entrega</h3>
                    </legend>

                    <div className="box-container">
                      <div className="box">
                        <p><b>Nome:</b>{`${formData.shippingAddress.name} ${formData.shippingAddress.lastname}`}</p>
                        <p><b>CEP: </b>{formData.shippingAddress.cep}</p>
                        <p><b>Endereço: </b>{`${formData.shippingAddress.street}, ${formData.shippingAddress.number}, ${formData.shippingAddress.complement}`}</p>
                        <p><b>Bairro: </b>{formData.shippingAddress.district}</p>
                        <p><b>Cidade: </b>{formData.shippingAddress.city}</p>
                        <p><b>Estado: </b>{formData.shippingAddress.state}</p>
                        <p><b>País: </b>{formData.shippingAddress.country}</p>
                      </div>

                      <CheckBox required name="nd"><em>OK, corretas!</em></CheckBox>  {/* Check delivery */}
                    </div>
                  </>
                ) : (
                  <>
                    <legend>
                      <FiUsers /><h3>Dados para Retirada</h3>
                    </legend>

                    <div className="box-container">
                      <div className="box">
                        <p><b>Nome: </b>{`${formData.invoice.name} ${formData.invoice?.lastname}`}</p>
                        <br />
                        <p>Você escolheu o método de retirada dos produtos diretamente com o vendedor, ou seja, não será cobrado o valor do frete. Você deverá combinar com o vendedor o local e hora de retirada do produto no email: <em>aliranotes@gmail.com</em></p>
                      </div>

                      <CheckBox required name="nd"><em>OK, corretas!</em></CheckBox>  {/* Check withdraw */}
                    </div>
                  </>
                )}


              </fieldset>

              <fieldset >
                <legend>
                  <FiClipboard /><h3>Dados para a Nota Fiscal</h3>
                </legend>

                <div className="box-container">
                  <div className="box">
                    <p><b>CPF: </b>{formData?.cpf}</p>
                    <p hidden ><b>CNPJ: </b>{formData?.cnpj}</p>
                    <p><b>Nome: </b>{`${formData.invoice.name} ${formData.invoice.lastname}`}</p>
                    <p><b>CEP: </b>{formData.invoice.cep}</p>
                    <p><b>Endereço: </b>{`${formData.invoice.street}, ${formData.invoice.number}, ${formData.invoice.complement}`}</p>
                    <p><b>Bairro: </b>{formData.invoice.district}</p>
                    <p><b>Cidade: </b>{formData.invoice.city}</p>
                    <p><b>Estado: </b>{formData.invoice.state}</p>
                    <p><b>País: </b>{formData.invoice.country}</p>
                  </div>

                  <CheckBox required name="rd"><em>OK, corretas!</em></CheckBox>  {/* Check invoice */}
                </div>
              </fieldset>

              <button className="link" type="button" onClick={handleGoBack} ><FiArrowLeft />Corrigir informações</button>

            </div>
          </main>

          <div className="right-bar">
            <CartList>
              <button type="submit">Finalizar compra</button>
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

      <Footer compact />
    </div>
  );
}

export default ShippingSelect;
