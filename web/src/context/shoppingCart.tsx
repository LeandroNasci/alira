import React, { createContext, useContext, useState, useCallback } from 'react';

interface CartItem {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  images: Array<{
    url: string;
  }>;
}

interface ShoppingCartContext {
  addedItems: CartItem[];
  createItem(item: CartItem): boolean;
  deleteItem(code: string): boolean;
  addItem(code: string): void;
  subItem(code: string): void;
}

/* provide the initial value of the context */
const ShoppingCartContext = createContext<ShoppingCartContext | null>(null);


/* define provider functions  */
const ShoppingCartProvider: React.FC = ({ children }) => {
  const [addedItems,setAddedItems] = useState<CartItem[]>([]);

  //Adicionar novo produto pela pagina de Detalhes
  const createItem = useCallback((product: CartItem) => {
    const itemIndex = addedItems.findIndex(item => item.code === product.code)

    if(itemIndex===-1) {
      setAddedItems([ ...addedItems, product ]);
      return true;
    }
    return false;
  },[addedItems])

  //Apagar um produto do carrinho pelo botao da lixeira
  const deleteItem = useCallback(code => {
    setAddedItems( state => state.filter(item => item.code !== code) );
    return true;
  },[])

  //Aumentar a quantidade de um mesmo produto que ja existe no carrinho
  const addItem = useCallback(code => {
    const itemIndex = addedItems.findIndex( item => item.code === code );
    const updatedItem = { ...addedItems[itemIndex], quantity: addedItems[itemIndex].quantity + 1 }
    setAddedItems(addedItems.map((item, index) => {
      return (itemIndex === index ? updatedItem : item)
    }));
  },[addedItems])

  //Diminuir a quantidade de um mesmo produto que ja existe no carrinho
  const subItem = useCallback(code => {
    const itemIndex = addedItems.findIndex( item => item.code === code );
    const updatedItem = { ...addedItems[itemIndex], quantity: addedItems[itemIndex].quantity - 1 }
    setAddedItems(addedItems.map((item, index) => {
      return (itemIndex === index ? updatedItem : item)
    }));
  },[addedItems])


  return (
    <ShoppingCartContext.Provider value={{
      addedItems,
      createItem,
      deleteItem,
      addItem,
      subItem
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

/* use hook context */
function useShoppingCart(): ShoppingCartContext {
  const context = useContext(ShoppingCartContext)

  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider')
  }

  return context;
}

export { ShoppingCartProvider, useShoppingCart };
