/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Components/Products/Products';
import Context from '../../Context/Context';
import fetchContent from '../../utils/fetchContent';

export default function Category() {
  const { categories, allCategories, setLoading } = useContext(Context);
  const { mainCategory, subCategory } = useParams();
  const [categoryNames, setCategoryNames] = useState();
  const [filteredProducts, setFilteredProducts] = useState();

  const getCategoryName = (category) => {
    const categoryFound = allCategories.find((cat) => cat.slug.current === category);
    return categoryFound.name;
  };

  const getProductsByCategory = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const response = await fetchContent({ query: 'productsByCategory', mainCategory, subCategory });
    setFilteredProducts(response);
    setLoading((prevLoading) => prevLoading - 1);
  };

  useEffect(() => {
    if (allCategories && mainCategory) {
      setCategoryNames({
        mainCategory: getCategoryName(mainCategory),
        subCategory: getCategoryName(subCategory),
      });
    }

    if (mainCategory) getProductsByCategory();
  }, [mainCategory, subCategory, allCategories]);

  if (!categories || !mainCategory || !allCategories || !filteredProducts) return null;

  return (
    <section className="container">
      <div className="section-title pt-5 pb-0 text-center">
        <h1>
          {categoryNames?.mainCategory}
          {` > ${categoryNames?.subCategory}`}
        </h1>
      </div>
      <Products products={ filteredProducts } />
    </section>
  );
}
