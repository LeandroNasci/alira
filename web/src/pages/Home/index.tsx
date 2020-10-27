import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Product from '../../components/Product';
import Footer from '../../components/Footer';
import api from '../../services/api';

import bannerImg from '../../assets/images/banner.png';

import './styles.css';

interface Product {
  id: number;
  code: string;
  category: string;
  name: string;
  price: number;
  stock: number;
  images: Array<{
    url: string;
  }>;
}

function Home() {

  const [products,setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/products').then(response => {
      setProducts(response.data);
    });
  },[]);


  return (
    <div id="page-home" className="container">
      <PageHeader />

      <div className="banner">
        <img src={bannerImg} alt="banner"/>
      </div>
      <h1>PRODUTOS</h1>

      <div id="page-home-content">
        {products.map(product => {
          return (
            (product.stock !== 0) && (
              <Link key={product.code} to={`/details/${product.id}`}>
                <Product
                  image={product.images[0].url}
                  name={product.name}
                  price={product.price}
                />
              </Link>
            )
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
