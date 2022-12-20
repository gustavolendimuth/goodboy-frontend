/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';

const useCartItems = () => {
  const {
    setCartItems,
    cartItems,
    setLocalStorageIsReady,
  } = useContext(Context);

  useEffect(() => {
    if (cartItems?.length) {
      setLocalStorage('cart', cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    const cart = getLocalStorage('cart');
    if (cart) {
      setCartItems(cart);
    }

    setLocalStorageIsReady(true);
  }, []);
};

export default useCartItems;
