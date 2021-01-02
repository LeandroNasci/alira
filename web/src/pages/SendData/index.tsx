import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiMail, FiTruck, FiClipboard } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useShippingType } from '../../context/shippingType';
import { useShoppingCart } from '../../context/shoppingCart';
import { useFormData, FormData } from '../../context/formData';
import api from '../../services/api';
import { cepSanitization, cpfSanitization } from '../../utils/sanatizations';
import { cpfValidation } from '../../utils/validations';

import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import { CEPInput, CPFInput, PhoneInput } from '../../components/MaskedInputs';
import CartList from '../../components/CartList';
import Radio from '../../components/Radio';
import CheckBox from '../../components/CheckBox';
// import ToggleSwitch from '../../components/ToggleSwitch';

import progressImg from '../../assets/images/progress1.png';

import './styles.css';

function SendData() {
  //hocks
  const history = useHistory();
  const { formData, updateFormData } = useFormData();
  const { shipping, updateShipping } = useShippingType();
  const { calcCartSize, cartLength, cartWidth, cartHeight, cartWeight } = useShoppingCart();

  //states
  const [frete, setFrete] = useState(shipping.price);
  const [prasoFrete, setPrasoFrete] = useState(0);
  const [incompleteInvoiceCep,setIncompleteInvoiceCep] = useState(false);
  const [incompleteShippingCep,setIncompleteShippingCep] = useState(false);
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(true);
  // const [isCnpjVisible, setIsCnpjVisible] = useState(false);
  const [isInvoiceAdressEqual, setIsInvoiceAdressEqual] = useState(false);

  const [email, setEmail] = useState(formData.email);
  const [phone, setPhone] = useState(formData.phone);
  const [cpf, setCpf] = useState(formData.cpf);
  const [cnpj, setCnpj] = useState(formData.cnpj);

  const [firstname, setFirstname] = useState(formData.shippingAddress.name);
  const [lastname, setLastname] = useState(formData.shippingAddress.lastname);
  const [cep, setCep] = useState(formData.shippingAddress.cep);
  const [street, setStreet] = useState(formData.shippingAddress.street);
  const [number, setNumber] = useState(formData.shippingAddress.number);
  const [complement, setComplement] = useState(formData.shippingAddress.complement);
  const [district, setDistrict] = useState(formData.shippingAddress.district);
  const [city, setCity] = useState(formData.shippingAddress.city);
  const [state, setState] = useState(formData.shippingAddress.state);
  const [country, setCountry] = useState(formData.shippingAddress.country);

  const [iFirstname, setIFirstname] = useState(formData.invoice.name);
  const [iLastname, setILastname] = useState(formData.invoice.lastname);
  const [iCep, setICep] = useState(formData.invoice.cep);
  const [iStreet, setIStreet] = useState(formData.invoice.street);
  const [iNumber, setINumber] = useState(formData.invoice.number);
  const [iComplement, setIComplement] = useState(formData.invoice.complement);
  const [iDistrict, setIDistrict] = useState(formData.invoice.district);
  const [iCity, setICity] = useState(formData.invoice.city);
  const [iState, setIState] = useState(formData.invoice.state);
  const [iCountry, setICountry] = useState(formData.invoice.country);


  useEffect(() => {
    if (isInvoiceAdressEqual) {
      setIFirstname(firstname);
      setILastname(lastname);
      setICep(cep);
      setIStreet(street);
      setINumber(number);
      setIComplement(complement);
      setIDistrict(district);
      setICity(city);
      setIState(state);
      setICountry(country);
    }
  }, [cep, city, complement, country, district, firstname, isInvoiceAdressEqual, lastname, number, state, street]);

  useEffect(() => {
    calcCartSize();
  }, [calcCartSize]);


  function handleContinue(event: FormEvent) {
    event.preventDefault();

    const params: FormData = {
      email,
      phone,
      cpf,
      cnpj,
      invoice: {
        name: iFirstname,
        lastname: iLastname,
        cep: iCep,
        street: iStreet,
        number: iNumber,
        complement: iComplement,
        district: iDistrict,
        city: iCity,
        state: iState,
        country: iCountry,
      },
      shippingAddress: {
        name: firstname,
        lastname,
        cep,
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
      },
    };

    updateFormData(params);
    history.replace("/shipping-select");
  }

  function handleToggleDeliveryVisible(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '1') { //correios
      setIsDeliveryVisible(true);
      updateShipping({
        category: 1,
        price: frete,
        days: prasoFrete
      });
    }
    else { //são carlos
      setIsDeliveryVisible(false);
      updateShipping({
        category: Number(event.target.value),
        price: 0,
        days: 0
      });

    }

    setIsInvoiceAdressEqual(false);
  }

  function handleToggleInvoiceForm(event: ChangeEvent<HTMLInputElement>) {
    setIsInvoiceAdressEqual(event.target.checked);
  }

  function handleValidateCpf(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value.includes('_') && event.target.value !== '') {
      setCpf(event.target.value);
      setCnpj(''); //desativado

      if (cpfValidation( cpfSanitization(event.target.value) )) {
        event.target.setCustomValidity('');
      }
      else {
        event.target.setCustomValidity('CPF inválido');
      }
    }
  }

  // function handleToggleDocumentType() {
  //   setIsCnpjVisible(event.target.checked);
  // }

  // function handleValidateCnpj(event: ChangeEvent<HTMLInputElement>) {
  //   if (!event.target.value.includes('_') && event.target.value !== '') {
  //     const b = cnpjValidation( cnpjSanitization(event.target.value) )

  //     if(b) {
  //       setCnpj(event.target.value);
  //       event.target.setCustomValidity('');
  //     }
  //     else {
  //       event.target.setCustomValidity('CPF inválido');
  //     }

  //   }
  // }

  async function handleInputInvoiceCep(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value.includes('_') && event.target.value !== '') {
      setICep(event.target.value);
      const param = cepSanitization(event.target.value);

      const response = await api.get(`/cep/${param}`);

      if(response.data.logradouro === "" || response.data.bairro === "" ) {
        setIncompleteInvoiceCep(true);
      }
      setIStreet(response.data.logradouro);
      setIDistrict(response.data.bairro);
      setICity(response.data.localidade);
      setIState(response.data.uf);
      setICountry('Brasil');
    }
  }

  async function handleInputShippingAddressCep(event: ChangeEvent<HTMLInputElement>) {

    if (!event.target.value.includes('_') && event.target.value !== '') {
      setCep(event.target.value);
      const cep = cepSanitization(event.target.value);

      const response = await api.get(`/cep/${cep}`);

      if(response.data.logradouro === "" || response.data.bairro === "" ) {
        setIncompleteShippingCep(true);
      }
      setStreet(response.data.logradouro);
      setDistrict(response.data.bairro);
      setCity(response.data.localidade);
      setState(response.data.uf);
      setCountry('Brasil');

      handleCalculateShippingCost(cep);
    }
  }

  async function handleCalculateShippingCost(cep: string) {
    const args = {
      sCepOrigem: process.env.REACT_APP_CEP_ORIGEM || '13561000',
      sCepDestino: cepSanitization(cep),
      nVlPeso: cartWeight,
      nCdFormato: '1',             //1:caixa  2:cilindro
      nVlComprimento: cartLength,
      nVlAltura: cartHeight,
      nVlLargura: cartWidth,
      nCdServico: ["04510"],       //PAC
      nVlDiametro: '0',
    };

    try {
      const response = await api.post('/preco', args);
      setFrete(Number(response.data[0].Valor.replace(",", ".")) * 0.9);
      setPrasoFrete(Number(response.data[0].PrazoEntrega));

      updateShipping({
        ...shipping,
        price: Number(response.data[0].Valor.replace(",", ".")) * 0.9,
        days: Number(response.data[0].PrazoEntrega)
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="page-send-data" className="container">
      <PageHeader compact />

      <img className="progress" src={progressImg} alt="Etapa 1 de 3" />

      <div className="send-data-content">

        <form onSubmit={handleContinue}>
          <main>
            <div id="user-contact" className="form-group">
              <fieldset>
                <legend>
                  <FiMail size={24} /><h3>Meus dados para Contato</h3>
                </legend>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="E-mail: (ex: exemplo@gmail.com)"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
                <PhoneInput
                  required
                  name="phone"
                  placeholder="Celular"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                />
              </fieldset>
            </div>

            <div className="send-type">
              <Radio required name="send-type" value="3" onChange={handleToggleDeliveryVisible}>
                <b>Retirar os produtos diretamento com o VENDEDOR</b>
                <span>(Caso resida em São Carlos-SP)</span>
              </Radio>
              <Radio required name="send-type" value="1" onChange={handleToggleDeliveryVisible}>
                <b>Receber os produtos em casa pelos </b><em>CORREIOS</em>
                <span>(Informe o endereço de entrega a seguir)</span>
              </Radio>
            </div>

            {isDeliveryVisible && (
              <div id="delivery-adress" className="form-group">
                <fieldset >
                  <legend>
                    <FiTruck size={24} /><h3>Nome e Endereço de Entrega</h3>
                  </legend>
                  <Input
                    required
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={firstname}
                    onChange={event => setFirstname(event.target.value)}
                  />
                  <Input
                    required
                    type="text"
                    name="lastname"
                    placeholder="Sobrenome"
                    value={lastname}
                    onChange={event => setLastname(event.target.value)}
                  />
                  <CEPInput
                    required
                    name="cep"
                    placeholder="CEP"
                    value={cep}
                    onChange={handleInputShippingAddressCep}
                  />
                  <div className="field-group">
                    <Input
                      required
                      type="text"
                      name="street"
                      placeholder="Endereço"
                      readOnly={!incompleteShippingCep}
                      value={street}
                      onChange={event => setStreet(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="number"
                      placeholder="Número"
                      value={number}
                      onChange={event => setNumber(event.target.value)}
                    />
                  </div>
                  <Input
                    required
                    type="text"
                    name="complement"
                    placeholder="Complemento (ex: casa, apart. nº 3, etc.)"
                    value={complement}
                    onChange={event => setComplement(event.target.value)}
                  />
                  <Input
                    required
                    type="text"
                    name="district"
                    placeholder="Bairro"
                    readOnly={!incompleteShippingCep}
                    value={district}
                    onChange={event => setDistrict(event.target.value)}
                  />
                  <div className="field-group">
                    <Input
                      required
                      type="text"
                      name="city"
                      placeholder="Cidade"
                      readOnly={!incompleteShippingCep}
                      value={city}
                      onChange={event => setCity(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="state"
                      placeholder="Estado"
                      readOnly={!incompleteShippingCep}
                      value={state}
                      onChange={event => setState(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="country"
                      placeholder="País"
                      readOnly={!incompleteShippingCep}
                      value={country}
                      onChange={event => setCountry(event.target.value)}
                    />
                  </div>
                </fieldset>
              </div>
            )}

            <div className="form-group">

              <fieldset>
                <legend>
                  <FiClipboard size={24} /><h3>Dados para a Nota Fiscal</h3>
                </legend>
                <div className="toggle-group">
                  <CPFInput
                    required
                    type="text"
                    name="CPF"
                    placeholder="CPF"
                    value={cpf}
                    onChange={handleValidateCpf}
                    />
                   {/*!isCnpjVisible ? (
                    <CPFInput
                    required
                    type="text"
                    name="CPF"
                    placeholder="CPF"
                    value={cpf}
                    onChange={handleValidateCpf}
                    />
                  ) : (
                    <CNPJInput
                    required
                    type="text"
                    name="CNPJ"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={handleValidateCnpj}
                    />
                  )*/}
                  {/* <ToggleSwitch name="doc" onChange={handleToggleDocumentType} /> */}
                  {/* <i>CPF<br/>CNPJ</i> */}
                </div>
                {isDeliveryVisible && (
                  <CheckBox name="repeat" onChange={handleToggleInvoiceForm} >
                    Minhas informações da Nota Fiscal e da Entrega são as mesmas
                  </CheckBox>
                )}
                {!isInvoiceAdressEqual && (
                  <div id="invoice-adress" >
                    <Input
                      required
                      type="text"
                      name="iname"
                      placeholder="Nome"
                      value={iFirstname}
                      onChange={event => setIFirstname(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="ilastname"
                      placeholder="Sobrenome"
                      value={iLastname}
                      onChange={event => setILastname(event.target.value)}
                    />
                    <CEPInput
                      required
                      name="icep"
                      placeholder="CEP"
                      value={iCep}
                      onChange={handleInputInvoiceCep}
                    />

                    <div className="field-group">
                      <Input
                        required
                        type="text"
                        name="istreet"
                        placeholder="Endereço"
                        readOnly={!incompleteInvoiceCep}
                        value={iStreet}
                        onChange={event => setIStreet(event.target.value)}
                      />
                      <Input
                        required
                        type="text"
                        name="inumber"
                        placeholder="Número"
                        value={iNumber}
                        onChange={event => setINumber(event.target.value)}
                      />
                    </div>
                    <Input
                      required
                      type="text"
                      name="icomplement"
                      placeholder="Complemento: (ex: casa, apart. nº 3, fundos, etc.)"
                      value={iComplement}
                      onChange={event => setIComplement(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="idistrict"
                      placeholder="Bairro"
                      readOnly={!incompleteInvoiceCep}
                      value={iDistrict}
                      onChange={event => setIDistrict(event.target.value)}
                    />
                    <div className="field-group">
                      <Input
                        required
                        type="text"
                        name="icity"
                        placeholder="Cidade"
                        readOnly={!incompleteInvoiceCep}
                        value={iCity}
                        onChange={event => setICity(event.target.value)}
                      />
                      <Input
                        required
                        type="text"
                        name="istate"
                        placeholder="Estado"
                        readOnly={!incompleteInvoiceCep}
                        value={iState}
                        onChange={event => setIState(event.target.value)}
                      />
                      <Input
                        required
                        type="text"
                        name="icountry"
                        placeholder="País"
                        readOnly={!incompleteInvoiceCep}
                        value={iCountry}
                        onChange={event => setICountry(event.target.value)}
                      />
                    </div>
                  </div>
                )}
              </fieldset>

            </div>
          </main>

          <div className="right-bar">
            <CartList>
              <button type="submit">Continuar</button>
            </CartList>
          </div>

        </form>

      </div>
      <img className="progress" src={progressImg} alt="Etapa 1 de 3" />

      <Footer compact />
    </div>
  );
}

export default SendData;
