/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import fetchContent from '../utils/fetchContent';
import random from '../utils/random';

export default function useSaleAndSpotlight() {
  const { salesAndSpotlight, setSalesAndSpotlights, setLoading } = useContext(Context);

  useEffect(() => {
    const getSalesAndSpotlight = async () => {
      setLoading((prevLoading) => prevLoading + 1);
      const response = await fetchContent({ query: 'saleAndSpotlight' });
      const sales = response.filter((product) => product.sale);
      const spotlights = response.filter((product) => product.spotlight);
      const result = { sales: random(sales, 4), spotlight: random(spotlights, 4) };
      if (result) setSalesAndSpotlights(result);
      setLoading((prevLoading) => prevLoading - 1);
    };
    if (!salesAndSpotlight) getSalesAndSpotlight();
  }, []);
}
