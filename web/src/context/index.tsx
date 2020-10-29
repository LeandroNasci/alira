import React from 'react';
import { ShippingTypeProvider } from './shippingType';
import { ShoppingCartProvider } from './shoppingCart';

const AppProvider: React.FC = ({children}) => {
  return (
    <ShoppingCartProvider>
      <ShippingTypeProvider>
        {children}
      </ShippingTypeProvider>
    </ShoppingCartProvider>
  );
}

export default AppProvider;
