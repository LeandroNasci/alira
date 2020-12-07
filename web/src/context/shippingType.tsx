import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Shipping {
  category: number;
  price: number;
  days: number;
}

interface ShippingTypeContext {
  shipping: Shipping;
  updateShipping(object: Shipping): void;
}

/* provide the initial value of the context */
const ShippingTypeContext = createContext<ShippingTypeContext | null>(null);


/* define provider functions  */
const ShippingTypeProvider: React.FC = ({ children }) => {
  const [shipping,setShipping] = useState<Shipping>({ category: 1, price: 1, days: 8 });

  const updateShipping = useCallback((object: Shipping) => {
    setShipping( object );
  },[])

  return (
    <ShippingTypeContext.Provider value={{
      shipping,
      updateShipping,
    }}>
      {children}
    </ShippingTypeContext.Provider>
  );
}

/* use hook context */
function useShippingType(): ShippingTypeContext {
  const context = useContext(ShippingTypeContext)

  if (!context) {
    throw new Error('useShippingType must be used within a ShippingTypeProvider')
  }

  return context;
}

export { ShippingTypeProvider, useShippingType };
