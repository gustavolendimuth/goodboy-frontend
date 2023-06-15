/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import fetchContent from '../utils/fetchContent';

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
      if (cartLocalStorage || !cart) return;
      setLoading((prevLoading) => prevLoading + 1);
      const items = cart?.map((item) => item.id);
      const response = await fetchContent({ query: 'product', id: items });

      let newCartItems;
      if (cart && response && response.length !== cart.length) {
        newCartItems = cart.filter((item) => response.find((resItem) => resItem._id === item.id));
      }
      setCartItems(newCartItems || cart);
      setCartLocalStorage(true);
      setLoading((prevLoading) => prevLoading - 1);
    };
    getCartItems();
  }, []);
};

export default useCartLocalStorage;
