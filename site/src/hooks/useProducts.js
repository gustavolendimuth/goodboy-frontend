/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import fetchContent from '../services/fetchContent';

export default function useProducts() {
  const { setProducts, products, setLoading } = useContext(Context);

  useEffect(() => {
    const getProducts = async () => {
      setLoading((prevLoading) => prevLoading + 1);
      const response = await fetchContent({ query: 'products' });
      if (response) setProducts(response);
      setLoading((prevLoading) => prevLoading - 1);
    };
    if (!products) getProducts();
  }, []);
}
