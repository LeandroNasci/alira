import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import ImagesCarousel from '../../components/ImagesCarousel';
import Product from '../../components/Product';
import api from '../../services/api';
import toReal from '../../utils/toReal';

import { useShoppingCart } from '../../context/shoppingCart'

import aliraNotesIcon from '../../assets/images/icons/cat.svg';

import './styles.css';

interface Product {
  code: string;
  category: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  weight : number;
  length : number;
  width : number;
  height : number;
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
  const { createItem, addedItems } = useShoppingCart();

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
    if(product){
      const addedCode = addedItems.filter(item => item.code === product.code)
      if(addedCode.length !== 0) {
        alert('este produto já está no carrinho.')
        return;
      }

      const newItem = {
        id: Number(params.id),
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        weight: product.weight,
        length: product.length,
        width: product.width,
        height: product.height,
        images: product.images,
      }
      createItem(newItem);

      history.push('/cart');
    }
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
                <img src={aliraNotesIcon} alt="logo"/>
                <em>Estoque disponível: {product.stock}</em>
                <span>
                  {toReal(product.price) }
                </span>
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
