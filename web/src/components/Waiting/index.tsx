import React from 'react';

import progressImg from '../../assets/images/progress3.png';
import pagSeguroImg from '../../assets/images/logo-pagseguro.png'
import aliraNotesIcon from '../../assets/images/icons/cat.svg';


import './styles.css';

const Waiting: React.FC = () => {
  return (
    <>
      <img className="progress" src={progressImg} alt="Etapa 2 de 3"/>
      <div className="waiting-content">
        <h3>Espere só um pouquinho :) ...</h3>
        <strong>Você está sendo redirecionado para a página de checkout do <em>PagSeguro</em>! (Uma forma muito mais segura de fazer suas compras on line)</strong>
        <img src={pagSeguroImg} alt="PagSeguro" className="pagseguro" />
        <img src={aliraNotesIcon} alt="Alira Notes" className="icon" />
      </div>
      <img className="progress" src={progressImg} alt="Etapa 2 de 3"/>
    </>
  );
}

export default Waiting;
