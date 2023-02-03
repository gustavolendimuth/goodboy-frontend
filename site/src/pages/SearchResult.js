/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../components/Products';
import Context from '../context/Context';
import fetchContent from '../services/fetchContent';

export default function SearchResult() {
  const { categories, allCategories, setLoading } = useContext(Context);
  const { searchInput } = useParams();
  // const [categoryNames, setCategoryNames] = useState();
  const [filteredProducts, setFilteredProducts] = useState();

  // const getCategoryName = (category) => {
  //   const categoryFound = allCategories.find((cat) => cat.slug.current === category);
  //   return categoryFound.name;
  // };

  const getProductsBySearch = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const response = await fetchContent({ query: 'searchProducts', searchInput });
    setFilteredProducts(response);
    setLoading((prevLoading) => prevLoading - 1);
  };

  console.log(searchInput);

  useEffect(() => {
    if (searchInput) getProductsBySearch();
  }, [searchInput]);

  if (!categories || !searchInput || !allCategories || !filteredProducts) return null;

  return (
    <section className="container">
      <div className="section-title pt-5 pb-0 text-center">
        <h1>
          {`Busca por: ${searchInput}`}
        </h1>
        { filteredProducts.length !== 0 ? null : <h2>Produto não encontrado</h2> }
      </div>
      <Products products={ filteredProducts } />
    </section>
  );
}
