/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Banner from '../components/Banner';
import Sale from '../components/Sale';
import Spotlight from '../components/Spotlight';
import Context from '../context/Context';
// A função fetchContent é responsável por fazer o fetch das informações
import fetchContent from '../services/fetchContent';
// A função transforma formatCategoriesObject o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()
import formatCategoriesObject from '../services/formatCategoriesObject';

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

      if (productsResponse) setProducts(productsResponse);
    };

    const getCategories = async () => {
      const categoriesResponse = await fetchContent('categories');

      if (categoriesResponse) setCategories(formatCategoriesObject(categoriesResponse));
    };

    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (categories) console.log('Objeto das categorias', categories);
    if (products) console.log('Objeto dos produtos', products);
  }, [products, categories]);

  return (
    <>
      <section>
        <Sale />
      </section>
      <section>
        <Spotlight />
      </section>
      <section>
        <Banner />
      </section>
    </>
  );
}
