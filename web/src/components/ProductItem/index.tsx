import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useShoppingCart } from '../../context/shoppingCart';
import toReal from '../../utils/toReal';

import './styles.css';

interface ProductItemProps {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image: {
    url: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({id, code, name, price, quantity, stock, image }) => {
  const [counter,setCounter] = useState(quantity);

  const shopingCart = useShoppingCart();

  function handleAddCounter() {
    if(counter < stock) {
      shopingCart.addItem(code);
      setCounter(counter + 1);
    }
    else {
      alert('limite disponivel no estoque.');
    }
  }

  function handleSubCounter() {
    if(counter > 1){
      shopingCart.subItem(code);
      setCounter(counter - 1);
    }
  }

  function handleDeleteItem() {
    shopingCart.deleteItem(code);
  }

  return (
    <div id="product-item">
      <div className="image-container">
        <img src={image.url} alt={code}/>
      </div>

      <div className="description-container">
        {/* <strong>{name}</strong> */}
        <strong><Link to={`/details/${id}`}>{name}</Link></strong>
        <span>
          {toReal(price)}
        </span>
      </div>

      <div className="button-container">
        <button type="button" onClick={handleDeleteItem}>
          <FiTrash2 />
        </button>
      </div>

      <div className="quantity">
        <span>Quantidade</span>
        <div>
          <button onClick={handleSubCounter}>
            <FiMinus />
          </button>
          <h6>{counter}</h6>
          <button onClick={handleAddCounter}>
            <FiPlus />
          </button>
        </div>
      </div>

      <div className="subtotal">
        <h5>Subtotal do produto</h5>
        <em>{toReal(price * counter)}</em>
      </div>
    </div>
  );
}

export default ProductItem;
