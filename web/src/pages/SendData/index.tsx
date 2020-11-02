import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiMail, FiTruck, FiClipboard } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { CEPInput, CNPJInput, CPFInput, PhoneInput } from '../../components/MaskedInputs';

import progressImg from '../../assets/images/progress1.png';
import CartList from '../../components/CartList';
import Radio from '../../components/Radio';
import CheckBox from '../../components/CheckBox';

import './styles.css';

function SendData() {
  const [isDeliveryVisible,setIsDeliveryVisible] = useState(true);
  const [isInvoiceAdressEqual,setIsInvoiceAdressEqual] = useState(false);

  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [shippingType,setShippingType] = useState('1');
  const [cpf,setCpf] = useState('');
  const [cnpj,setCnpj] = useState('');

  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [cep,setCep] = useState('');
  const [street,setStreet] = useState('');
  const [number,setNumber] = useState('');
  const [complement,setComplement] = useState('');
  const [district,setDistrict] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [country,setCountry] = useState('');

  const [iFirstname,setIFirstname] = useState('');
  const [iLastname,setILastname] = useState('');
  const [iCep,setICep] = useState('');
  const [iStreet,setIStreet] = useState('');
  const [iNumber,setINumber] = useState('');
  const [iComplement,setIComplement] = useState('');
  const [iDistrict,setIDistrict] = useState('');
  const [iCity,setICity] = useState('');
  const [iState,setIState] = useState('');
  const [iCountry,setICountry] = useState('');

  const history = useHistory()

  function handleContinue(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      phone,
      shippingType,
      cpf,
      cnpj,
      firstname,
      lastname,
      cep,
      street,
      number,
      complement,
      district,
      city,
      state,
      country,
      iFirstname,
      iLastname,
      iCep,
      iStreet,
      iNumber,
      iComplement,
      iDistrict,
      iCity,
      iState,
      iCountry,
    };

    console.log(data);


  }

  function handleToggleDeliveryVisible (event: ChangeEvent<HTMLInputElement> ) {
    setIsDeliveryVisible( event.target.value === '1' ? true : false );
    setShippingType(event.target.value);
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

        <form onSubmit={handleContinue}>
          <main>
            <div id="user-contact" className="form-group">
              <fieldset>
                <legend>
                  <FiMail /><h3>Meus dados para Contato</h3>
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

            { isDeliveryVisible && (
              <div id="delivery-adress" className="form-group">
                <fieldset >
                  <legend>
                    <FiTruck /><h3>Nome e Endereço de Entrega</h3>
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
                    onChange={event => setCep(event.target.value)}
                  />
                  <div className="field-group">
                    <Input
                      required
                      type="text"
                      name="street"
                      placeholder="Endereço"
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
                    value={district}
                    onChange={event => setDistrict(event.target.value)}
                  />
                  <div className="field-group">
                    <Input
                      required
                      type="text"
                      name="city"
                      placeholder="Cidade"
                      value={city}
                      onChange={event => setCity(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="state"
                      placeholder="Estado"
                      value={state}
                      onChange={event => setState(event.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      name="country"
                      placeholder="País"
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
                  <FiClipboard /><h3>Dados para a Nota Fnameiscal</h3>
                </legend>
                <div className="field-group">
                  <CPFInput
                    type="text"
                    name="CPF"
                    placeholder="CPF"
                    value={cpf}
                    onChange={event => setCpf(event.target.value)}
                  />
                  <CNPJInput
                    type="text"
                    name="CNPJ"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={event => setCnpj(event.target.value)}
                  />
                </div>
                { isDeliveryVisible && (
                  <CheckBox name="repeat" onChange={ handleToggleInvoiceForm } >
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
                      onChange={event => setICep(event.target.value)}
                    />

                    <div className="field-group">
                      <Input
                        required
                        type="text"
                        name="istreet"
                        placeholder="Endereço"
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
                      value={iDistrict}
                      onChange={event => setIDistrict(event.target.value)}
                    />
                    <div className="field-group">
                      <Input
                        required
                        type="text"
                        name="icity"
                        placeholder="Cidade"
                        value={iCity}
                        onChange={event => setICity(event.target.value)}
                      />
                      <Input
                        required
                        type="text"
                        name="istate"
                        placeholder="Estado"
                        value={iState}
                        onChange={event => setIState(event.target.value)}
                      />
                      <Input
                        required
                        type="text"
                        name="icountry"
                        placeholder="País"
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
      <img className="progress" src={progressImg} alt="Etapa 1 de 3"/>

    </div>
  );
}

export default SendData;
