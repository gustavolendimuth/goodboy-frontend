/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import '../css/allProducts.css';
import random from '../services/random';
import ProductCard from './ProductCard';

export default function AllProducts() {
  const { products } = useContext(Context);
  const [randomProducts, setRandomProducts] = useState();

  useEffect(() => {
    setRandomProducts(random(products, 8));
  }, [products]);

  return (
    <section className="all-products-container container pt-5 px-4">
      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 pt-4 pb-5"
      >
        {randomProducts?.map((product) => (
          <ProductCard key={ product._id } product={ product } />
        ))}
      </div>
    </section>
  );
}
