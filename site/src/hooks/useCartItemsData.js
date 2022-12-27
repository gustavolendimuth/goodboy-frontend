/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import fetchContent from '../services/fetchContent';

const useCartItemsData = () => {
  const {
    cartItems,
    cartItemsData,
    setCartItemsData,
    setLoading,
    cartLocalStorage,
    setTotal,
  } = useContext(Context);

  useEffect(() => {
    if (cartItems?.length && cartLocalStorage) {
      const getCartItemsData = async () => {
        setLoading((prevLoading) => prevLoading + 1);
        const items = cartItems.map((item) => item.id);
        const response = await fetchContent('product', items);
        setCartItemsData(response);
        setLoading((prevLoading) => prevLoading - 1);
      };
      getCartItemsData();
    }
  }, [cartLocalStorage, cartItems]);

  useEffect(() => {
    if (cartItemsData) {
      setTotal(cartItemsData
        .reduce((acc, curr) => acc + (cartItems.find((item) => item.id === curr._id)?.quantity * curr.price), 0));
    }
  }, [cartItemsData]);
};

export default useCartItemsData;
