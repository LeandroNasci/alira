import React from 'react';
import { ShippingTypeProvider } from './shippingType';
import { ShoppingCartProvider } from './shoppingCart';
import { FormDataProvider } from './formData';

const AppProvider: React.FC = ({children}) => {
  return (
    <ShoppingCartProvider>
      <ShippingTypeProvider>
        <FormDataProvider>
          {children}
        </FormDataProvider>
      </ShippingTypeProvider>
    </ShoppingCartProvider>
  );
}

export default AppProvider;
