import React from 'react';

import './styles.css';

interface ProductProps {
  image: string;
  name: string;
  price: number;
}

function Product(props: ProductProps) {
  return (
    <div id="product">
      <img src={props.image} alt={props.name}/>
      <h5>{props.name}</h5>
      <h4>
        {Intl.NumberFormat('pt-BR' , {
        style: 'currency',
        currency: 'BRL'
        }).format(props.price)}
      </h4>
    </div>
  );
}

export default Product;
