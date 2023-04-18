/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const useCartLocalStorage = () => {
  const {
    setCartItems,
    cartItems,
    setCartLocalStorage,
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

    setCartLocalStorage(true);
  }, []);
};

export default useCartLocalStorage;
