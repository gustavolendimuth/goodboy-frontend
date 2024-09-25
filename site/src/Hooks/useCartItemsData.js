/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import fetchContent from '../utils/fetchContent';

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
    console.log('teste', cartItems, cartLocalStorage);
    if (cartItems?.length && cartLocalStorage) {
      const getCartItemsData = async () => {
        setLoading((prevLoading) => prevLoading + 1);
        const items = cartItems.map((item) => item.id);
        const response = await fetchContent({ query: 'product', id: items });
        console.log('fetchContent', response);
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
