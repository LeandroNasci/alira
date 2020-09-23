import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Product from '../../components/Product';
import Footer from '../../components/Footer';

import bannerImg from '../../assets/images/banner.png';

import './styles.css';

function Home() {
  return (
    <div id="page-home" className="container">

      <PageHeader />

      <div className="banner">
        <img src={bannerImg} alt="banner"/>
      </div>

      <h1>PRODUTOS</h1>

      <div id="page-home-content">

        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>
        <Link to="/details"> <Product /> </Link>

      </div>

      <Footer />

    </div>
  );
}

export default Home;
