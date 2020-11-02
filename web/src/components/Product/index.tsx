import React from 'react';
import toReal from '../../utils/toReal';

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
      <h4>{toReal(props.price)}</h4>
    </div>
  );
}

export default Product;
