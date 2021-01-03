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
        <h3>Hey! Estamos quase lá...</h3>
        <strong>Você está sendo redirecionado para a página do <em>PagSeguro</em>!</strong>
        <br />
        <strong>São só 10 segundos :)</strong>
        <img src={pagSeguroImg} alt="PagSeguro" className="pagseguro" />
        <img src={aliraNotesIcon} alt="Alira Notes" className="icon" />
      </div>
      <img className="progress" src={progressImg} alt="Etapa 2 de 3"/>
    </>
  );
}

export default Waiting;
