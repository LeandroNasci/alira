import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Product from '../../components/Product';
import Footer from '../../components/Footer';
import api from '../../services/api';
import LoadingProduct from '../../components/Shimmer/LoadingProduct';
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

const Home: React.FC = () => {

  const query = new URLSearchParams(useLocation().search);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState(query.get("type"));

  useEffect(() => {
    setFilterType(query.get("type"));
  },[query])

  useEffect(() => {
    api.get('/products', {params: { type: filterType }}).then(response => {
      setProducts(response.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

  }, [filterType]);

  return (
    <div id="page-home" className="container">
      <PageHeader />

      <div className="banner">
        <img src={bannerImg} alt="banner" />
      </div>
      <h1>PRODUTOS</h1>

      <div id="page-home-content">
        {isLoading ? (
          <>
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
            <LoadingProduct />
          </>
        ) : (
            products.map(product => {
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
            })
          )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
