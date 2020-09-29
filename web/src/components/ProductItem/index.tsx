import React from 'react';

import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

import './styles.css';

function ProductItem() {
  return (
    <div id="product-item">
      <div className="image-container">
        <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/caderno-de-anota_es-personalizado-mini-garden-01.jpg" alt="caderno"/>
      </div>

      <div className="description-container">
        <strong>Bloco de anotações com linhas tipo postite colorido varias cores</strong>
        <span>R$ 19,90</span>
      </div>

      <div className="button-container">
        <button>
          <FiTrash2 />
        </button>
      </div>

      <div className="quantity">
        <span>Quantidade</span>
        <div>
          <button className="add">
            <FiMinus />
          </button>
          <h6>9</h6>
          <button className="plus">
            <FiPlus />
          </button>
        </div>
      </div>

      <div className="subtotal">
        <h5>Subtotal do produto</h5>
        <em>R$ 39,80</em>
      </div>
    </div>
  );
}

export default ProductItem;
