import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

import CartItem from '../../components/CartItem';

import './styles.css'

const CartList: React.FC = ({ children }) => {
  return (
    <div className="cart-list">
      <header><FiShoppingCart /><h4>Carrinho com seus pedidos</h4></header>

      <CartItem />
      <CartItem />
      <CartItem />

      <div className="cart-value"><h5>Valor do Carrinho</h5> <span>R$ 128,20</span></div>
      <div className="shipping-value"><h5>Valor do Frete</h5> <span>R$ 21,93</span></div>
      <div className="total-value"><h5>Total</h5> <span>R$ 149,73</span></div>
      {children}
    </div>
  );
}

export default CartList;
