import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import ImagesCarousel from '../../components/ImagesCarousel';

import aliraNotesIcon from '../../assets/images/icons/cat.svg';

import './styles.css';

function Details() {

  const history = useHistory();

  function handleWantProduct() {

    history.push('/cart');
  }

  return (
    <div id="page-details" className="container">
      <PageHeader/>

      <main>
        <article className="detail-item">
          <header>
            <h2>Bloco de anotações com linhas tipo postite colorido</h2>
          </header>

          <div className="detail-content">
            <div className="detail-preview">
              <ImagesCarousel />
            </div>
            <div className="detail-description">
              <h4>DESCRIÇÃO DO PRODUTO</h4>

              <div className="detail-background">
                <p>Bloco de notas adesivos para escola e escritório,
                  material de papelaria com linhas, notas adesivas.<br /><br />
                  Material Papel,
                  Tamanho: cerca de 7.2x7cm,
                  Estilo de cor: mármore, cinza de cimento, vermelho listrado,
                  Páginas: cerca de 75 folhas (pode haver 1-3 folhas de erro)
                  Nome da etiqueta: almofada de memorando da textura da natureza

                  Bloco de notas adesivos para escola e escritório,
                  material de papelaria com linhas, notas adesivas.
                  Bloco de notas adesivos para escola e escritório,
                  material de papelaria com linhas, notas adesivas.<br /><br />
                  Material Papel,
                  Tamanho: cerca de 7.2x7cm,
                  Estilo de cor: mármore, cinza de cimento, vermelho listrado,
                  Páginas: cerca de 75 folhas (pode haver 1-3 folhas de erro)
                  Nome da etiqueta: almofada de memorando da textura da natureza
                  Bloco de notas adesivos para escola e escritório,
                  material de papelaria com linhas, notas adesivas.
                </p>
                <div>
                  <img src={aliraNotesIcon} alt="logo"/>
                  <span>R$19,90</span>
                </div>
              </div>

            </div>
          </div>

          <footer>
            <button type="button" onClick={handleWantProduct}>
              Eu quero :)
            </button>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default Details;
