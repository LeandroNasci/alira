import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import CartItem from '../../components/CartItem';
import toReal from '../../utils/toReal';
import { useShoppingCart } from '../../context/shoppingCart';
import { useShippingType } from '../../context/shippingType';

import './styles.css'

const CartList: React.FC = ({ children }) => {
  const [cartValue,setCartValue] = useState(0);

  const { addedItems } = useShoppingCart();
  const { shipping } = useShippingType();

  useEffect(() => {

    if(addedItems.length !== 0) {
      const subtotalList = addedItems.map(item =>item.price*item.quantity);
      const total = subtotalList.reduce((total, currentItem) => total + currentItem);
      setCartValue(total);
    }



  },[addedItems]);

  return (
    <div className="cart-list">
      <header><FiShoppingCart /><h4>Carrinho com seus pedidos</h4></header>

      {addedItems.map((item) => {
        return (
          <CartItem item={item}/>
        );
      })}

      <div className="cart-value"><h5>Valor do Carrinho</h5> <span>{toReal(cartValue)}</span></div>
      <div className="shipping-value"><h5>Valor do Frete</h5> <span>{toReal(shipping.price)}</span></div>
      <div className="total-value"><h5>Total</h5> <span>{toReal(cartValue + shipping.price)}</span></div>
      {children}
    </div>
  );
}

export default CartList;
