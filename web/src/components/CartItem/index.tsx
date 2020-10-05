import React from 'react';

import './styles.css';

function CartItem() {
  return (
    <div id="cart-item">
      <div className="item-times">2x</div>
      <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/caderno-de-anota_es-personalizado-mini-garden-01.jpg" alt="foto do item"/>
      <div className="item-info">
        <p>Bloco de anotações super Jessica muito legal</p>
        <strong>R$ 19,90</strong>
      </div>
    </div>
  );
}

export default CartItem;
