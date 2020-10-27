import React from 'react';

import { ShoppingCartProvider } from './shoppingCart';

const AppProvider: React.FC = ({children}) => {
  return (
    <ShoppingCartProvider>
      {children}
    </ShoppingCartProvider>
  );
}

export default AppProvider;
