import React from 'react';
import toReal from '../../utils/toReal';

import './styles.css';

interface CartItemProps {
  item: {
    quantity: number;
    code: string;
    name: string;
    price: number;
    images: Array<{
      url: string;
    }>;
  };
}

const CartItem: React.FC<CartItemProps> = ({item}) => {

  return (
    <div id="cart-item">
      <div className="item-times">{item.quantity}x</div>
      <img src={item.images[0].url} alt={item.code}/>
      <div className="item-info">
        <p>{item.name}</p>
        <strong>{toReal(item.price * item.quantity)}</strong>
      </div>
    </div>
  );
}

export default CartItem;
