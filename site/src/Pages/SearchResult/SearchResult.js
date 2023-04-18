/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Components/Products/Products';
import Context from '../../Context/Context';
import fetchContent from '../../utils/fetchContent';

export default function SearchResult() {
  const { categories, allCategories, setLoading } = useContext(Context);
  const { searchInput } = useParams();
  const [filteredProducts, setFilteredProducts] = useState();

  const getProductsBySearch = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const response = await fetchContent({ query: 'searchProducts', searchInput });
    setFilteredProducts(response);
    setLoading((prevLoading) => prevLoading - 1);
  };

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
