/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import categoriesFormatter from '../utils/categoriesFormatter';
import fetchContent from '../utils/fetchContent';

function useCategories() {
  const {
    setCategories,
    categories,
    setLoading,
    allCategories,
    setAllCategories,
  } = useContext(Context);

  const getCategories = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const categoriesResponse = await fetchContent({ query: 'categories' });
    if (categoriesResponse && !categories) setCategories(categoriesFormatter(categoriesResponse));

    const allCategoriesResponse = await fetchContent({ query: 'allCategories' });
    if (allCategoriesResponse && !allCategories) setAllCategories(allCategoriesResponse);
    setLoading((prevLoading) => prevLoading - 1);
  };

  useEffect(() => {
    if (!categories) getCategories();
  }, []);
}

export default useCategories;
