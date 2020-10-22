import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import ImagesCarousel from '../../components/ImagesCarousel';
import Product from '../../components/Product';
import api from '../../services/api';

import aliraNotesIcon from '../../assets/images/icons/cat.svg';

import './styles.css';

interface Product {
  code: string;
  category: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: Array<{
    url: string;
  }>;
}

interface ProductParams {
  id: string;
}

function Details() {

  const params = useParams<ProductParams>();
  const history = useHistory();

  const [product,setProduct] = useState<Product>();


  useEffect(() => {
     api.get(`/products/${params.id}`).then(response => {
      setProduct(response.data);
    })
  },[params.id]);

  if(!product) {
    return <p>Carregando...</p>
  }

  function handleWantProduct() {
    history.push('/cart');
  }

  return (
    <div id="page-details" className="container">
      <PageHeader/>

      <main>
        <article className="detail-item">
          <header>
            <h2>{product.name}</h2>
          </header>

          <div className="detail-content">
            <div className="detail-preview">
              <ImagesCarousel images={product.images} />
            </div>
            <div className="detail-description">
              <h4>DESCRIÇÃO DO PRODUTO</h4>

              <div className="detail-background">
                <p>{product.description}</p>
                <div>
                  <img src={aliraNotesIcon} alt="logo"/>
                  <span>
                  { Intl.NumberFormat('pt-BR' , {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(product.price) }
                  </span>
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
