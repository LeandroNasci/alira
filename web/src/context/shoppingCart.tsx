import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
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
  cartLength: number;
  cartWidth: number;
  cartHeight: number;
  cartWeight: number;
  createItem(item: CartItem): boolean;
  deleteItem(code: string): boolean;
  addItem(code: string): void;
  subItem(code: string): void;
  calcCartSize(): void;
}

/* provide the initial value of the context */
const ShoppingCartContext = createContext<ShoppingCartContext | null>(null);


/* define provider functions  */
const ShoppingCartProvider: React.FC = ({ children }) => {
  const [addedItems,setAddedItems] = useState<CartItem[]>([]);
  const [cartLength,setCartLength] = useState<number>(-1);
  const [cartWidth ,setCartWidth] = useState<number>(-1);
  const [cartHeight,setCartHeight] = useState<number>(-1);
  const [cartWeight,setCartWeight] = useState<number>(-1);


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
    if(addedItems.length ===1 ) {
      setAddedItems([]);
      return true;
    }
    setAddedItems( state => state.filter(item => item.code !== code) );
    return true;
  },[addedItems.length])

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


  //calcula o tamanho da embalagem necessaria para enviar o carrinho atual
  const calcCartSize = useCallback( () => {

    if(addedItems.length > 0){
      const lengthArray = addedItems.map(item => Number(item.length));
      const length = Math.ceil(lengthArray.reduce( (a, c) => Math.max(a, c) ));
      setCartLength( length<16 ? 16 : length);


      const widthArray = addedItems.map(item => Number(item.width));
      const width = Math.ceil(widthArray.reduce( (a, c) => Math.max(a, c) ));
      setCartWidth(width<11 ? 11 : width);


      const heightArray = addedItems.map(item => {
        return({
          height: Number(item.height),
          quantity: Number(item.quantity)
        });
      });
      const height = Math.ceil(heightArray
        .reduce((total, current) => (total + current.height*current.quantity ), 0)
      );
      setCartHeight(height<2 ? 2 : height);


      const weightArray = addedItems.map(item => {
        return({
          weight: Number(item.weight),
          quantity: Number(item.quantity)
        });
      });

      const weight = Math.ceil(weightArray
        .reduce((total, current) => (total + current.weight*current.quantity ), 0)
      );
      setCartWeight(weight<1 ? 1 : weight);
    }
    else {
      setCartLength(0);
      setCartWidth(0);
      setCartHeight(0);
      setCartWeight(0);
    }

    return;
  }, [addedItems])


  return (
    <ShoppingCartContext.Provider value={{
      addedItems,
      cartLength,
      cartWidth,
      cartHeight,
      cartWeight,
      createItem,
      deleteItem,
      addItem,
      subItem,
      calcCartSize
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
