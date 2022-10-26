/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import HomeProducts from '../components/HomeProducts';
import Sale from '../components/Sale';
import Context from '../context/Context';
// A função fetchContent é responsável por fazer o fetch das informações
import fetchContent from '../services/fetchContent';
import mainAndSubCategories from '../services/mainAndSubCategories';

export default function Home() {
  const {
    products,
    setProducts,
    categories,
    setCategories,
  } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProducts = async () => {
      const productsResponse = await fetchContent('products');
      const categoriesResponse = await fetchContent('categories');

      if (productsResponse) setProducts(productsResponse);
      if (categoriesResponse) setCategories(categoriesResponse);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (categories) console.log('Objeto das categorias', mainAndSubCategories(categories));
    if (products) console.log('Objeto dos produtos', products);
  }, [products, categories]);

  return (
    <>
      <section>
        <Sale />
      </section>
      <section>
        <HomeProducts products={ products } />
      </section>
    </>
  );
}
