/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import fetchContent from '../utils/fetchContent';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const useCartLocalStorage = () => {
  const {
    setCartItems,
    cartItems,
    setCartLocalStorage,
    cartLocalStorage,
    setLoading,
  } = useContext(Context);

  useEffect(() => {
    if (cartItems?.length) {
      setLocalStorage('cart', cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    const getCartItems = async () => {
      const cart = getLocalStorage('cart');
      if (cartLocalStorage || !cart) {
        setCartLocalStorage(true);
        return;
      }
      setLoading((prevLoading) => prevLoading + 1);
      const items = cart?.map((item) => item.id);
      const response = await fetchContent({ query: 'product', id: items });

      let newCartItems;
      if (cart && response && response.length !== cart.length) {
        newCartItems = cart.filter((item) => response.find((resItem) => resItem._id === item.id));
      }
      setCartLocalStorage(true);
      setCartItems(newCartItems || cart);
      setLoading((prevLoading) => prevLoading - 1);
    };
    getCartItems();
  }, []);
};

export default useCartLocalStorage;
